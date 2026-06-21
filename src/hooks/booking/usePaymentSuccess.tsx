import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { clearBookingSession } from "../../redux/booking/bookingSlice";

const usePaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { bookingId } = useParams<{ bookingId: string }>();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);

  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (!bookingId) {
      navigate("/user/userhome");
      return;
    }

    // ── payment failed — go to retry page ────────────────────────────────
    if (redirectStatus === "failed") {
      navigate(`/user/bookings/${bookingId}/failed`, { replace: true });
      return;
    }

    // ── payment succeeded — clear session + countdown ─────────────────────
    dispatch(clearBookingSession());

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate(`/user/bookings/${bookingId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingId, navigate, redirectStatus, dispatch]);

  const handleViewBooking = () => {
    navigate(`/user/bookings/${bookingId}`);
  };

  return { countdown, bookingId, handleViewBooking };
};

export default usePaymentSuccess;