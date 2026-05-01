import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getAvailableAircraftsForSchedule } from '../../redux/aircraft/aircraftThunk';
import { AppDispatch } from '../../redux/store';
import { Aircraft } from '../../redux/aircraft/aircraftTypes';
import { debounce } from '../../utils/debounce';

interface UseAircraftScheduleReturn {
  availableAircrafts: Aircraft[];
  isLoading: boolean;
  error: string | null;
}

export const useAircraftSchedule = (formik: any): UseAircraftScheduleReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    availableForSchedule: availableAircrafts,
    isLoadingAvailableForSchedule: isLoading,
    availableForScheduleError: error
  } = useSelector((state: RootState) => state.aircraft);

  const fetchAvailableAircrafts = useCallback(async () => {
    const { departureDestinationId, departureTime, durationMinutes, bufferMinutes } = formik.values;

    if (!departureDestinationId || !departureTime || !durationMinutes || !bufferMinutes) return;

    let cleanedTime = departureTime.trim();
    const parts = cleanedTime.split('T')[0].split('-');
    if (parts.length >= 1) {
      let yearStr = parts[0];
      if (yearStr.length > 4) {
        yearStr = yearStr.slice(-4);
      } else if (yearStr.length === 2) {
        const yearNum = parseInt(yearStr);
        yearStr = yearNum >= 70 ? `19${yearStr}` : `20${yearStr}`;
      } else if (yearStr.length === 4) {
        const yearNum = parseInt(yearStr);
        if (yearNum < 1900 || yearNum > 2100) {
          const currentYear = new Date().getFullYear();
          const century = Math.floor(currentYear / 100) * 100;
          yearStr = (century + (yearNum % 100)).toString().padStart(4, '0');
        }
      }
      parts[0] = yearStr;
      cleanedTime = parts.join('-') + cleanedTime.substring(cleanedTime.indexOf('T'));
    }

    const testDate = new Date(cleanedTime);
    if (isNaN(testDate.getTime())) {
      console.warn('Invalid departure time after cleaning:', departureTime);
      return;
    }

    await dispatch(getAvailableAircraftsForSchedule({
      departureDestinationId,
      departureTime: testDate.toISOString(),
      durationMinutes: Number(durationMinutes),
      bufferMinutes: Number(bufferMinutes),
    }));
  }, [
    dispatch,
    formik.values.departureDestinationId,
    formik.values.departureTime,
    formik.values.durationMinutes,
    formik.values.bufferMinutes,
  ]);

  const debouncedFetch = useMemo(
    () => debounce(fetchAvailableAircrafts, 600),
    [fetchAvailableAircrafts]
  );

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch]);

  return {
    availableAircrafts,
    isLoading,
    error
  };
};