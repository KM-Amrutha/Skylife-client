import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import usePaymentSuccess from "../../hooks/booking/usePaymentSuccess";

const PaymentSuccess: React.FC = () => {
  const { countdown, bookingId, handleViewBooking } = usePaymentSuccess();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mx-auto mb-8 w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Successful!
        </h1>
        <p className="text-white/60 mb-2">
          Your booking has been confirmed.
        </p>
        <p className="text-white/40 text-sm mb-2">
          Booking ID:{" "}
          <span className="text-white/70 font-mono text-xs">{bookingId}</span>
        </p>

        <div className="my-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-white/50 text-sm mb-1">
            Redirecting to your ticket in
          </p>
          <p className="text-5xl font-bold text-white">{countdown}</p>
          <p className="text-white/30 text-xs mt-1">seconds</p>
        </div>

        <button
          onClick={handleViewBooking}
          className="w-full py-4 rounded-full bg-white text-[#001233] font-bold text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          View Booking Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;