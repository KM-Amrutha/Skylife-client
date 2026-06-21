import { useEffect, useState } from 'react';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';

import {
  getAllSeatTypes,
  createSeatLayout,
  generateSeats,
  getSeatLayoutsByAircraft,
  deleteSeatLayout,
} from '../../redux/seat/seatThunk';
import { getProviderAircrafts } from '../../redux/aircraft/aircraftThunk'; 
import { clearGeneratedSeatsCount,clearSeatError, resetSeatState } from '../../redux/seat/seatSlice';   
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
  deletingLayoutId: string | null;
  handleDeleteClick: (layoutId: string) => void;
  handleDeleteConfirm: () => void;
  handleDeleteCancel: () => void;
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
  const navigate = useNavigate();
  const { aircraftId } = useParams<{ aircraftId: string }>();

  if (!aircraftId) {
    throw new Error('Aircraft ID is required');
  }

  const aircraft = useSelector((state: RootState) =>
    state.aircraft.aircrafts.find(a => a.id === aircraftId)
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
    const [deletingLayoutId, setDeletingLayoutId] = useState<string | null>(null);
  

  // Fix 1 — clear stale generatedSeatsCount on mount, refetch aircraft if not in Redux
 useEffect(() => {
  dispatch(clearGeneratedSeatsCount());
  dispatch(getAllSeatTypes());
  dispatch(getSeatLayoutsByAircraft(aircraftId));

  if (!aircraft) {
    dispatch(getProviderAircrafts({}));
  }
}, [dispatch, aircraftId, aircraft]);

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
        console.log("useseatlayout  Submitting seat layout:", values);
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
    await dispatch(generateSeats(aircraftId)).unwrap();
    showSuccessToast("Seats generated successfully!");
    dispatch(resetSeatState());
    navigate("/provider/aircraft-list");
  } catch (err: any) {
    const message = typeof err === "string" ? err : err?.message ?? String(err);
    dispatch(clearSeatError());
    if (message.includes("No seats generated")) {
      dispatch(resetSeatState());
      navigate("/provider/aircraft-list");
    } else {
      showErrorToast(message || "Failed to generate seats");
    }
  }
};

  const clearError = () => {
    dispatch(clearSeatError());
  };

const handleDeleteClick = (layoutId: string) => {
  setDeletingLayoutId(layoutId);
};

const handleDeleteConfirm = async () => {
  if (!deletingLayoutId) return;
  try {
    await dispatch(deleteSeatLayout(deletingLayoutId)).unwrap();
    showSuccessToast("Seat layout deleted successfully!");
    setDeletingLayoutId(null);
  } catch (err: any) {
    showErrorToast(err || "Failed to delete seat layout");
    setDeletingLayoutId(null);
  }
};

const handleDeleteCancel = () => {
  setDeletingLayoutId(null);
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
    aircraftCapacity,
    deletingLayoutId,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};

export default useSeatLayout;