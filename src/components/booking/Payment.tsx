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
        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10"
          >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing payment...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Pay ₹{amount.toLocaleString("en-IN")}
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-600 text-xs">
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
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
      <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center">
          <img src="/image/gemlogo.png" alt="Skylife" className="h-8 md:h-10" />
          <span className="text-base md:text-lg font-semibold tracking-wide text-gray-900">Skylife</span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <Lock className="w-3 h-3" />
          <span className="hidden sm:inline">Secure Payment</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 md:px-8 pt-2 pb-10">
        {/* Blue Banner Header */}
<div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs max-w-md mx-auto">
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <Lock className="w-6 h-6 text-[#0a3a8a]" />
    </div>
    <div className="flex-1 min-w-0">
      <h1 className="text-2xl sm:text-3xl font-bold">Complete Payment</h1>
      <p className="text-blue-200 text-sm mt-1">
        Booking ID: <span className="text-white font-semibold">{bookingId}</span>
      </p>
    </div>
  </div>
</div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Total Amount</span>
            <span className="text-gray-900 font-bold text-xl">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <Elements
            stripe={stripePromise}
            options={{
              ...elementsOptions,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#0a3a8a",
                  colorBackground: "#ffffff",
                  colorText: "#111827",
                  colorTextSecondary: "#4b5563",
                  colorTextPlaceholder: "#9ca3af",
                  colorDanger: "#dc2626",
                  borderRadius: "10px",
                  fontFamily: "system-ui, sans-serif",
                },
                rules: {
                  ".Tab": {
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                  },
                  ".Tab--selected": {
                    border: "1px solid #0a3a8a",
                    backgroundColor: "#eff6ff",
                  },
                  ".Input": {
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                  },
                  ".Input:focus": {
                    border: "1px solid #0a3a8a",
                  },
                },
              },
            }}
          >
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