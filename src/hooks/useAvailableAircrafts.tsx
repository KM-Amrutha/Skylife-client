import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAvailableAircraftsForSchedule } from '../redux/aircraft/aircraftThunk';
import { AppDispatch } from '../redux/store';
import { Aircraft } from '../redux/aircraft/aircraftTypes';

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
  const { departureDestinationId, departureTime } = formik.values;

 if (departureDestinationId && departureTime) {
  let cleanedTime = departureTime.trim();

  // Extract year part
  const parts = cleanedTime.split('T')[0].split('-'); // ['yyyy', 'mm', 'dd']
  if (parts.length >= 1) {
    let yearStr = parts[0];

    if (yearStr.length > 4) {
      yearStr = yearStr.slice(-4); // take last 4 → 2025
    }
    else if (yearStr.length === 2) {
      const yearNum = parseInt(yearStr)
      
      yearStr = yearNum >= 70 ? `19${yearStr}` : `20${yearStr}`;
    }
    // Case 3: Invalid year number (e.g., 0005, 5, 5000)
    else if (yearStr.length === 4) {
      const yearNum = parseInt(yearStr);
      if (yearNum < 1900 || yearNum > 2100) {
        // Fallback: assume current century
        const currentYear = new Date().getFullYear();
        const century = Math.floor(currentYear / 100) * 100;
        yearStr = (century + (yearNum % 100)).toString().padStart(4, '0');
      }
    }

    parts[0] = yearStr;
    cleanedTime = parts.join('-') + cleanedTime.substring(cleanedTime.indexOf('T'));
  }

  // Final safety: if still invalid date, skip or show error
  const testDate = new Date(cleanedTime);
  if (isNaN(testDate.getTime())) {
    console.warn('Invalid departure time after cleaning:', departureTime);
    return; // Don't dispatch — or set error state
  }

  const isoTime = testDate.toISOString();

  console.log('Fetching available aircrafts with cleaned time:', {
    original: departureTime,
    cleaned: cleanedTime,
    isoTime,
  });

  await dispatch(getAvailableAircraftsForSchedule({
    departureDestinationId,
    departureTime: isoTime,
  }));
}
}, [dispatch, formik.values.departureDestinationId, formik.values.departureTime]);

  useEffect(() => {
    fetchAvailableAircrafts();
  }, [fetchAvailableAircrafts]);

  return { 
    availableAircrafts, 
    isLoading, 
    error 
  };
};
