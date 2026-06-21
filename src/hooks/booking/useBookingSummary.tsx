import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getBookingSummary,
  getEligibleOffers,
  initiateBooking,
} from "../../redux/booking/bookingThunk";
import {
  setSelectedOffer,
  // clearBookingSession,
} from "../../redux/booking/bookingSlice";
import { showErrorToast } from "../../utils/toast";

const useBookingSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const segment = useSelector((state: RootState) => state.booking.segment);

  const {
    summary,
    isLoadingSummary,
    summaryError,
    eligibleOffers,
    isLoadingOffers,
    selectedOfferId,
    isInitiatingBooking,
    initiateBookingError,
  } = useSelector((state: RootState) => state.booking);

  // ─── Load summary + offers on mount ──────────────────────────────────────
  useEffect(() => {
    if (!sessionId) return;
    dispatch(getBookingSummary(sessionId));
    dispatch(getEligibleOffers(sessionId));
  }, [sessionId, dispatch]);

  // ─── Select offer ─────────────────────────────────────────────────────────
  const handleSelectOffer = useCallback(
    (offerId: string | null) => {
      dispatch(setSelectedOffer(offerId));
    },
    [dispatch]
  );

  // ─── Proceed to payment ───────────────────────────────────────────────────
  const handlePay = useCallback(async () => {
    if (!sessionId) return;
    try {
      const result = await dispatch(
        initiateBooking({
          sessionId,
          ...(selectedOfferId && { offerId: selectedOfferId }),
        })
      ).unwrap();

      // navigate to payment page with clientSecret + bookingId
      navigate(`/user/bookings/${result.bookingId}/payment`, {
        state: {
          clientSecret: result.clientSecret,
          amount: result.amount,
          bookingId: result.bookingId,
        },
      });
    } catch (err: any) {
      showErrorToast(err || "Failed to initiate payment");
    }
  }, [sessionId, selectedOfferId, dispatch, navigate]);

  // ─── Back to passengers ───────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    navigate(`/user/bookings/${sessionId}/passengers`);
  }, [sessionId, navigate]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // ─── Compute grand total with selected offer ──────────────────────────────
  const selectedOffer = eligibleOffers.find((o) => o.id === selectedOfferId);
  const displayAmount = selectedOffer
    ? selectedOffer.finalAmount
    : summary?.fareBreakdown.grandTotal ?? 0;

  const discountAmount = selectedOffer ? selectedOffer.discountAmount : 0;


  return {
    sessionId,
    summary,
    isLoadingSummary,
    summaryError,
    eligibleOffers,
    isLoadingOffers,
    selectedOfferId,
    selectedOffer,
    displayAmount,
    discountAmount,
    isInitiatingBooking,
    initiateBookingError,
    handleSelectOffer,
    handlePay,
    handleBack,
    formatTime,
    formatDate,
  };
};

export default useBookingSummary;