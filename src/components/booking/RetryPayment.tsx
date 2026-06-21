import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import useRetryPayment from "../../hooks/booking/useRetryPayment";
import { useLocation } from "react-router-dom";

const RetryPayment: React.FC = () => {
  const { bookingId, isRetryingPayment, handleRetry, handleGoHome } =
    useRetryPayment();

  const location = useLocation();
  const errorMessage =
    (location.state as { error?: string } | null)?.error ??
    "Your payment could not be processed.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Payment Failed</h1>
        <p className="text-white/50 text-sm mb-2">{errorMessage}</p>
        <p className="text-white/30 text-xs mb-8">
          Booking ID: {bookingId}
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-left">
          <p className="text-white/50 text-xs">
            You have <span className="text-amber-400 font-semibold">30 minutes</span> from
            booking creation to retry payment. After that your booking will be
            automatically cancelled and seats released.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGoHome}
            className="flex-1 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={handleRetry}
            disabled={isRetryingPayment}
            className="flex-1 py-3 rounded-full bg-white text-[#001233] text-sm font-bold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRetryingPayment ? (
              <>
                <div className="w-4 h-4 border-2 border-[#001233]/30 border-t-[#001233] rounded-full animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Retry Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetryPayment;