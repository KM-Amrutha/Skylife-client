import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getProviderBookings } from "../../redux/providerBooking/providerBookingThunk";

const useProviderBookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { providerBookings, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.providerBooking
  );

  useEffect(() => {
    dispatch(getProviderBookings({ page: currentPage, limit }));
  }, [currentPage, dispatch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-400/40";
      case "cancelled":
        return "bg-red-500/15 text-red-300 border-red-400/40";
      default:
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return {
    providerBookings,
    isLoading,
    error,
    pagination,
    currentPage,
    handlePageChange,
    getStatusColor,
    formatDate,
    formatTime,
  };
};

export default useProviderBookings;