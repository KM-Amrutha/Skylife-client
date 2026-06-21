import React, { useState } from "react";
import {
  ChevronRight,
  Tag,
  CheckCircle,
  Plane,
  Users,
  Utensils,
  Luggage,
  Clock,
  MapPin,
  Edit3,
  CreditCard,
  Info,
  Armchair,
} from "lucide-react";
import useBookingSummary from "../../hooks/booking/useBookingSummary";
import UserHeader from "../user/UserHeader";
import { AmenitiesRow } from "../../utils/amenities";

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

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2.5 mb-4">
      <div className="text-sky-400">{icon}</div>
      <h2 className="text-white font-bold text-base tracking-wide uppercase text-xs letter-spacing-wider">
        {title}
      </h2>
      <div className="flex-1 h-px bg-white/10 ml-2" />
    </div>
    {children}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BookingSummaryComponent: React.FC = () => {
  const {
    summary,
    isLoadingSummary,
    summaryError,
    eligibleOffers,
    isLoadingOffers,
    selectedOfferId,
    selectedOffer,
    displayAmount,
    discountAmount,
    isInitiatingBooking,
    handleSelectOffer,
    handlePay,
    handleBack,
    formatTime, 
    formatDate,
  } = useBookingSummary();

  const [expandedPassenger, setExpandedPassenger] = useState<string | null>(null);

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (isLoadingSummary) {
    return (
      <div className="min-h-screen bg-[#020B18] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-sky-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-sky-400 animate-spin" />
          </div>
          <p className="text-white/40 text-sm font-mono tracking-widest uppercase">
            Loading summary...
          </p>
        </div>
      </div>
    );
  }

  if (summaryError || !summary) {
    return (
      <div className="min-h-screen bg-[#020B18] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-8 text-center max-w-sm">
          <p className="text-red-300 text-sm mb-5">
            {summaryError || "Summary not available"}
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020B18] text-white">

      {/* header */}
     <div className="sticky top-0 z-40 bg-[#001233]/90 backdrop-blur-xl">
  <UserHeader
    onBack={handleBack}
    backLabel="Back"
    steps={[
      { label: "Flights", active: false },
      { label: "Passengers", active: false },
      { label: "Summary", active: true },
    ]}
  />
</div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left Column — Main Content ── */}
          <div className="flex-1 min-w-0">

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-1">Booking Summary</h1>
              <p className="text-white/40 text-sm">Review everything before you pay</p>
            </div>

            {/* ── Flight Itinerary ── */}
           {summary.segments.map((seg, idx) => (
             <React.Fragment key={seg.flightId}>
              <Section
                key={seg.flightId}
                title={`Flight ${summary.segments.length > 1 ? idx + 1 : ""}`}
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

                      {/* Departure */}
                      <div className="text-center min-w-[80px]">
                        <p className="text-2xl font-bold text-white font-mono">
                          {formatTime(seg.departureTime)}
                        </p>
                        <p className="text-sky-400 font-bold text-sm mt-0.5">{seg.from}</p>
                        <p className="text-white/40 text-[11px] mt-0.5 leading-tight">
                          {seg.fromName}
                        </p>
                        <p className="text-white/30 text-[11px] mt-1">
                          {formatDate(seg.departureTime)}
                        </p>
                      </div>

                      {/* Duration line */}
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

                      {/* Arrival */}
                      <div className="text-center min-w-[80px]">
                        <p className="text-2xl font-bold text-white font-mono">
                          {formatTime(seg.arrivalTime)}
                        </p>
                        <p className="text-white/60 font-bold text-sm mt-0.5">{seg.to}</p>
                        <p className="text-white/40 text-[11px] mt-0.5 leading-tight">
                          {seg.toName}
                        </p>
                        <p className="text-white/30 text-[11px] mt-1">
                          {formatDate(seg.arrivalTime)}
                        </p>
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
                        {seg.baggageRules.maxExtraKg
                          ? ` · max ${seg.baggageRules.maxExtraKg}kg`
                          : ""}
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
{idx < summary.segments.length - 1 &&
  summary.segments[idx + 1] && (
    <div className="flex items-center gap-3 mb-8 px-2">
      <div className="flex-1 border-t border-dashed border-white/15" />

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20">
        <Clock className="w-3 h-3 text-amber-400" />

        <span className="text-amber-300 text-xs font-semibold">
          {getLayoverDuration(
            seg.arrivalTime,
            summary.segments[idx + 1]!.departureTime
          )}{" "}
          layover
        </span>

        <span className="text-white/30 text-xs">
          · {seg.to}
        </span>
      </div>

      <div className="flex-1 border-t border-dashed border-white/15" />
    </div>
)}

  </React.Fragment>

))}
              
          
            

            {/* ── Passengers ── */}
            <Section title="Passengers" icon={<Users className="w-4 h-4" />}>
              <div className="flex flex-col gap-3">
                {summary.passengers.map((passenger, index) => {
                  const farePassenger = summary.fareBreakdown.passengerFares.find(
                    (pf) => pf.passengerId === passenger.passengerId
                  );
                  const isExpanded = expandedPassenger === passenger.passengerId;

                  return (
                    <div
                      key={passenger.passengerId}
                      className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden"
                    >
                      {/* Passenger header */}
                      <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-sky-500/15 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-sky-400 text-xs font-bold">{index + 1}</span>
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
                            ₹{farePassenger?.passengerTotal.toLocaleString("en-IN")}
                          </p>
                          <button
                            onClick={() =>
                              setExpandedPassenger(isExpanded ? null : passenger.passengerId)
                            }
                            className="text-white/30 hover:text-white transition"
                          >
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
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
                                {passenger.extraLuggageKg > 0
                                  ? `${passenger.extraLuggageKg}kg`
                                  : "None"}
                              </p>
                            </div>
                          </div>

                          {/* Seats */}
                          {passenger.seats.map((seat) => {
                            const flightSeg = summary.segments.find(
                              (s) => s.flightId === seat.flightId
                            );
                            return (
                              <div
                                key={seat.flightSeatId}
                                className="bg-white/3 rounded-xl px-4 py-3"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Armchair className="w-3.5 h-3.5 text-sky-400" />
                                    <span className="text-white font-bold text-sm">
                                      Seat {seat.seatNumber}
                                    </span>
                                    <span className="text-white/40 text-xs">
                                      · {formatCabinClass(seat.cabinClass)} ·{" "}
                                      {formatPosition(seat.position)}
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
                                    <span className="text-white">
                                      ₹{seat.baseFare.toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                  {seat.seatSurcharge > 0 && (
                                    <div className="flex justify-between text-white/50">
                                      <span>Seat surcharge ({formatPosition(seat.position)})</span>
                                      <span className="text-white">
                                        ₹{seat.seatSurcharge.toLocaleString("en-IN")}
                                      </span>
                                    </div>
                                  )}
                                  {seat.luggageCharge > 0 && (
                                    <div className="flex justify-between text-white/50">
                                      <span>Extra luggage charge</span>
                                      <span className="text-white">
                                        ₹{seat.luggageCharge.toLocaleString("en-IN")}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex justify-between pt-1.5 border-t border-white/8 text-white font-semibold">
                                    <span>Segment total</span>
                                    <span>₹{seat.segmentFare.toLocaleString("en-IN")}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* Edit button */}
                          <button
                            onClick={handleBack}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition text-xs font-semibold"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Edit passenger details
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* ── Food ── */}
            {summary.flightFoods.length > 0 && (
              <Section title="Food Selection" icon={<Utensils className="w-4 h-4" />}>
                <div className="flex flex-col gap-3">
                  {summary.flightFoods.map((ff) => {
                    const flightSeg = summary.segments.find((s) => s.flightId === ff.flightId);
                    return (
                      <div
                        key={ff.flightId}
                        className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden"
                      >
                        {flightSeg && (
                          <div className="px-5 py-3 border-b border-white/8 bg-white/2">
                            <p className="text-white/50 text-xs flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" />
                              {flightSeg.from} → {flightSeg.to} · {flightSeg.flightNumber}
                            </p>
                          </div>
                        )}
                        <div className="px-5 py-4 space-y-2.5">
                          {ff.items.map((item) => (
                            <div
                              key={item.foodId}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-white/8 flex items-center justify-center text-[10px] text-white/50 font-bold">
                                  {item.quantity}
                                </span>
                                <span className="text-white/80">{item.foodName}</span>
                              </div>
                              <span className="text-white font-semibold">
                                {item.itemTotal === 0
                                  ? "Free"
                                  : `₹${item.itemTotal.toLocaleString("en-IN")}`}
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

            {/* ── Offers ── */}
            <Section title="Available Offers" icon={<Tag className="w-4 h-4" />}>
              {isLoadingOffers ? (
                <div className="text-white/30 text-sm text-center py-4">
                  Checking eligible offers...
                </div>
              ) : eligibleOffers.length === 0 ? (
                <div className="bg-white/3 border border-white/8 rounded-2xl p-5 text-center">
                  <p className="text-white/30 text-sm">No eligible offers for this booking</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {eligibleOffers.map((offer) => {
                    const isSelected = selectedOfferId === offer.id;
                    return (
                      <button
                        key={offer.id}
                        onClick={() => handleSelectOffer(isSelected ? null : offer.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-emerald-500/8 border-emerald-400/30"
                            : "bg-white/3 border-white/8 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p
                                className={`font-bold text-sm font-mono ${
                                  isSelected ? "text-emerald-300" : "text-white"
                                }`}
                              >
                                {offer.offerCode}
                              </p>
                              <p className="text-white/40 text-xs mt-0.5">{offer.description}</p>
                              <p className="text-white/30 text-xs mt-1">
                                Min. ₹{offer.minimumAmount.toLocaleString("en-IN")} · Valid till{" "}
                                {new Date(offer.validTo).toLocaleDateString("en-IN")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-emerald-400 font-bold text-sm">
                              {offer.discountPercentage}% off
                            </p>
                            <p className="text-white/40 text-xs mt-0.5">
                              Save ₹{offer.discountAmount.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </Section>
          </div>

          {/* ── Right Column — Fare Summary ── */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">

              {/* Fare breakdown card */}
              <div className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden mb-4">
                <div className="px-5 py-4 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-sky-400" />
                    <h3 className="text-white font-bold text-sm">Fare Breakdown</h3>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-3">

                  {/* Per passenger fares */}
                  {summary.fareBreakdown.passengerFares.map((pf) => (
                    <div key={pf.passengerId} className="space-y-1.5">
                      <p className="text-white/50 text-xs font-semibold">{pf.passengerName}</p>
                      {pf.perSegment.map((seg) => (
                        <div
                          key={seg.flightId}
                          className="flex justify-between text-xs text-white/40 pl-2"
                        >
                          <span>
                            {seg.from}→{seg.to} · Seat {seg.seatNumber}
                          </span>
                          <span className="text-white/60">
                            ₹{seg.segmentFare.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-xs text-white/60 pl-2 pt-1 border-t border-white/5">
                        <span>Subtotal</span>
                        <span className="font-semibold">
                          ₹{pf.passengerTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/10 pt-3 space-y-2">
                    {/* Passenger total */}
                    <div className="flex justify-between text-sm text-white/70">
                      <span>Passengers total</span>
                      <span>₹{summary.fareBreakdown.subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    {/* Food */}
                    {summary.fareBreakdown.foodTotal > 0 && (
                      <div className="flex justify-between text-sm text-white/70">
                        <span>Food & beverages</span>
                        <span>
                          ₹{summary.fareBreakdown.foodTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    {/* Taxes */}
                    <div className="flex justify-between text-sm text-white/50">
                      <span>Taxes & fees</span>
                      <span className="text-emerald-400 text-xs font-semibold">Included</span>
                    </div>

                    {/* Discount */}
                    {discountAmount > 0 && selectedOffer && (
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {selectedOffer.offerCode}
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          − ₹{discountAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t border-white/15 pt-3 flex justify-between items-end">
                    <div>
                      <p className="text-white/50 text-xs">Total payable</p>
                      <p className="text-white font-bold text-2xl">
                        ₹{displayAmount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    {discountAmount > 0 && (
                      <div className="text-right">
                        <p className="text-emerald-400 text-xs font-semibold">
                          You save ₹{discountAmount.toLocaleString("en-IN")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={isInitiatingBooking}
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white text-base font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                {isInitiatingBooking ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ₹{displayAmount.toLocaleString("en-IN")}
                  </>
                )}
              </button>

              <p className="text-center text-white/25 text-xs mt-3">
                🔒 Secured by Stripe · 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryComponent;