import React, { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ArrowLeft, Lock } from "lucide-react";
import usePayment from "../../hooks/booking/usePayment";
import { useNavigate } from "react-router-dom";

// ─── Inner form ───────────────────────────────────────────────────────────────
const PaymentForm: React.FC<{
  amount: number;
  bookingId: string;
}> = ({ amount, bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/user/bookings/${bookingId}/confirmation`,
      },
    });

    // only runs if redirect failed or card error before redirect
    if (error) {
      setErrorMessage(error.message ?? "Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: "tabs" }} />

      {errorMessage && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3">
          <p className="text-red-300 text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 rounded-full bg-white text-[#001233] text-base font-bold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-[#001233]/30 border-t-[#001233] rounded-full animate-spin" />
            Processing payment...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Pay ₹{amount.toLocaleString("en-IN")}
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
        <Lock className="w-3 h-3" />
        <span>Secured by Stripe</span>
      </div>
    </form>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Payment: React.FC = () => {
  const navigate = useNavigate();
  const {
    stripePromise,
    elementsOptions,
    amount,
    bookingId,
    isReady,
  } = usePayment();

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">
      <header className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-lg font-semibold tracking-wide">Skylife</span>
        <div className="flex items-center gap-1 text-white/40 text-xs">
          <Lock className="w-3 h-3" />
          <span>Secure Payment</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 md:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Complete Payment</h1>
          <p className="text-white/50 mt-2 text-sm">
            Booking ID: <span className="text-white/70">{bookingId}</span>
          </p>
        </div>

        <div className="bg-white/8 border border-white/15 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">Total Amount</span>
            <span className="text-white font-bold text-xl">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <Elements stripe={stripePromise} options={elementsOptions}>
            <PaymentForm
              amount={amount}
              bookingId={bookingId ?? ""}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;