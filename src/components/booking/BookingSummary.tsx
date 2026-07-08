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
  Wallet
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
      <div className="text-[#0a3a8a]">{icon}</div>
      <h2 className="text-gray-900 font-bold text-base tracking-wide uppercase text-xs letter-spacing-wider">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-200 ml-2" />
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
    userWallet,
    isPayingWithWallet,
    showWalletConfirm,
  handleWalletConfirmOpen,
  handleWalletConfirmClose,
  handleConfirmWalletPay,
  } = useBookingSummary();

  const [expandedPassenger, setExpandedPassenger] = useState<string | null>(null);

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (isLoadingSummary) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#0a3a8a] animate-spin" />
          </div>
          <p className="text-gray-600 text-sm font-mono tracking-widest uppercase">
            Loading summary...
          </p>
        </div>
      </div>
    );
  }

  if (summaryError || !summary) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-sm">
          <p className="text-red-600 text-sm mb-5">
            {summaryError || "Summary not available"}
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">

      {/* header */}
     <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200">
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

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-2 py-8">
        {/* Blue Banner Header */}
<div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-8 shadow-xs max-w-5xl mx-auto">
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <CreditCard className="w-6 h-6 text-[#0a3a8a]" />
    </div>
    <div className="flex-1 min-w-0">
      <h1 className="text-2xl sm:text-3xl font-bold">Booking Summary</h1>
      <p className="text-blue-200 text-sm mt-1">Review everything before you pay</p>
    </div>
  </div>
