import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { retryPayment } from "../../redux/booking/bookingThunk";
import { showErrorToast } from "../../utils/toast";

const useRetryPayment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();

  const { isRetryingPayment, retryPaymentError, retryPaymentData } =
    useSelector((state: RootState) => state.booking);

  const handleRetry = useCallback(async () => {
    if (!bookingId) return;
    try {
      const result = await dispatch(retryPayment(bookingId)).unwrap();
      navigate(`/user/bookings/${result.bookingId}/payment`, {
        state: {
          clientSecret: result.clientSecret,
          amount: result.amount,
          bookingId: result.bookingId,
        },
      });
    } catch (err: any) {
      showErrorToast(err || "Failed to retry payment");
    }
  }, [bookingId, dispatch, navigate]);

  const handleGoHome = useCallback(() => {
    navigate("/user/userhome");
  }, [navigate]);

  return {
    bookingId,
    isRetryingPayment,
    retryPaymentError,
    retryPaymentData,
    handleRetry,
    handleGoHome,
  };
};

export default useRetryPayment;