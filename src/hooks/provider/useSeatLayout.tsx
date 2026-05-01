import { useEffect, useState } from 'react';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import {
  getAllSeatTypes,
  createSeatLayout,
  generateSeats,
  getSeatLayoutsByAircraft,
  deleteSeatLayout,
} from '../../redux/seat/seatThunk';
import { getProviderAircrafts } from '../../redux/aircraft/aircraftThunk'; // ← add
import { clearGeneratedSeatsCount,clearSeatError } from '../../redux/seat/seatSlice';     // ← add
import { CreateSeatLayoutDTO, SeatType, SeatLayout } from '../../redux/seat/seatType';
import { showSuccessToast, showErrorToast } from '../../utils/toast';

interface UseSeatLayoutReturn {
  seatTypes: SeatType[];
  seatLayouts: SeatLayout[];
  isLoading: boolean;
  error: string | null;
  generatedSeatsCount: number;
  formik: FormikProps<CreateSeatLayoutDTO>;
  aircraftId: string;
  totalPlannedSeats: number;
  canGenerateSeats: boolean;
  aircraftCapacity: number;
  handleGenerateSeats: () => void;
  handleDeleteLayout: (layoutId: string) => void;
  clearError: () => void;
}

const seatLayoutValidationSchema = Yup.object().shape({
  cabinClass: Yup.string().required('Cabin class is required'),
  layout: Yup.string().required('Layout is required'),
  startRow: Yup.number()
    .required('Start row is required')
    .min(1, 'Start row must be at least 1'),
  endRow: Yup.number()
    .required('End row is required')
    .min(Yup.ref('startRow'), 'End row must be greater than or equal to start row')
});

const useSeatLayout = (): UseSeatLayoutReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { aircraftId } = useParams<{ aircraftId: string }>();

  if (!aircraftId) {
    throw new Error('Aircraft ID is required');
  }

  const aircraft = useSelector((state: RootState) =>
    state.aircraft.aircrafts.find(a => a._id === aircraftId)
  );

  const aircraftCapacity = aircraft?.seatCapacity || 0;

  const {
    seatTypes,
    seatLayouts,
    isLoading,
    error,
    generatedSeatsCount
  } = useSelector((state: RootState) => state.seat);

  const [totalPlannedSeats, setTotalPlannedSeats] = useState(0);

  // Fix 1 — clear stale generatedSeatsCount on mount, refetch aircraft if not in Redux
  useEffect(() => {
    dispatch(clearGeneratedSeatsCount());         // ← clears 285 stale count
    dispatch(getAllSeatTypes());
    dispatch(getSeatLayoutsByAircraft(aircraftId));

    // Fix 2 — if aircraft not in Redux yet (just created), fetch the list
    if (!aircraft) {
      dispatch(getProviderAircrafts());
    }
  }, [dispatch, aircraftId]);

  // Calculate total planned seats
  useEffect(() => {
    const total = seatLayouts.reduce((sum, layout) => {
      return sum + (layout.endRow - layout.startRow + 1) * layout.seatsPerRow;
    }, 0);
    setTotalPlannedSeats(total);
  }, [seatLayouts]);

  const formik = useFormik<CreateSeatLayoutDTO>({
    initialValues: {
      aircraftId,
      cabinClass: '',
      layout: '',
      startRow: 1,
      endRow: 1,
      seatsPerRow: 0,
      columns: [],
      aisleColumns: [],
      exitRows: [],
      wingStartRow: 0,
      wingEndRow: 0
    },
    validationSchema: seatLayoutValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createSeatLayout(values));
        showSuccessToast('Seat layout created successfully!');
        formik.resetForm();
        dispatch(getSeatLayoutsByAircraft(aircraftId));
      } catch (err: any) {
        showErrorToast(err || 'Failed to create seat layout');
      }
    }
  });

  const canGenerateSeats = seatLayouts.length > 0 && generatedSeatsCount === 0;

  const handleGenerateSeats = async () => {
    try {
      await dispatch(generateSeats(aircraftId)).unwrap(); // ← unwrap to catch errors
      showSuccessToast('Seats generated successfully!');
      dispatch(getSeatLayoutsByAircraft(aircraftId));
    } catch (err: any) {
      showErrorToast(err || 'Failed to generate seats');
    }
  };

  const clearError = () => {
    dispatch(clearSeatError());
  };

  const handleDeleteLayout = async (layoutId: string) => {
    if (window.confirm('Are you sure you want to delete this seat layout?')) {
      try {
        await dispatch(deleteSeatLayout(layoutId)).unwrap(); // ← unwrap to catch errors
        showSuccessToast('Seat layout deleted successfully!');
      } catch (err: any) {
        showErrorToast(err || 'Failed to delete seat layout');
      }
    }
  };

  return {
    seatTypes,
    seatLayouts,
    isLoading,
    error,
    generatedSeatsCount,
    formik,
    aircraftId,
    totalPlannedSeats,
    canGenerateSeats,
    handleGenerateSeats,
    clearError,
    handleDeleteLayout,
    aircraftCapacity
  };
};

export default useSeatLayout;