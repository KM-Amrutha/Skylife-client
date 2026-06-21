import { useEffect, useState, } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
// import { clearBookingSession } from "../../redux/booking/bookingSlice";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

interface LocationState {
  clientSecret: string;
  amount: number;
  bookingId: string;
}

const usePayment = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { bookingId } = useParams<{ bookingId: string }>();

  const state = location.state as LocationState | null;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!state?.clientSecret) {
      // no state — redirect back to home
      navigate("/user/userhome");
      return;
    }
    setIsReady(true);
  }, [state, navigate]);

  const elementsOptions: StripeElementsOptions = {
    clientSecret: state?.clientSecret ?? "",
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#ffffff",
        colorBackground: "#001233",
        colorText: "#ffffff",
        colorDanger: "#ef4444",
        fontFamily: "system-ui, sans-serif",
        borderRadius: "12px",
      },
    },
  };

console.log("usepayment state:", state?.amount); 

  return {
    stripePromise,
    elementsOptions,
    clientSecret: state?.clientSecret ?? "",
    amount: state?.amount ?? 0,
    bookingId,
    isReady,
  
  };
};

export default usePayment;