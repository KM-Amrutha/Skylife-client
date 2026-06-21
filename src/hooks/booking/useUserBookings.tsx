import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { getUserBookings } from "../../redux/booking/bookingThunk";

const useUserBookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  const { userBookings, isLoadingUserBookings, userBookingsError, userBookingsPagination } =
    useSelector((state: RootState) => state.booking);

  useEffect(() => {
    dispatch(getUserBookings({ page: currentPage, limit }));
  }, [currentPage, dispatch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleViewBooking = useCallback(
    (bookingId: string) => {
      navigate(`/user/bookings/${bookingId}`);
    },
    [navigate]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-400/40";
      case "cancelled":
        return "bg-red-500/15 text-red-300 border-red-400/40";
      case "payment_failed":
        return "bg-amber-500/15 text-amber-300 border-amber-400/40";
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

  return {
    userBookings,
    isLoadingUserBookings,
    userBookingsError,
    pagination: userBookingsPagination,
    currentPage,
    handlePageChange,
    handleViewBooking,
    getStatusColor,
    formatDate,
  };
};

export default useUserBookings;