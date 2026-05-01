import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { getProviderFlights, deleteFlight,getFlightSeats } from '../../redux/flight/flightThunk';
import { FlightDetails,FlightSeatMapDTO } from '../../redux/flight/flightTypes';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import usePagination from '../sharedHooks/usePagination';
import { clearFlightSeats } from '../../redux/flight/flightSlice';

const LIMIT = 4;

interface UseFlightListReturn {
  flights: FlightDetails[];
  isLoading: boolean;
  error: string | null;
  pagination: { totalPages: number; currentPage: number } | null;
  currentPage: number;
  confirmDeleteId: string | null;
  selectedFlight: FlightDetails | null;
  handleViewDetails: (flight: FlightDetails) => void;
  handleCloseDetails: () => void;
  handleDeleteClick: (flightId: string) => void;
  handleDeleteConfirm: () => Promise<void>;
  handleDeleteCancel: () => void;
  handleEditClick: (flightId: string) => void;
  handlePageChange: (page: number) => void;
  // Seat map
  flightSeats: FlightSeatMapDTO[];
  isLoadingSeats: boolean;
  seatsError: string | null;
  selectedSeatFlightId: string | null;
  handleViewSeats: (flightId: string) => void;
  handleCloseSeats: () => void;
}

const useFlightList = (): UseFlightListReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { providerFlights: flights, isLoading, error, pagination, flightSeats, isLoadingSeats, seatsError  } = useSelector(
    (state: RootState) => state.flight
  );
  const providerId = useSelector((state: RootState) => state.auth.provider?._id ?? '');

  const { currentPage, handlePageChange, resetPage } = usePagination();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightDetails | null>(null);
  const [selectedSeatFlightId, setSelectedSeatFlightId] = useState<string | null>(null);

  useEffect(() => {
    if (providerId) {
      dispatch(getProviderFlights({ page: currentPage, limit: LIMIT }));
    }
  }, [dispatch, providerId, currentPage]);

  const handleEditClick = (flightId: string) => {
    navigate(`/provider/update-flights/${flightId}`);
  };

  const handleViewDetails = (flight: FlightDetails) => {
    setSelectedFlight(flight);
  };
    const handleCloseDetails = () => {
    setSelectedFlight(null);
  };

   const handleViewSeats = (flightId: string) => {
    setSelectedSeatFlightId(flightId);
    dispatch(getFlightSeats(flightId));
  };

  const handleCloseSeats = () => {
    setSelectedSeatFlightId(null);
    dispatch(clearFlightSeats());
  };

  const handleDeleteClick = (flightId: string) => {
    setConfirmDeleteId(flightId);
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      await dispatch(deleteFlight(confirmDeleteId)).unwrap();
      showSuccessToast('Flight deleted successfully');
      if (flights.length === 1 && currentPage > 1) {
        resetPage();
      } else {
        dispatch(getProviderFlights({ page: currentPage, limit: LIMIT }));
      }
    } catch (err: any) {
      showErrorToast(err || 'Failed to delete flight');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return {
    flights,
    isLoading,
    error: error ?? null,
    pagination,
    currentPage,
    confirmDeleteId,
    selectedFlight,
    handleViewDetails,
    handleCloseDetails,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditClick,
    handlePageChange,
    flightSeats,
    isLoadingSeats,
    seatsError: seatsError ?? null,
    selectedSeatFlightId,
    handleViewSeats,
    handleCloseSeats,
  };
};

export default useFlightList;