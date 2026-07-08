import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import usePaymentSuccess from "../../hooks/booking/usePaymentSuccess";

const PaymentSuccess: React.FC = () => {
  const { countdown, bookingId, handleViewBooking } = usePaymentSuccess();

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Icon */}
        <div className="relative mx-auto mb-8 w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-2">
          Your booking has been confirmed.
        </p>
        <p className="text-gray-500 text-sm mb-2">
          Booking ID:{" "}
          <span className="text-gray-700 font-mono text-xs">{bookingId}</span>
        </p>

        {/* Countdown */}
        <div className="my-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <p className="text-gray-600 text-sm mb-1">
            Redirecting to your ticket in
          </p>
          <p className="text-5xl font-bold text-gray-900">{countdown}</p>
          <p className="text-gray-400 text-xs mt-1">seconds</p>
        </div>

        <button
          onClick={handleViewBooking}
          className="w-full py-4 rounded-2xl bg-[#0a3a8a] hover:bg-[#082c6b] text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
        >
          View Booking Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;