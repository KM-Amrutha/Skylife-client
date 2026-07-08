import { useState,useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getBookingSummary,
  getEligibleOffers,
  initiateBooking,
  payWithWallet,  
} from "../../redux/booking/bookingThunk";
import {getUserWallet} from "../../redux/wallet/walletThunk";
import {
  setSelectedOffer,
  // clearBookingSession,
} from "../../redux/booking/bookingSlice";
import { showErrorToast } from "../../utils/toast";

const useBookingSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const { isPayingWithWallet } = useSelector((state: RootState) => state.booking);
const { userWallet } = useSelector((state: RootState) => state.wallet);
const [showWalletConfirm, setShowWalletConfirm] = useState(false);

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

// fetch wallet balance on mount
  useEffect(() => {
  dispatch(getUserWallet());
}, [dispatch]);

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

    //___________________________________wallet pay_______________________________

  const handlePayWithWallet = useCallback(async () => {
  if (!sessionId) return;
  try {
    const result = await dispatch(
      payWithWallet({
        sessionId,
        ...(selectedOfferId && { offerId: selectedOfferId }),
      })
    ).unwrap();

    navigate(`/user/bookings/${result.bookingId}/confirmation?redirect_status=succeeded`);
  } catch (err: any) {
    showErrorToast(err || "Failed to pay with wallet");
  }
}, [sessionId, selectedOfferId, dispatch, navigate]);

  //_________________________________________pay with wallet___________________________
  const handleWalletConfirmOpen = useCallback(() => {
  setShowWalletConfirm(true);
}, []);

const handleWalletConfirmClose = useCallback(() => {
  setShowWalletConfirm(false);
}, []);

const handleConfirmWalletPay = useCallback(async () => {
  setShowWalletConfirm(false);
  await handlePayWithWallet();
}, [handlePayWithWallet]);

  // ─── Back to passengers ──────────────────────────────────────────────────
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
    userWallet,
  isPayingWithWallet,
  showWalletConfirm,
  handleWalletConfirmOpen,
  handleWalletConfirmClose,
  handleConfirmWalletPay,
  };
};

export default useBookingSummary;