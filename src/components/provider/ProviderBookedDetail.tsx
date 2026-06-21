import React from "react";
import {
  Plane,
  Users,
  Utensils,
  ArrowLeft,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProviderBookedDetail from "../../hooks/provider/useProviderBookedDetail";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  confirmed: {
    label: "Confirmed",
    color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/40",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-500/15 text-red-300 border-red-400/40",
    icon: <XCircle className="w-4 h-4" />,
  },
  payment_failed: {
    label: "Payment Failed",
    color: "bg-amber-500/15 text-amber-300 border-amber-400/40",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  pending: {
    label: "Pending",
    color: "bg-white/10 text-white/60 border-white/20",
    icon: <Clock className="w-4 h-4" />,
  },
};

const ProviderBookedDetail: React.FC = () => {
  const navigate = useNavigate();
  const { booking, isLoading, error, formatDate, formatTime, formatCurrency } =
    useProviderBookedDetail();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-8 text-center max-w-sm">
          <p className="text-red-300 text-sm mb-4">{error || "Booking not found"}</p>
          <button
            onClick={() => navigate("/provider/bookings")}
            className="px-6 py-2 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">
      {/* Header */}
      <header className="px-6 md:px-8 py-5 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={() => navigate("/provider/bookings")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-lg font-semibold">Booking Detail</span>
        <div />
      </header>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">

        {/* Booking ID + Status */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs mb-1">Booking ID</p>
            <p className="text-white font-mono text-sm">{booking.id}</p>
            <p className="text-white/30 text-xs mt-1">
              {booking.paymentConfirmedAt
                ? `Paid ${formatDate(booking.paymentConfirmedAt)}`
                : formatDate(booking.createdAt)}
            </p>
          </div>
          <span
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusConfig.color}`}
          >
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>

        {/* Flights */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
            <Plane className="w-4 h-4 text-sky-400" />
            <h2 className="text-white font-semibold text-sm">Flight Segments</h2>
          </div>
          <div className="divide-y divide-white/5">
            {booking.segments.map((seg) => (
              <div key={seg.flightId} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">{seg.flightNumber}</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {seg.from} → {seg.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-mono">
                    {formatTime(seg.departureTime)} → {formatTime(seg.arrivalTime)}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5">
                    {formatDate(seg.departureTime)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passengers */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
            <Users className="w-4 h-4 text-sky-400" />
            <h2 className="text-white font-semibold text-sm">
              Passengers ({booking.passengers.length})
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {booking.passengers.map((p, idx) => (
              <div key={p.passengerId} className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-sky-500/15 border border-sky-400/20 flex items-center justify-center">
                      <span className="text-sky-400 text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{p.name}</p>
                      <p className="text-white/40 text-xs capitalize">
                        {p.gender} · DOB: {new Date(p.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">
                      {formatCurrency(p.passengerTotal)}
                    </p>
                    <span className={`text-xs ${p.status === "active" ? "text-emerald-400" : "text-red-400"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
                {/* Seats */}
                <div className="flex flex-col gap-1.5 pl-10">
                  {p.segments.map((s) => (
                    <div
                      key={s.flightSeatId}
                      className="flex items-center justify-between bg-white/3 rounded-xl px-3 py-2 text-xs"
                    >
                      <span className="text-white/50">
                        {s.from} → {s.to} · Seat <span className="text-white font-bold">{s.seatNumber}</span>
                        <span className="text-white/30 ml-1 capitalize">({s.cabinClass} · {s.position})</span>
                      </span>
                      <span className="text-white font-semibold">
                        {formatCurrency(s.segmentFare)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Food */}
        {booking.flightFoods.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
              <Utensils className="w-4 h-4 text-sky-400" />
              <h2 className="text-white font-semibold text-sm">Food Orders</h2>
            </div>
            <div className="divide-y divide-white/5">
              {booking.flightFoods.map((ff) => {
                const seg = booking.segments.find((s) => s.flightId === ff.flightId);
                return (
                  <div key={ff.flightId} className="px-5 py-4">
                    {seg && (
                      <p className="text-white/40 text-xs mb-2">
                        {seg.from} → {seg.to} · {seg.flightNumber}
                      </p>
                    )}
                    {ff.items.map((item) => (
                      <div key={item.foodId} className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-white/70">
                          {item.foodName} × {item.quantity}
                        </span>
                        <span className="text-white font-semibold">
                          {item.itemTotal === 0 ? "Free" : formatCurrency(item.itemTotal)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-xs text-white/40 pt-2 border-t border-white/5 mt-2">
                      <span>Flight food total</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(ff.flightFoodTotal)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Revenue Breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <h2 className="text-white font-semibold text-sm">Revenue Breakdown</h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Booking Total</span>
              <span className="text-white">{formatCurrency(booking.grandTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Your Gross Amount</span>
              <span className="text-white">{formatCurrency(booking.grossAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-400/80">Platform Commission</span>
              <span className="text-amber-400">− {formatCurrency(booking.commissionAmount)}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-white/10">
              <span className="text-white font-bold">Your Revenue</span>
              <span className="text-emerald-400 font-bold text-base">
                {formatCurrency(booking.providerRevenue)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProviderBookedDetail;