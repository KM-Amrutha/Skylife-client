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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 text-sm mb-2">{errorMessage}</p>
        <p className="text-gray-400 text-xs mb-8 font-mono">
          Booking ID: {bookingId}
        </p>

        {/* Info box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
          <p className="text-gray-600 text-xs">
            You have{" "}
            <span className="text-amber-600 font-semibold">30 minutes</span>{" "}
            from booking creation to retry payment. After that your booking will
            be automatically cancelled and seats released.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGoHome}
            className="flex-1 py-3 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={handleRetry}
            disabled={isRetryingPayment}
            className="flex-1 py-3 rounded-full bg-[#0a3a8a] hover:bg-[#082c6b] text-white text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRetryingPayment ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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