</div>
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left Column — Main Content ── */}
          <div className="flex-1 min-w-0">

           

            {/* ── Flight Itinerary ── */}
           {summary.segments.map((seg, idx) => (
             <React.Fragment key={seg.flightId}>
              <Section
                key={seg.flightId}
                title={`Flight ${summary.segments.length > 1 ? idx + 1 : ""}`}
                icon={<Plane className="w-4 h-4" />}
              >
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                  {/* Provider header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                    {seg.providerLogo ? (
                      <img
                        src={seg.providerLogo}
                        alt={seg.providerName}
                        className="w-9 h-9 rounded-lg object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <Plane className="w-4 h-4 text-[#0a3a8a]" />
                      </div>
                    )}
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">{seg.providerName}</p>
                      <p className="text-gray-600 text-xs">
                        {seg.flightNumber} · {seg.aircraftName}
                        {seg.manufacturer ? ` · ${seg.manufacturer}` : ""} 
                      </p>
                    </div>
                     {seg.gate && (
                    <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200">
                    <span className="text-[#0a3a8a] text-xs font-semibold">Gate {seg.gate}</span>
                    </div>
                         )}
                  </div>

                  {/* Route timeline */}
                  <div className="px-5 py-5">
                    <div className="flex items-center gap-4">

                      {/* Departure */}
                      <div className="text-center min-w-[80px]">
                        <p className="text-2xl font-bold text-gray-900 font-mono">
                          {formatTime(seg.departureTime)}
                        </p>
                        <p className="text-[#0a3a8a] font-bold text-sm mt-0.5">{seg.from}</p>
                        <p className="text-gray-600 text-[11px] mt-0.5 leading-tight">
                          {seg.fromName}
                        </p>
                        <p className="text-gray-600 text-[11px] mt-1">
                          {formatDate(seg.departureTime)}
                        </p>
                      </div>

                      {/* Duration line */}
                      <div className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="flex items-center gap-1.5 text-gray-600 text-[11px]">
                          <Clock className="w-3 h-3" />
                          {formatDuration(seg.durationMinutes)}
                        </div>
                        <div className="w-full flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0a3a8a]" />
                          <div className="flex-1 border-t border-dashed border-gray-200" />
                          <Plane className="w-3.5 h-3.5 text-[#0a3a8a] rotate-90" />
                          <div className="flex-1 border-t border-dashed border-gray-200" />
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        </div>
                        <p className="text-gray-600 text-[10px]">Direct</p>
                      </div>

                      {/* Arrival */}
                      <div className="text-center min-w-[80px]">
                        <p className="text-2xl font-bold text-gray-900 font-mono">
                          {formatTime(seg.arrivalTime)}
                        </p>
                        <p className="text-gray-600 font-bold text-sm mt-0.5">{seg.to}</p>
                        <p className="text-gray-600 text-[11px] mt-0.5 leading-tight">
                          {seg.toName}
                        </p>
                        <p className="text-gray-600 text-[11px] mt-1">
                          {formatDate(seg.arrivalTime)}
                        </p>
                      </div>
                    </div>
                  </div>
  

                  {/* Baggage rules */}
                  <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-6 bg-gray-50 flex-wrap">
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Luggage className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        <span className="text-emerald-600 font-semibold">
                          {seg.baggageRules.freeCabinKg}kg
                        </span>{" "}
                        free cabin
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Info className="w-3 h-3 text-amber-500" />
                      <span>
                        Extra ₹{seg.baggageRules.extraChargePerKg.toLocaleString("en-IN")}/kg
                        {seg.baggageRules.maxExtraKg
                          ? ` · max ${seg.baggageRules.maxExtraKg}kg`
                          : ""}
                      </span>
                    </div>
                  </div>
                  {seg.amenities && seg.amenities.length > 0 && (
  <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
    <AmenitiesRow amenities={seg.amenities} />
  </div>
)}
                </div>
              </Section>
{idx < summary.segments.length - 1 &&
  summary.segments[idx + 1] && (
    <div className="flex items-center gap-3 mb-8 px-2">
      <div className="flex-1 border-t border-dashed border-gray-200" />

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-600" />

        <span className="text-amber-600 text-xs font-semibold">
          {getLayoverDuration(
            seg.arrivalTime,
            summary.segments[idx + 1]!.departureTime
          )}{" "}
          layover
        </span>

        <span className="text-gray-600 text-xs">
          · {seg.to}
        </span>
      </div>

      <div className="flex-1 border-t border-dashed border-gray-200" />
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
                      className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                      {/* Passenger header */}
                      <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#0a3a8a] text-xs font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-gray-900 font-semibold text-sm">{passenger.name}</p>
                            <p className="text-gray-600 text-xs capitalize">
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
                          <p className="text-gray-900 font-bold text-sm">
                            ₹{farePassenger?.passengerTotal.toLocaleString("en-IN")}
                          </p>
                          <button
                            onClick={() =>
                              setExpandedPassenger(isExpanded ? null : passenger.passengerId)
                            }
                            className="text-gray-600 hover:text-gray-900 transition"
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
                        <div className="border-t border-gray-100 px-5 py-4 space-y-4">

                          {/* Contact info */}
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                              <p className="text-gray-600 mb-0.5">Mobile</p>
                              <p className="text-gray-900 font-semibold">+91 {passenger.mobile}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                              <p className="text-gray-600 mb-0.5">Extra Luggage</p>
                              <p className="text-gray-900 font-semibold">
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
                                className="bg-gray-50 rounded-xl px-4 py-3"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Armchair className="w-3.5 h-3.5 text-[#0a3a8a]" />
                                    <span className="text-gray-900 font-bold text-sm">
                                      Seat {seat.seatNumber}
                                    </span>
                                    <span className="text-gray-600 text-xs">
                                      · {formatCabinClass(seat.cabinClass)} ·{" "}
                                      {formatPosition(seat.position)}
                                    </span>
                                  </div>
                                  {flightSeg && (
                                    <span className="text-gray-600 text-xs">
                                      {flightSeg.from} → {flightSeg.to}
                                    </span>
                                  )}
                                </div>
                                <div className="space-y-1.5 text-xs">
                                  <div className="flex justify-between text-gray-700">
                                    <span>Base fare</span>
                                    <span className="text-gray-900">
                                      ₹{seat.baseFare.toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                  {seat.seatSurcharge > 0 && (
                                    <div className="flex justify-between text-gray-700">
                                      <span>Seat surcharge ({formatPosition(seat.position)})</span>
                                      <span className="text-gray-900">
                                        ₹{seat.seatSurcharge.toLocaleString("en-IN")}
                                      </span>
                                    </div>
                                  )}
                                  {seat.luggageCharge > 0 && (
                                    <div className="flex justify-between text-gray-700">
                                      <span>Extra luggage charge</span>
                                      <span className="text-gray-900">
                                        ₹{seat.luggageCharge.toLocaleString("en-IN")}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex justify-between pt-1.5 border-t border-gray-200 text-gray-900 font-semibold">
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
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 transition text-xs font-semibold"
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
                        className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                      >
                        {flightSeg && (
                          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-gray-700 text-xs flex items-center gap-1.5">
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
                                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-700 font-bold">
                                  {item.quantity}
                                </span>
                                <span className="text-gray-700">{item.foodName}</span>
                              </div>
                              <span className="text-gray-900 font-semibold">
                                {item.itemTotal === 0
                                  ? "Free"
                                  : `₹${item.itemTotal.toLocaleString("en-IN")}`}
                              </span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-2 border-t border-gray-100 text-xs text-gray-700">
                            <span>Flight food total</span>
                            <span className="text-gray-900 font-semibold">
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
                <div className="text-gray-600 text-sm text-center py-4">
                  Checking eligible offers...
                </div>
              ) : eligibleOffers.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
                  <p className="text-gray-600 text-sm">No eligible offers for this booking</p>
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
                            ? "bg-emerald-50 border-emerald-300"
                            : "bg-gray-50 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p
                                className={`font-bold text-sm font-mono ${
                                  isSelected ? "text-emerald-700" : "text-gray-900"
                                }`}
                              >
                                {offer.offerCode}
                              </p>
                              <p className="text-gray-600 text-xs mt-0.5">{offer.description}</p>
                              <p className="text-gray-600 text-xs mt-1">
                                Min. ₹{offer.minimumAmount.toLocaleString("en-IN")} · Valid till{" "}
                                {new Date(offer.validTo).toLocaleDateString("en-IN")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-emerald-600 font-bold text-sm">
                              {offer.discountPercentage}% off
                            </p>
                            <p className="text-gray-600 text-xs mt-0.5">
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
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-4">
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#0a3a8a]" />
                    <h3 className="text-gray-900 font-bold text-sm">Fare Breakdown</h3>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-3">

                  {/* Per passenger fares */}
                  {summary.fareBreakdown.passengerFares.map((pf) => (
                    <div key={pf.passengerId} className="space-y-1.5">
                      <p className="text-gray-700 text-xs font-semibold">{pf.passengerName}</p>
                      {pf.perSegment.map((seg) => (
                        <div
                          key={seg.flightId}
                          className="flex justify-between text-xs text-gray-600 pl-2"
                        >
                          <span>
                            {seg.from}→{seg.to} · Seat {seg.seatNumber}
                          </span>
                          <span className="text-gray-600">
                            ₹{seg.segmentFare.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-xs text-gray-600 pl-2 pt-1 border-t border-gray-100">
                        <span>Subtotal</span>
                        <span className="font-semibold">
                          ₹{pf.passengerTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 pt-3 space-y-2">
                    {/* Passenger total */}
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Passengers total</span>
                      <span>₹{summary.fareBreakdown.subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    {/* Food */}
                    {summary.fareBreakdown.foodTotal > 0 && (
                      <div className="flex justify-between text-sm text-gray-700">
                        <span>Food & beverages</span>
                        <span>
                          ₹{summary.fareBreakdown.foodTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    {/* Taxes */}
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Taxes & fees</span>
                      <span className="text-emerald-600 text-xs font-semibold">Included</span>
                    </div>

                    {/* Discount */}
                    {discountAmount > 0 && selectedOffer && (
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {selectedOffer.offerCode}
                        </span>
                        <span className="text-emerald-600 font-semibold">
                          − ₹{discountAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-end">
                    <div>
                      <p className="text-gray-700 text-xs">Total payable</p>
                      <p className="text-gray-900 font-bold text-2xl">
                        ₹{displayAmount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    {discountAmount > 0 && (
                      <div className="text-right">
                        <p className="text-emerald-600 text-xs font-semibold">
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
                 className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10"
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
              
                <p className="text-center text-gray-600 text-xs mt-3">
                🔒 Secured by Stripe · 256-bit encryption
              </p>
              <div className="mt-3">
  <div className="flex items-center gap-2 mb-2">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-gray-400 text-xs">or</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>

  {userWallet !== null && (
    <div className="mb-2 text-center">
      <span className="text-gray-600 text-xs">
        Wallet balance:{" "}
        <span className={`font-bold ${(userWallet?.balance ?? 0) >= displayAmount ? "text-emerald-600" : "text-red-500"}`}>
          ₹{(userWallet?.balance ?? 0).toLocaleString("en-IN")}
        </span>
      </span>
    </div>
  )}

  <button
  onClick={handleWalletConfirmOpen}
    disabled={isPayingWithWallet || (userWallet?.balance ?? 0) < displayAmount}
    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    {isPayingWithWallet ? (
      <>
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        Processing...
      </>
    ) : (userWallet?.balance ?? 0) < displayAmount ? (
      "Insufficient wallet balance"
    ) : (
      <>
        <Wallet className="w-4 h-4" />
        Pay with Wallet
      </>
    )}
  </button>
</div>
            </div>
          </div>
        </div>
      </div>
      {showWalletConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-sm w-full">

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
          <Wallet className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-gray-900 font-bold text-base">Confirm Wallet Payment</h3>
          <p className="text-gray-500 text-xs mt-0.5">This will deduct from your wallet</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Amount to pay</span>
          <span className="text-gray-900 font-bold">₹{displayAmount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Wallet balance</span>
          <span className="text-emerald-600 font-bold">
            ₹{(userWallet?.balance ?? 0).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
          <span className="text-gray-600">Balance after payment</span>
          <span className="text-gray-900 font-semibold">
            ₹{((userWallet?.balance ?? 0) - displayAmount).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleWalletConfirmClose}
          className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmWalletPay}
          disabled={isPayingWithWallet}
          className="flex-1 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPayingWithWallet ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><Wallet className="w-4 h-4" /> Confirm & Pay</>
          )}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default BookingSummaryComponent;