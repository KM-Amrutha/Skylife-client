import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { getBookingSegment, updateBookingSegment } from "../../redux/booking/bookingThunk";
import { clearBookingSession } from "../../redux/booking/bookingSlice";
import { BookingSegmentFlight } from "../../redux/booking/bookingType";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const useBookingSegment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();

  const { segment, isLoadingSegment, segmentError, isUpdatingSegment } =
    useSelector((state: RootState) => state.booking);

  // ─── Load segment on mount ────────────────────────────────────────────────
  useEffect(() => {
    if (!sessionId) return;
    dispatch(getBookingSegment(sessionId));
  }, [sessionId, dispatch]);

  // ─── Remove a flight from session ─────────────────────────────────────────
  const handleRemoveFlight = useCallback(
    async (flightId: string) => {
      if (!sessionId) return;
      try {
        const result = await dispatch(
          updateBookingSegment({ sessionId, removeFlightId: flightId })
        ).unwrap();

        if (result === null) {
          // All flights removed — session deleted
          dispatch(clearBookingSession());
          showSuccessToast("All flights removed. Returning to search.");
          navigate("/user/userhome");
        } else {
          showSuccessToast("Flight removed.");
        }
      } catch (err: any) {
        showErrorToast(err || "Failed to remove flight");
      }
    },
    [sessionId, dispatch, navigate]
  );

  // ─── Update passenger count ───────────────────────────────────────────────
  const handlePassengerCountChange = useCallback(
    async (count: number) => {
      if (!sessionId) return;
      try {
        await dispatch(
          updateBookingSegment({ sessionId, passengerCount: count })
        ).unwrap();
      } catch (err: any) {
        showErrorToast(err || "Failed to update passenger count");
      }
    },
    [sessionId, dispatch]
  );

  // ─── Confirm — navigate to Page 3 ────────────────────────────────────────
  const handleConfirm = useCallback(() => {
    if (!sessionId) return;
    navigate(`/user/bookings/${sessionId}/passengers`);
  }, [sessionId, navigate]);

  // ─── Back to search ───────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    navigate("/user/userhome");
  }, [navigate]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h${m > 0 ? ` ${m}m` : ""}`;
  };

  const getLowestFare = (baseFare: BookingSegmentFlight["baseFare"]) =>
    Math.min(...(Object.values(baseFare).filter(Boolean) as number[]));

  return {
    sessionId,
    segment,
    isLoadingSegment,
    segmentError,
    isUpdatingSegment,
    handleRemoveFlight,
    handlePassengerCountChange,
    handleConfirm,
    handleBack,
    formatTime,
    formatDuration,
    getLowestFare,
  };
};

export default useBookingSegment;