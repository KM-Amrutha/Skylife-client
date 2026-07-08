import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteAircraft, getProviderAircrafts } from '../../redux/aircraft/aircraftThunk';
import { Aircraft, AircraftPagination } from '../../redux/aircraft/aircraftTypes';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import usePagination from '../sharedHooks/usePagination';

const LIMIT = 3;

interface UseAircraftListReturn {
  aircrafts: Aircraft[];
  isLoading: boolean;
  error: string | null;
  pagination: AircraftPagination | null;
  currentPage: number;
  confirmDeleteId: string | null;
  selectedAircraft: Aircraft | null;
  seatModalAircraftId: string | null;
  handleViewDetails: (aircraft: Aircraft) => void;
  handleCloseDetails: () => void;
  handleDeleteClick: (aircraftId: string) => void;
  handleDeleteConfirm: () => void;
  handleDeleteCancel: () => void;
  handleEditClick: (aircraftId: string) => void;
  handlePageChange: (page: number) => void;
  handleManageSeats: (aircraftId: string) => void;
  handleCloseSeatModal: () => void;
}

const useAircraftList = (): UseAircraftListReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { aircrafts, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.aircraft
  );

  const { currentPage, handlePageChange, resetPage } = usePagination();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [seatModalAircraftId, setSeatModalAircraftId] = useState<string | null>(null);

  const handleManageSeats = (aircraftId: string) => setSeatModalAircraftId(aircraftId);
const handleCloseSeatModal = () => setSeatModalAircraftId(null);

const providerId = useSelector((state: RootState) => state.auth.provider?.id ?? '');

useEffect(() => {
  if (!providerId) return;
  dispatch(getProviderAircrafts({ page: currentPage, limit: LIMIT }));
}, [dispatch, providerId, currentPage]);
  const handleEditClick = (aircraftId: string) => {
    navigate(`/provider/aircraft/${aircraftId}/edit`);
  };

  const handleDeleteClick = (aircraftId: string) => {
    setConfirmDeleteId(aircraftId);
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteId(null);
  };

  const handleViewDetails = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
  };

  const handleCloseDetails = () => {
    setSelectedAircraft(null);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      await dispatch(deleteAircraft(confirmDeleteId)).unwrap();
      showSuccessToast('Aircraft deleted successfully');
      if (aircrafts.length === 1 && currentPage > 1) {
        resetPage(); // ← replaces setCurrentPage(prev => prev - 1)
      } else {
        dispatch(getProviderAircrafts({ page: currentPage, limit: LIMIT }));
      }
    } catch (err: any) {
      showErrorToast(err || 'Failed to delete aircraft');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return {
    aircrafts,
    isLoading,
    error,
    pagination,
    currentPage,
    handlePageChange,
    confirmDeleteId,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditClick,
    selectedAircraft,
    handleViewDetails,
    handleCloseDetails,
    seatModalAircraftId,
  handleManageSeats,
  handleCloseSeatModal,
  };
};

export default useAircraftList;