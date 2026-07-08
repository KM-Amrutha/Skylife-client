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
    color: "bg-emerald-50 text-emerald-700 border-emerald-300",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-50 text-red-700 border-red-300",
    icon: <XCircle className="w-4 h-4" />,
  },
  payment_failed: {
    label: "Payment Failed",
    color: "bg-amber-50 text-amber-700 border-amber-300",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  pending: {
    label: "Pending",
    color: "bg-gray-100 text-gray-600 border-gray-300",
    icon: <Clock className="w-4 h-4" />,
  },
};

const ProviderBookedDetail: React.FC = () => {
  const navigate = useNavigate();
  const { booking, isLoading, error, formatDate, formatTime, formatCurrency } =
    useProviderBookedDetail();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-sm shadow-sm">
          <p className="text-red-600 text-sm mb-4">{error || "Booking not found"}</p>
          <button
            onClick={() => navigate("/provider/bookings")}
            className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">

     <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
  <div className="max-w-3xl mx-auto flex items-center gap-5">
    <button
      onClick={() => navigate("/provider/bookings")}
      className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-blue-50 transition"
    >
      <ArrowLeft className="w-5 h-5 text-[#0a3a8a]" />
    </button>
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">Booking Detail</h1>
      <p className="text-blue-200 text-sm mt-1">Flight booking summary</p>
    </div>
  </div>
</div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">

        {/* Booking ID + Status */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-gray-600 text-xs mb-1">Booking ID</p>
            <p className="text-gray-900 font-mono text-sm">{booking.id}</p>
            <p className="text-gray-600 text-xs mt-1">
              {booking.paymentConfirmedAt
                ? `Paid ${formatDate(booking.paymentConfirmedAt)}`
                : formatDate(booking.createdAt)}
            </p>
          </div>
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold flex-shrink-0 ${statusConfig.color}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>

        {/* Flights */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
            <Plane className="w-4 h-4 text-[#0a3a8a]" />
            <h2 className="text-gray-900 font-semibold text-sm">Flight Segments</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {booking.segments.map((seg) => (
              <div key={seg.flightId} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-gray-900 font-bold text-sm">{seg.flightNumber}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{seg.from} → {seg.to}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-gray-900 text-sm font-mono">
                    {formatTime(seg.departureTime)} → {formatTime(seg.arrivalTime)}
                  </p>
                  <p className="text-gray-600 text-xs mt-0.5">{formatDate(seg.departureTime)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passengers */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
            <Users className="w-4 h-4 text-[#0a3a8a]" />
            <h2 className="text-gray-900 font-semibold text-sm">
              Passengers ({booking.passengers.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {booking.passengers.map((p, idx) => (
              <div key={p.passengerId} className="px-5 py-4">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0a3a8a] text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 font-semibold text-sm truncate">{p.name}</p>
                      <p className="text-gray-600 text-xs capitalize">
                        {p.gender} · DOB: {new Date(p.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-gray-900 font-bold text-sm">{formatCurrency(p.passengerTotal)}</p>
                    <span className={`text-xs ${p.status === "active" ? "text-emerald-600" : "text-red-500"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
                {/* Seats */}
                <div className="flex flex-col gap-1.5 pl-10">
                  {p.segments.map((s) => (
                    <div key={s.flightSeatId} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 text-xs gap-2">
                      <span className="text-gray-700 min-w-0 truncate">
                        {s.from} → {s.to} · Seat <span className="text-gray-900 font-bold">{s.seatNumber}</span>
                        <span className="text-gray-500 ml-1 capitalize">({s.cabinClass} · {s.position})</span>
                      </span>
                      <span className="text-gray-900 font-semibold flex-shrink-0">{formatCurrency(s.segmentFare)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Food */}
        {booking.flightFoods.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Utensils className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Food Orders</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {booking.flightFoods.map((ff) => {
                const seg = booking.segments.find((s) => s.flightId === ff.flightId);
                return (
                  <div key={ff.flightId} className="px-5 py-4">
                    {seg && (
                      <p className="text-gray-600 text-xs mb-2">
                        {seg.from} → {seg.to} · {seg.flightNumber}
                      </p>
                    )}
                    {ff.items.map((item) => (
                      <div key={item.foodId} className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-700">{item.foodName} × {item.quantity}</span>
                        <span className="text-gray-900 font-semibold">
                          {item.itemTotal === 0 ? "Free" : formatCurrency(item.itemTotal)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-100 mt-2">
                      <span>Flight food total</span>
                      <span className="text-gray-900 font-semibold">{formatCurrency(ff.flightFoodTotal)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Revenue Breakdown */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
            <TrendingUp className="w-4 h-4 text-[#0a3a8a]" />
            <h2 className="text-gray-900 font-semibold text-sm">Revenue Breakdown</h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Booking Total</span>
              <span className="text-gray-900">{formatCurrency(booking.grandTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Your Gross Amount</span>
              <span className="text-gray-900">{formatCurrency(booking.grossAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-600">Platform Commission</span>
              <span className="text-amber-600">− {formatCurrency(booking.commissionAmount)}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
              <span className="text-gray-900 font-bold">Your Revenue</span>
              <span className="text-emerald-600 font-bold text-base">{formatCurrency(booking.providerRevenue)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProviderBookedDetail;