import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { getProviderBookingById } from "../../redux/providerBooking/providerBookingThunk";

const useProviderBookedDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookingId } = useParams<{ bookingId: string }>();

  const { providerBookingDetail, isLoadingProviderBookingDetail, providerBookingDetailError } =
    useSelector((state: RootState) => state.providerBooking);

  useEffect(() => {
    if (!bookingId) return;
    dispatch(getProviderBookingById(bookingId));
  }, [bookingId, dispatch]);

  const formatDate = useCallback((iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }), []);

  const formatTime = useCallback((iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }), []);

  const formatCurrency = useCallback((amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`, []);

  return {
    booking: providerBookingDetail,
    isLoading: isLoadingProviderBookingDetail,
    error: providerBookingDetailError,
    bookingId,
    formatDate,
    formatTime,
    formatCurrency,
  };
};

export default useProviderBookedDetail;