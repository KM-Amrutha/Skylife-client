import React from "react";
import { Plane, Trash2, Users, ChevronRight } from "lucide-react";
import useBookingSegment from "../../hooks/booking/useBookingSegment";
import { BookingSegmentFlight } from "../../redux/booking/bookingType";
import UserHeader from "../user/UserHeader";

const FlightSegmentCard: React.FC<{
  flight: BookingSegmentFlight;
  index: number;
  onRemove: (flightId: string) => void;
  isUpdating: boolean;
  formatTime: (iso: string) => string;
  formatDuration: (minutes: number) => string;
  getLowestFare: (baseFare: BookingSegmentFlight["baseFare"]) => number;
}> = ({ flight, index, onRemove, isUpdating, formatTime, formatDuration, getLowestFare }) => {
  const availableClasses = Object.entries(flight.baseFare)
    .filter(([, v]) => v && v > 0)
    .map(([k]) => k);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden min-w-0">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <span className="text-[#0a3a8a] text-xs font-bold">{index + 1}</span>
          </div>
          <span className="text-gray-400 text-xs uppercase tracking-widest truncate">
            {index === 0 ? "Outbound" : index === 1 ? "Return" : `Stop ${index}`}
          </span>
        </div>
        <button
          onClick={() => onRemove(flight.flightId)}
          disabled={isUpdating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 hover:border-red-300 transition text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Trash2 className="w-3 h-3" />
          Remove
        </button>
      </div>

      {/* Flight info */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 min-w-0 w-full">
        {/* Aircraft name */}
        <div className="lg:w-36 lg:flex-shrink-0 min-w-0">
          <p className="text-gray-900 font-bold text-base leading-tight truncate">
            {flight.flightNumber}
          </p>

          <div className="flex items-center gap-2 mt-1 min-w-0">
            {flight.providerLogo && (
              <img
                src={flight.providerLogo}
                alt={flight.providerName}
                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
              />
            )}
            <span className="text-gray-600 text-xs truncate">
              {flight.providerName}
            </span>
          </div>

          <p className="text-gray-400 text-xs mt-1 truncate">
            {flight.from} → {flight.to}
          </p>
        </div>

        {/* Route timeline */}
        <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="text-center flex-shrink-0 max-w-[110px] sm:max-w-none">
            <p className="text-gray-900 font-bold text-lg sm:text-xl leading-none">
              {formatTime(flight.departureTime)}
            </p>
            <p className="text-gray-600 text-xs font-semibold mt-1">{flight.from}</p>
            <p className="text-gray-400 text-[10px] sm:text-xs truncate">{flight.fromName}</p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 min-w-[40px]">
            <p className="text-gray-400 text-[10px] sm:text-xs whitespace-nowrap">{formatDuration(flight.durationMinutes)}</p>
            <div className="flex items-center w-full gap-1">
              <div className="flex-1 h-px bg-gray-200" />
              <Plane className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          <div className="text-center flex-shrink-0 max-w-[110px] sm:max-w-none">
            <p className="text-gray-900 font-bold text-lg sm:text-xl leading-none">
              {formatTime(flight.arrivalTime)}
            </p>
            <p className="text-gray-600 text-xs font-semibold mt-1">{flight.to}</p>
            <p className="text-gray-400 text-[10px] sm:text-xs truncate">{flight.toName}</p>
          </div>
        </div>

        {/* Fare + classes */}
        <div className="flex items-center justify-between lg:flex-col lg:items-end lg:justify-center gap-2 flex-shrink-0 lg:w-32 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
          <div className="text-left lg:text-right">
            <p className="text-gray-400 text-xs">from</p>
            <p className="text-gray-900 font-bold text-lg leading-tight">
              ₹{getLowestFare(flight.baseFare).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 justify-end max-w-[140px]">
            {availableClasses.map((cls) => (
              <span
                key={cls}
                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize"
              >
                {cls === "premium_economy" ? "Prem.Eco" : cls}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Baggage info */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
        <span>
          Free cabin:{" "}
          <span className="text-gray-700 font-semibold">
            {flight.baggageRules.freeCabinKg}kg
          </span>
        </span>
        <span>
          Extra:{" "}
          <span className="text-gray-700 font-semibold">
            ₹{flight.baggageRules.extraChargePerKg}/kg
          </span>
        </span>
        {flight.baggageRules.maxExtraKg && (
          <span>
            Max:{" "}
            <span className="text-gray-700 font-semibold">
              {flight.baggageRules.maxExtraKg}kg
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

const BookingSegment: React.FC = () => {
  const {
    segment,
    isLoadingSegment,
    segmentError,
    isUpdatingSegment,
    handleRemoveFlight,
    handlePassengerCountChange,
    handleConfirm,
    handleBack,
    formatTime,
    formatDuration,
    getLowestFare,
  } = useBookingSegment();

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (isLoadingSegment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
          <p className="text-gray-500">Loading your booking...</p>
        </div>
      </div>
    );
  }

  // ─── Error ─────────────────────────────────────────────────────────────────
  if (segmentError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <p className="text-red-600 font-medium mb-4">{segmentError}</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  // ─── No segment ────────────────────────────────────────────────────────────
  if (!segment || segment.segments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-md">
          <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-900 text-xl font-semibold">No flights selected</p>
          <p className="text-gray-500 mt-2 mb-6">Go back and select flights to continue</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg bg-[#0a3a8a] text-white text-sm font-bold hover:bg-[#082c6b] transition"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-gray-50 text-gray-900">
      <UserHeader
        onBack={handleBack}
        backLabel="Back to Search"
        steps={[
          { label: " Flights", active: true },
          { label: " Passengers", active: false },
          { label: " Payment", active: false },
        ]}
      />
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10">

        {/* Page title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Confirm your flights</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Review your selected flights and passenger count before continuing.
          </p>
        </div>

        {/* Flight cards */}
        <div className="flex flex-col gap-4 mb-8 min-w-0">
          {segment.segments.map((flight, index) => (
            <FlightSegmentCard
              key={flight.flightId}
              flight={flight}
              index={index}
              onRemove={handleRemoveFlight}
              isUpdating={isUpdatingSegment}
              formatTime={formatTime}
              formatDuration={formatDuration}
              getLowestFare={getLowestFare}
            />
          ))}
        </div>

        {/* Passenger count */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#0a3a8a]" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-900 font-semibold text-sm">Passengers</p>
                <p className="text-gray-400 text-xs">Select how many passengers</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {passengerOptions.map((n) => (
                <button
                  key={n}
                  onClick={() => handlePassengerCountChange(n)}
                  disabled={isUpdatingSegment}
                  className={`w-9 h-9 rounded-full text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    segment.passengerCount === n
                      ? "bg-[#0a3a8a] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary footer */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="text-gray-500">
              {segment.segments.length} flight{segment.segments.length > 1 ? "s" : ""}
            </span>
            <span className="text-gray-500">
              {segment.passengerCount} passenger{segment.passengerCount > 1 ? "s" : ""}
            </span>
            <span className="text-gray-400 text-xs">
              Seat selection on next step
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBack}
            className="flex-1 py-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition"
          >
            Add More Flights
          </button>
          <button
            onClick={handleConfirm}
            disabled={isUpdatingSegment}
            className="flex-1 py-3.5 rounded-lg bg-[#0a3a8a] text-white text-sm font-bold hover:bg-[#082c6b] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUpdatingSegment ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                Continue to Passengers
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSegment;