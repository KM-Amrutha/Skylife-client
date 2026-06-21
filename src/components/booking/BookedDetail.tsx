import React, { useState } from "react";
import {
  Download,
  Plane,
  User,
  Utensils,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  Luggage,
  Info,
  Armchair,
  MapPin,
  CreditCard,
} from "lucide-react";
import useBookedDetail from "../../hooks/booking/useBookedDetail";
import { Ticket } from "../../redux/booking/bookingType";

import UserHeader from "../user/UserHeader";
import {AmenitiesRow} from "../../utils/amenities";
import {  AMENITY_ICONS, AMENITY_LABELS } from "../../types/amenities";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m > 0 ? ` ${m}m` : ""}`;
};

const getLayoverDuration = (arrivalTime: string, nextDepartureTime: string): string => {
  const diff = new Date(nextDepartureTime).getTime() - new Date(arrivalTime).getTime();
  const totalMinutes = Math.floor(diff / (1000 * 60));
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h${m > 0 ? ` ${m}m` : ""}`;
};

const formatCabinClass = (cabinClass: string) =>
  cabinClass.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatPosition = (position: string) =>
  position.charAt(0).toUpperCase() + position.slice(1);

// ─── Section Wrapper ──────────────────────────────────────────────────────────

const Section: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2.5 mb-4">
      <div className="text-sky-400">{icon}</div>
      <h2 className="text-white font-bold text-xs tracking-widest uppercase">
        {title}
      </h2>
      <div className="flex-1 h-px bg-white/10 ml-2" />
    </div>
    {children}
  </div>
);

// ─── Cancel Confirmation Modal ────────────────────────────────────────────────

const CancelModal: React.FC<{
  passengerName: string;
  refundAmount: number;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ passengerName, refundAmount, isLoading, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
    <div className="bg-[#001a3d] border border-white/15 rounded-2xl p-6 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
        <h3 className="text-white font-bold text-base">Cancel Passenger</h3>
      </div>
      <p className="text-white/60 text-sm mb-2">
        Cancel booking for{" "}
        <span className="text-white font-semibold">{passengerName}</span>?
      </p>
      <p className="text-emerald-400 text-sm mb-6">
        ₹{refundAmount.toLocaleString("en-IN")} will be credited to your wallet.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition"
        >
          Keep Booking
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-2.5 rounded-full bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Cancel & Refund"
          )}
        </button>
      </div>
    </div>
  </div>
);

// ─── Hidden Ticket for PDF ────────────────────────────────────────────────────

const TicketPDF = React.forwardRef<HTMLDivElement, { ticket: Ticket }>(
  ({ ticket }, ref) => {
    const seg = ticket.passenger.segment;
    const formatT = (iso: string) =>
      new Date(iso).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    const formatD = (iso: string) =>
      new Date(iso).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "794px",
          backgroundColor: "#001233",
          padding: "40px",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
        }}
      >
        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {seg.providerLogo && (
              <img src={seg.providerLogo} alt={seg.providerName} style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }} />
            )}
            <div>
              <h1 style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>✈ SkyLife</h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "2px 0 0" }}>Boarding Pass</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Ticket No.</p>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#34d399", margin: "4px 0 0", fontFamily: "monospace" }}>{ticket.ticketNumber}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>
              Issued: {formatD(ticket.issuedAt)}
            </p>
          </div>
        </div>

        {/* ── Route ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px", padding: "24px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ textAlign: "center", minWidth: "100px" }}>
            <p style={{ fontSize: "40px", fontWeight: "bold", margin: 0, fontFamily: "monospace", letterSpacing: "-1px" }}>{formatT(seg.departureTime)}</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#38bdf8", margin: "4px 0 0" }}>{seg.from}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>{seg.fromName}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: "4px 0 0" }}>{formatD(seg.departureTime)}</p>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
              {Math.floor(seg.durationMinutes / 60)}h {seg.durationMinutes % 60 > 0 ? `${seg.durationMinutes % 60}m` : ""}
            </p>
            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#38bdf8" }} />
              <div style={{ flex: 1, height: "1px", borderTop: "2px dashed rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: "18px" }}>✈</span>
              <div style={{ flex: 1, height: "1px", borderTop: "2px dashed rgba(255,255,255,0.2)" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)" }} />
            </div>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0 }}>Direct</p>
          </div>

          <div style={{ textAlign: "center", minWidth: "100px" }}>
            <p style={{ fontSize: "40px", fontWeight: "bold", margin: 0, fontFamily: "monospace", letterSpacing: "-1px" }}>{formatT(seg.arrivalTime)}</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "rgba(255,255,255,0.6)", margin: "4px 0 0" }}>{seg.to}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>{seg.toName}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: "4px 0 0" }}>{formatD(seg.arrivalTime)}</p>
          </div>
        </div>

        {/* ── Passenger + Seat Info ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div style={{ padding: "16px", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Passenger</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 4px" }}>{ticket.passenger.name}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
              {new Date(ticket.passenger.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} · {ticket.passenger.gender} · {ticket.passenger.mobile}
            </p>
          </div>

          <div style={{ padding: "16px", backgroundColor: "rgba(99,102,241,0.12)", borderRadius: "12px", border: "1px solid rgba(99,102,241,0.25)" }}>
            <p style={{ fontSize: "10px", color: "rgba(165,180,252,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Seat</p>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#a5b4fc", margin: "0 0 4px", fontFamily: "monospace" }}>{seg.seatNumber}</p>
            <p style={{ fontSize: "11px", color: "rgba(165,180,252,0.6)", margin: 0, textTransform: "capitalize" }}>
              {seg.cabinClass.replace(/_/g, " ")} · {seg.position}
            </p>
          </div>
        </div>

        {/* ── Flight Info ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: "Flight", value: seg.flightNumber },
            { label: "Aircraft", value: `${seg.aircraftName}${seg.manufacturer ? ` · ${seg.manufacturer}` : ""}` },
            { label: "Gate", value: seg.gate ?? "TBA" },
            { label: "Cabin Bag", value: `${seg.baggageRules.freeCabinKg}kg free` },
          ].map((item) => (
            <div key={item.label} style={{ padding: "12px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>{item.label}</p>
              <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>

        {seg.amenities && seg.amenities.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {seg.amenities.map((a) => (
          <span key={a} style={{ padding: "4px 10px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>
        {AMENITY_ICONS[a] ?? "✓"} {AMENITY_LABELS[a] ?? a}
        </span>
        ))}
        </div>
        )}
        

        {/* ── Fare ── */}
        <div style={{ padding: "16px", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "24px" }}>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Fare Breakdown</p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", margin: "0 0 2px" }}>Base fare</p>
              <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>₹{seg.baseFare.toLocaleString("en-IN")}</p>
            </div>
            {seg.seatSurcharge > 0 && (
              <div>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", margin: "0 0 2px" }}>Seat</p>
                <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>₹{seg.seatSurcharge.toLocaleString("en-IN")}</p>
              </div>
            )}
            {seg.luggageCharge > 0 && (
              <div>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", margin: "0 0 2px" }}>Luggage</p>
                <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>₹{seg.luggageCharge.toLocaleString("en-IN")}</p>
              </div>
            )}
            <div style={{ marginLeft: "auto" }}>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", margin: "0 0 2px" }}>Segment Total</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#34d399", margin: 0 }}>₹{seg.segmentFare.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>

        {/* ── Food ── */}
        {ticket.flightFood && ticket.flightFood.flightFoodTotal > 0 && (
          <div style={{ padding: "16px", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "24px" }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Food & Beverages</p>
            {ticket.flightFood.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>
                <span>{item.foodName} × {item.quantity}</span>
                <span>₹{item.itemTotal.toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "13px", fontWeight: "bold" }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Food Total</span>
              <span>₹{ticket.flightFood.flightFoodTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            Thank you for flying with SkyLife · Computer-generated ticket
          </p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0, fontFamily: "monospace" }}>
            {ticket.ticketNumber}
          </p>
        </div>
      </div>
    );
  }
);

TicketPDF.displayName = "TicketPDF";


// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
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

// ─── Main Component ───────────────────────────────────────────────────────────

const BookedDetail: React.FC = () => {
  const {
    bookingDetail,
    isLoadingBookingDetail,
    bookingDetailError,
    isCancellingPassenger,
    tickets,
    isLoadingTicket,
    ticketRefs,
    handleCancelPassenger,
    handleDownloadTickets,
    handleGoToBookings,
    formatDate,
    formatTime,
    formatDateTime,
    retrySecondsLeft,
    handleRetryPayment,
  } = useBookedDetail();

  const [cancelTarget, setCancelTarget] = useState<{
    passengerId: string;
    name: string;
    refundAmount: number;
  } | null>(null);

  const [expandedPassenger, setExpandedPassenger] = useState<string | null>(null);

  if (isLoadingBookingDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60">Loading your booking...</p>
        </div>
      </div>
    );
  }

  if (bookingDetailError || !bookingDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-8 text-center max-w-md">
          <XCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <p className="text-red-300 font-medium mb-4">
            {bookingDetailError ?? "Booking not found"}
          </p>
          <button
            onClick={handleGoToBookings}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
          >
            My Bookings
          </button>
        </div>
      </div>
    );
  }

  const status = STATUS_CONFIG[bookingDetail.status] ?? STATUS_CONFIG["pending"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">

      {cancelTarget && (
        <CancelModal
          passengerName={cancelTarget.name}
          refundAmount={cancelTarget.refundAmount}
          isLoading={isCancellingPassenger}
          onConfirm={async () => {
            await handleCancelPassenger(cancelTarget.passengerId);
            setCancelTarget(null);
          }}
          onCancel={() => setCancelTarget(null)}
        />
      )}

    {tickets.map((t, i) => (
  <TicketPDF
    key={t.id}
    ref={(el) => { ticketRefs.current[i] = el; }}
    ticket={t}
  />
))}

      <UserHeader
        onBack={handleGoToBookings}
        backLabel="My Bookings"
        rightExtra={
  bookingDetail.status === "confirmed" ? (
    <button
      onClick={handleDownloadTickets}
      disabled={isLoadingTicket || !tickets.length}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition disabled:opacity-40"
    >
      <Download className="w-4 h-4" />
      {isLoadingTicket
        ? "Loading..."
        : tickets.length
        ? `Download ${tickets.length} Ticket${tickets.length > 1 ? "s" : ""}`
        : "Download Tickets"}
    </button>
  ) : undefined
}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">

        {/* ── Booking Header ── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Booking Details</h1>
            <p className="text-white/40 text-xs font-mono">ID: {bookingDetail.id}</p>
            {bookingDetail.paymentConfirmedAt && (
              <p className="text-white/40 text-xs mt-1">
                Paid on {formatDateTime(bookingDetail.paymentConfirmedAt)}
              </p>
            )}
          </div>
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wide ${status.color}`}>
            {status.icon}
            {status.label}
          </span>
        </div>

        {/* ── Retry Banner ── */}
        {bookingDetail.status === "payment_failed" && (
          <div className="mb-6 bg-amber-500/10 border border-amber-400/30 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <p className="text-amber-300 font-semibold text-sm">Payment Failed</p>
                </div>
                {retrySecondsLeft > 0 ? (
                  <p className="text-white/50 text-xs">
                    Retry window:{" "}
                    <span className="text-amber-400 font-mono">
                      {Math.floor(retrySecondsLeft / 60)}:
                      {String(retrySecondsLeft % 60).padStart(2, "0")}
                    </span>
                  </p>
                ) : (
                  <p className="text-red-400 text-xs">
                    Retry window expired. Please make a new booking.
                  </p>
                )}
              </div>
              {retrySecondsLeft > 0 && (
                <button
                  onClick={handleRetryPayment}
                  className="flex-shrink-0 px-4 py-2.5 rounded-full bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition"
                >
                  Retry Payment
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Flights ── */}
        {bookingDetail.segments.map((seg, idx) => (
          <React.Fragment key={seg.flightId}>
            <Section
              title={`Flight ${bookingDetail.segments.length > 1 ? idx + 1 : ""}`}
              icon={<Plane className="w-4 h-4" />}
            >
              <div className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden">

                {/* Provider header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-white/3">
                  {seg.providerLogo ? (
                    <img
                      src={seg.providerLogo}
                      alt={seg.providerName}
                      className="w-9 h-9 rounded-lg object-cover border border-white/15"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-400/20 flex items-center justify-center">
                      <Plane className="w-4 h-4 text-sky-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold text-sm">{seg.providerName}</p>
                    <p className="text-white/40 text-xs">
                      {seg.flightNumber} · {seg.aircraftName}
                      {seg.manufacturer ? ` · ${seg.manufacturer}` : ""}
                    </p>
                  </div>
                  {seg.gate && (
                    <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20">
                      <span className="text-blue-300 text-xs font-semibold">Gate {seg.gate}</span>
                    </div>
                  )}
                </div>

                {/* Route timeline */}
                <div className="px-5 py-5">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[80px]">
                      <p className="text-2xl font-bold text-white font-mono">
                        {formatTime(seg.departureTime)}
                      </p>
                      <p className="text-sky-400 font-bold text-sm mt-0.5">{seg.from}</p>
                      <p className="text-white/40 text-[11px] mt-0.5 leading-tight">{seg.fromName}</p>
                      <p className="text-white/30 text-[11px] mt-1">{formatDate(seg.departureTime)}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {formatDuration(seg.durationMinutes)}
                      </div>
                      <div className="w-full flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <div className="flex-1 border-t border-dashed border-white/20" />
                        <Plane className="w-3.5 h-3.5 text-sky-400 rotate-90" />
                        <div className="flex-1 border-t border-dashed border-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      </div>
                      <p className="text-white/25 text-[10px]">Direct</p>
                    </div>

                    <div className="text-center min-w-[80px]">
                      <p className="text-2xl font-bold text-white font-mono">
                        {formatTime(seg.arrivalTime)}
                      </p>
                      <p className="text-white/60 font-bold text-sm mt-0.5">{seg.to}</p>
                      <p className="text-white/40 text-[11px] mt-0.5 leading-tight">{seg.toName}</p>
                      <p className="text-white/30 text-[11px] mt-1">{formatDate(seg.arrivalTime)}</p>
                    </div>
                  </div>
                </div>

                {/* Baggage rules */}
                <div className="border-t border-white/8 px-5 py-3 flex items-center gap-6 bg-white/2">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Luggage className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      <span className="text-emerald-400 font-semibold">
                        {seg.baggageRules.freeCabinKg}kg
                      </span>{" "}
                      free cabin
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Info className="w-3 h-3 text-amber-400" />
                    <span>
                      Extra ₹{seg.baggageRules.extraChargePerKg.toLocaleString("en-IN")}/kg
                      {seg.baggageRules.maxExtraKg ? ` · max ${seg.baggageRules.maxExtraKg}kg` : ""}
                    </span>
                  </div>
                </div>
                {seg.amenities && seg.amenities.length > 0 && (
  <div className="border-t border-white/8 px-5 py-3 bg-white/2">
    <AmenitiesRow amenities={seg.amenities} />
  </div>
)}
              </div>
            </Section>

            {/* Layover */}
            {idx < bookingDetail.segments.length - 1 && bookingDetail.segments[idx + 1] && (
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="flex-1 border-t border-dashed border-white/15" />
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300 text-xs font-semibold">
                    {getLayoverDuration(seg.arrivalTime, bookingDetail.segments[idx + 1]!.departureTime)} layover
                  </span>
                  <span className="text-white/30 text-xs">· {seg.to}</span>
                </div>
                <div className="flex-1 border-t border-dashed border-white/15" />
              </div>
            )}
          </React.Fragment>
        ))}

        {/* ── Passengers ── */}
        <Section title="Passengers" icon={<User className="w-4 h-4" />}>
          <div className="flex flex-col gap-3">
            {bookingDetail.passengers.map((passenger, idx) => {
              const isCancelled = passenger.status === "cancelled";
              const now = new Date();
              const canCancel =
                bookingDetail.status === "confirmed" &&
                !isCancelled &&
                passenger.segments.every((s) => new Date(s.departureTime) > now);
              const isExpanded = expandedPassenger === passenger.passengerId;

              return (
                <div
                  key={passenger.passengerId}
                  className={`bg-white/4 border rounded-2xl overflow-hidden ${
                    isCancelled ? "border-red-400/20 opacity-60" : "border-white/10"
                  }`}
                >
                  {/* Passenger header */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-500/15 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sky-400 text-xs font-bold">{idx + 1}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{passenger.name}</p>
                        <p className="text-white/40 text-xs capitalize">
                          {passenger.gender} · DOB:{" "}
                          {new Date(passenger.dob).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-white font-bold text-sm">
                        ₹{passenger.passengerTotal.toLocaleString("en-IN")}
                      </p>
                      {isCancelled ? (
                        <span className="px-2 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-400/30 text-xs font-semibold">
                          Cancelled
                        </span>
                      ) : canCancel ? (
                        <button
                          onClick={() =>
                            setCancelTarget({
                              passengerId: passenger.passengerId,
                              name: passenger.name,
                              refundAmount: passenger.passengerTotal,
                            })
                          }
                          className="px-3 py-1.5 rounded-full bg-red-500/15 text-red-300 border border-red-400/30 text-xs font-semibold hover:bg-red-500/25 transition"
                        >
                          Cancel
                        </button>
                      ) : null}
                      <button
                        onClick={() => setExpandedPassenger(isExpanded ? null : passenger.passengerId)}
                        className="text-white/30 hover:text-white transition"
                      >
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-white/8 px-5 py-4 space-y-4">

                      {/* Contact info */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-white/3 rounded-xl px-3 py-2.5">
                          <p className="text-white/40 mb-0.5">Mobile</p>
                          <p className="text-white font-semibold">+91 {passenger.mobile}</p>
                        </div>
                        <div className="bg-white/3 rounded-xl px-3 py-2.5">
                          <p className="text-white/40 mb-0.5">Extra Luggage</p>
                          <p className="text-white font-semibold">
                            {passenger.extraLuggageKg > 0 ? `${passenger.extraLuggageKg}kg` : "None"}
                          </p>
                        </div>
                      </div>

                      {/* Per segment fare breakdown */}
                      {passenger.segments.map((seg) => {
                        const flightSeg = bookingDetail.segments.find(
                          (s) => s.flightId === seg.flightId
                        );
                        return (
                          <div key={seg.flightId} className="bg-white/3 rounded-xl px-4 py-3">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Armchair className="w-3.5 h-3.5 text-sky-400" />
                                <span className="text-white font-bold text-sm">
                                  Seat {seg.seatNumber}
                                </span>
                                <span className="text-white/40 text-xs">
                                  · {formatCabinClass(seg.cabinClass)} · {formatPosition(seg.position)}
                                </span>
                              </div>
                              {flightSeg && (
                                <span className="text-white/30 text-xs">
                                  {flightSeg.from} → {flightSeg.to}
                                </span>
                              )}
                            </div>
                            <div className="space-y-1.5 text-xs">
                              <div className="flex justify-between text-white/50">
                                <span>Base fare</span>
                                <span className="text-white">₹{seg.baseFare.toLocaleString("en-IN")}</span>
                              </div>
                              {seg.seatSurcharge > 0 && (
                                <div className="flex justify-between text-white/50">
                                  <span>Seat surcharge ({formatPosition(seg.position)})</span>
                                  <span className="text-white">₹{seg.seatSurcharge.toLocaleString("en-IN")}</span>
                                </div>
                              )}
                              {seg.luggageCharge > 0 && (
                                <div className="flex justify-between text-white/50">
                                  <span>Extra luggage charge</span>
                                  <span className="text-white">₹{seg.luggageCharge.toLocaleString("en-IN")}</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-1.5 border-t border-white/8 text-white font-semibold">
                                <span>Segment total</span>
                                <span>₹{seg.segmentFare.toLocaleString("en-IN")}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Refund info */}
                  {isCancelled && passenger.refundAmount != null && (
                    <div className="px-5 pb-4">
                      <p className="text-emerald-400 text-xs">
                        ₹{passenger.refundAmount.toLocaleString("en-IN")} refunded to wallet
                        {passenger.cancelledAt ? ` · ${formatDate(passenger.cancelledAt)}` : ""}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Food ── */}
        {bookingDetail.flightFoods.filter((ff) => ff.flightFoodTotal > 0).length > 0 && (
          <Section title="Food Selection" icon={<Utensils className="w-4 h-4" />}>
            <div className="flex flex-col gap-3">
              {bookingDetail.flightFoods
                .filter((ff) => ff.flightFoodTotal > 0)
                .map((ff) => {
                  const seg = bookingDetail.segments.find((s) => s.flightId === ff.flightId);
                  return (
                    <div key={ff.flightId} className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden">
                      {seg && (
                        <div className="px-5 py-3 border-b border-white/8 bg-white/2">
                          <p className="text-white/50 text-xs flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            {seg.from} → {seg.to} · {seg.flightNumber}
                          </p>
                        </div>
                      )}
                      <div className="px-5 py-4 space-y-2.5">
                        {ff.items.map((item) => (
                          <div key={item.foodId} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-white/8 flex items-center justify-center text-[10px] text-white/50 font-bold">
                                {item.quantity}
                              </span>
                              <span className="text-white/80">{item.foodName}</span>
                            </div>
                            <span className="text-white font-semibold">
                              {item.itemTotal === 0 ? "Free" : `₹${item.itemTotal.toLocaleString("en-IN")}`}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-white/8 text-xs text-white/50">
                          <span>Flight food total</span>
                          <span className="text-white font-semibold">
                            ₹{ff.flightFoodTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Section>
        )}

        {/* ── Fare Summary ── */}
        <Section title="Fare Summary" icon={<CreditCard className="w-4 h-4" />}>
          <div className="bg-white/4 border border-white/10 rounded-2xl p-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Subtotal</span>
              <span className="text-white">₹{bookingDetail.subtotal.toLocaleString("en-IN")}</span>
            </div>
            {bookingDetail.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-emerald-400">Discount</span>
                <span className="text-emerald-400">
                  − ₹{bookingDetail.discount.toLocaleString("en-IN")}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-white/10">
              <span className="text-white font-bold">Total Paid</span>
              <span className="text-white font-bold text-lg">
                ₹{bookingDetail.grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </Section>

        <button
          onClick={handleGoToBookings}
          className="w-full mt-2 py-3.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition"
        >
          View All Bookings
        </button>
      </div>
    </div>
  );
};

export default BookedDetail;