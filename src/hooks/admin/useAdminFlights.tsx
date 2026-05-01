import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAdminFlights, rejectSingleFlight } from "../../redux/flight/flightThunk";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import usePagination from "../sharedHooks/usePagination";

const useAdminFlights = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    adminFlights,
    isLoadingAdminFlights,
    adminFlightsError,
    adminFlightsPagination,
    isLoading,
  } = useSelector((state: RootState) => state.flight);

  const { currentPage, handlePageChange } = usePagination();
  const [rejectFlightId, setRejectFlightId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAdminFlights({ page: currentPage, limit: 4 }));
  }, [dispatch, currentPage]);

  const handleRejectClick = useCallback((flightId: string) => {
    setRejectFlightId(flightId);
  }, []);

  const handleRejectCancel = useCallback(() => {
    setRejectFlightId(null);
  }, []);

  const handleRejectConfirm = useCallback(
    async (reason: string) => {
      if (!rejectFlightId) return;
      try {
        await dispatch(rejectSingleFlight({ flightId: rejectFlightId, reason })).unwrap();
        showSuccessToast("Flight rejected successfully");
        setRejectFlightId(null);
      } catch (err: any) {
        showErrorToast(err || "Failed to reject flight");
      }
    },
    [dispatch, rejectFlightId]
  );

  return {
    adminFlights,
    isLoading: isLoadingAdminFlights,
    isRejecting: isLoading,
    error: adminFlightsError,
    pagination: adminFlightsPagination,
    currentPage,
    handlePageChange,
    rejectFlightId,
    handleRejectClick,
    handleRejectCancel,
    handleRejectConfirm,
  };
};

export default useAdminFlights;