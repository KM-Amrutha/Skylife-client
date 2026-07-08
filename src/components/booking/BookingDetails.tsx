import React, { useState } from "react";
import { ChevronRight, Users, Utensils, Armchair, CheckCircle, AlertCircle,Clock,Plane } from "lucide-react";
import useBookingDetails from "../../hooks/booking/useBookingDetails";
import SeatSelectionModal from "./SeatSelectionModal";
import FoodSelectionModal from "./FoodSelectionModal";
import { BookingSegmentFlight } from "../../redux/booking/bookingType";
import { PassengerFormData } from "../../redux/booking/bookingType";
import UserHeader from "../user/UserHeader"
import { AmenitiesRow } from "../../utils/amenities";

// ─── Passenger Form ───────────────────────────────────────────────────────────

const PassengerForm: React.FC<{
  index: number;
  passenger:PassengerFormData;
  onChange: (index: number,  filed:keyof PassengerFormData, value: string | number) => void;
}> = ({ index, passenger, onChange }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-[#0a3a8a] text-xs font-bold">{index + 1}</span>
          </div>
          <div className="text-left">
            <p className="text-gray-900 font-semibold text-sm">
              {passenger.name.trim() || `Passenger ${index + 1}`}
            </p>
            {passenger.dob && (
              <p className="text-gray-600 text-xs mt-0.5">{passenger.dob}</p>
            )}
          </div>
        </div>
        <ChevronRight
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Form fields */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              value={passenger.name}
              onChange={(e) => onChange(index, "name", e.target.value)}
              placeholder="As on government ID"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#0a3a8a] text-sm transition"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Date of Birth
            </label>
            <input
              type="date"
              value={passenger.dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => onChange(index, "dob", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#0a3a8a] text-sm transition"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Gender
            </label>
            <div className="flex gap-2">
              {(["male", "female", "other"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => onChange(index, "gender", g)}
                  className={`flex-1 py-3 rounded-xl text-xs font-semibold capitalize transition border ${
                    passenger.gender === g
                      ? "bg-[#0a3a8a] text-white border-[#0a3a8a]"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Mobile Number
            </label>
            <input
              type="tel"
              value={passenger.mobile}
              onChange={(e) => onChange(index, "mobile", e.target.value)}
              placeholder="10-digit mobile number"
              maxLength={10}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#0a3a8a] text-sm transition"
            />
          </div>

          {/* Extra Luggage */}
          <div>
            <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Extra Luggage (kg)
            </label>
            <input
              type="number"
              value={passenger.extraLuggageKg}
              min={0}
              max={40}
              onChange={(e) =>
                onChange(index, "extraLuggageKg", Number(e.target.value))
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#0a3a8a] text-sm transition"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Address
            </label>
            <input
              type="text"
              value={passenger.address}
              onChange={(e) => onChange(index, "address", e.target.value)}
              placeholder="Full residential address"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#0a3a8a] text-sm transition"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Flight Card with Seat + Food buttons ─────────────────────────────────────

const getLayoverDuration = (arrivalTime: string, nextDepartureTime: string): string => {
  const diff = new Date(nextDepartureTime).getTime() - new Date(arrivalTime).getTime();
  const totalMinutes = Math.floor(diff / (1000 * 60));
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h${m > 0 ? ` ${m}m` : ""}`;
};

const FlightActionCard: React.FC<{
  flight: BookingSegmentFlight;
  nextFlight?: BookingSegmentFlight;
  passengerCount: number;
  lockedSeatsCount: number;
  foodItemsCount: number;
  onSeatClick: () => void;
  onFoodClick: () => void;
  formatTime: (iso: string) => string;
  formatDuration: (minutes: number) => string;
  formatDate: (iso: string) => string;
}> = ({
  flight,
  nextFlight,
  passengerCount,
  lockedSeatsCount,
  foodItemsCount,
  onSeatClick,
  onFoodClick,
  formatTime,
  formatDuration,
  formatDate,
}) => {
  const seatsComplete = lockedSeatsCount === passengerCount;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Provider + Aircraft Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
          {flight.providerLogo ? (
            <img
              src={flight.providerLogo}
              alt={flight.providerName}
              className="w-9 h-9 rounded-lg object-cover border border-gray-200 bg-white"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-gray-200 flex items-center justify-center">
              <Plane className="w-4 h-4 text-[#0a3a8a]" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-semibold text-sm">{flight.providerName}</p>
            <p className="text-gray-600 text-xs">
              {flight.flightNumber} · {flight.aircraftName}
              {flight.manufacturer ? ` · ${flight.manufacturer}` : ""}
            </p>
          </div>
          {flight.gate && (
            <div className="flex-shrink-0 text-right">
              <p className="text-gray-600 text-[10px] uppercase tracking-wider">Gate</p>
              <p className="text-gray-900 font-bold text-sm">{flight.gate}</p>
            </div>
          )}
        </div>

        {/* Route */}
        <div className="px-5 py-5">
          <div className="flex items-center gap-3">
            {/* Departure */}
            <div className="text-center min-w-[72px]">
              <p className="text-gray-900 font-bold text-xl font-mono leading-none">
                {formatTime(flight.departureTime)}
              </p>
              <p className="text-[#0a3a8a] font-bold text-sm mt-0.5">{flight.from}</p>
              <p className="text-gray-600 text-[10px] mt-0.5 leading-tight line-clamp-2">
                {flight.fromName}
              </p>
              <p className="text-gray-600 text-[10px] mt-1">
                {formatDate(flight.departureTime)}
              </p>
            </div>

            {/* Duration line */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="text-gray-600 text-[10px]">
                {formatDuration(flight.durationMinutes)}
              </p>
              <div className="w-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0a3a8a] flex-shrink-0" />
                <div className="flex-1 border-t border-dashed border-gray-200" />
                <Plane className="w-3 h-3 text-gray-600 flex-shrink-0" />
                <div className="flex-1 border-t border-dashed border-gray-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
              </div>
              <p className="text-gray-600 text-[10px]">Direct</p>
            </div>

            {/* Arrival */}
            <div className="text-center min-w-[72px]">
              <p className="text-gray-900 font-bold text-xl font-mono leading-none">
                {formatTime(flight.arrivalTime)}
              </p>
              <p className="text-gray-600 font-bold text-sm mt-0.5">{flight.to}</p>
              <p className="text-gray-600 text-[10px] mt-0.5 leading-tight line-clamp-2">
                {flight.toName}
              </p>
              <p className="text-gray-600 text-[10px] mt-1">
                {formatDate(flight.arrivalTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Baggage Rules */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-700">
            <span className="text-emerald-600 font-semibold">
              {flight.baggageRules.freeCabinKg}kg
            </span>
            <span>free cabin baggage</span>
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-700">
            <span>Extra:</span>
            <span className="text-amber-600 font-semibold">
              ₹{flight.baggageRules.extraChargePerKg.toLocaleString("en-IN")}/kg
            </span>
            {flight.baggageRules.maxExtraKg && (
              <span className="text-gray-600">
                · max {flight.baggageRules.maxExtraKg}kg
              </span>
            )}
          </div>
        </div>
        {flight.amenities && flight.amenities.length > 0 && (
  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
    <AmenitiesRow amenities={flight.amenities} />
  </div>
)}

        {/* Seat + Food Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-100">
          {/* Seat button */}
          <button
            onClick={onSeatClick}
            className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl border transition ${
              seatsComplete
                ? "bg-emerald-50 border-emerald-300 hover:border-emerald-400"
                : "bg-gray-50 border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Armchair
                className={`w-4 h-4 ${seatsComplete ? "text-emerald-600" : "text-gray-600"}`}
              />
              <div className="text-left">
                <p
                  className={`text-xs font-semibold ${
                    seatsComplete ? "text-emerald-600" : "text-gray-600"
                  }`}
                >
                  Seats
                </p>
                <p className="text-gray-600 text-[10px]">
                  {lockedSeatsCount}/{passengerCount} selected
                </p>
              </div>
            </div>
            {seatsComplete ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            )}
          </button>

          {/* Food button */}
          <button
            onClick={onFoodClick}
            className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl border transition ${
              foodItemsCount > 0
                ? "bg-blue-50 border-blue-300 hover:border-blue-400"
                : "bg-gray-50 border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Utensils
                className={`w-4 h-4 ${foodItemsCount > 0 ? "text-[#0a3a8a]" : "text-gray-600"}`}
              />
              <div className="text-left">
                <p
                  className={`text-xs font-semibold ${
                    foodItemsCount > 0 ? "text-[#0a3a8a]" : "text-gray-600"
                  }`}
                >
                  Food
                </p>
                <p className="text-gray-600 text-[10px]">
                  {foodItemsCount > 0
                    ? `${foodItemsCount} item${foodItemsCount > 1 ? "s" : ""}`
                    : "Optional"}
                </p>
              </div>
            </div>
            {foodItemsCount > 0 && (
              <CheckCircle className="w-4 h-4 text-[#0a3a8a]" />
            )}
          </button>
        </div>
      </div>

      {/* Layover indicator between flights */}
      {nextFlight && (
        <div className="flex items-center gap-3 py-2 px-4">
          <div className="flex-1 border-t border-dashed border-gray-200" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
            <Clock className="w-3 h-3 text-amber-600" />
            <span className="text-amber-600 text-[11px] font-semibold">
              {getLayoverDuration(flight.arrivalTime, nextFlight.departureTime)} layover in {flight.toName}
            </span>
          </div>
          <div className="flex-1 border-t border-dashed border-gray-200" />
        </div>
      )}
    </>
  );
};


// ─── Main Component ───────────────────────────────────────────────────────────

const BookingDetails: React.FC = () => {
  const {
    segment,
    isSavingDetails,
    goBack,
    handleSubmit,
    formatTime,
    formatDuration,
    // passengers
    passengers,
    updatePassenger,
    // seats
    seatsMap,
    isLoadingSeatsMap,
    lockedSeats,
    isLockingSeat,
    handleSelectSeat,
    getLockedSeatForPassenger,
    isSeatLockedByOther,
    // food
    isLoadingFoods,
    foodSelection,
    getFoodsForFlight,
    getQuantity,
    incrementFood,
    decrementFood,
    getFlightFoodTotal,
    formatDate
  } = useBookingDetails();

  const [seatModalFlightId, setSeatModalFlightId] = useState<string | null>(null);
  const [foodModalFlightId, setFoodModalFlightId] = useState<string | null>(null);

  if (!segment) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center max-w-md">
          <p className="text-gray-900 text-xl font-semibold">Session not found</p>
          <p className="text-gray-700 mt-2 mb-6">
            Your booking session has expired or is invalid.
          </p>
          <button
            onClick={goBack}
            className="px-6 py-2 rounded-lg bg-[#0a3a8a] text-white text-sm font-bold hover:bg-[#082c6b] transition"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  // ─── Derived state ────────────────────────────────────────────────────────
  const allSeatsSelected = segment.segments.every((seg) =>
    passengers.every(
      (p) => getLockedSeatForPassenger(seg.flightId, p.passengerId) !== null
    )
  );

  const getLockedSeatsCountForFlight = (flightId: string) =>
    passengers.filter(
      (p) => getLockedSeatForPassenger(flightId, p.passengerId) !== null
    ).length;

  const getFoodItemsCountForFlight = (flightId: string) =>
    Object.values(foodSelection[flightId] ?? {}).reduce(
      (sum, qty) => sum + qty,
      0
    );

  // ─── Active seat modal flight ─────────────────────────────────────────────
  const seatModalFlight = seatModalFlightId
    ? seatsMap?.flights.find((f) => f.flightId === seatModalFlightId)
    : null;

  // ─── Active food modal flight ─────────────────────────────────────────────
  const foodModalFlight = foodModalFlightId
    ? segment.segments.find((s) => s.flightId === foodModalFlightId)
    : null;

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900">

      {/* Header */}
      <UserHeader
          onBack={goBack}
         backLabel="Back"
          steps={[
               { label: "Flights", active: false },
               { label: "Passengers", active: true },
               { label: "Payment", active: false },
           ]}
          />
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-0 pb-10">

        {/* Page title */}
        <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 shadow-xs max-w-4xl mx-auto">
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <Users className="w-6 h-6 text-[#0a3a8a]" />
    </div>
    <div className="flex-1 min-w-0">
      <h1 className="text-2xl sm:text-3xl font-bold">Passenger Details</h1>
      <p className="text-blue-200 text-sm mt-1">
        Fill in details for all passengers, then select seats and food for each flight.
      </p>
    </div>
  </div>
</div>

        {/* Passenger forms */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-gray-600" />
            <h2 className="text-gray-900 font-semibold text-base">
              Passengers
              <span className="text-gray-600 font-normal text-sm ml-2">
                {segment.passengerCount} traveller{segment.passengerCount > 1 ? "s" : ""}
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {passengers.map((passenger, index) => (
              <PassengerForm
                key={passenger.passengerId}
                index={index}
                passenger={passenger}
                onChange={updatePassenger}
              />
            ))}
          </div>
        </div>

        {/* Flight action cards */}
        <div className="mb-8">
          <h2 className="text-gray-900 font-semibold text-base mb-4">
            Flights
            <span className="text-gray-600 font-normal text-sm ml-2">
              Select seats and food per flight
            </span>
          </h2>

          {isLoadingSeatsMap ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {segment.segments.map((flight, idx) => (
  <FlightActionCard
    key={flight.flightId}
    flight={flight}
    nextFlight={segment.segments[idx + 1]}
    passengerCount={segment.passengerCount}
    lockedSeatsCount={getLockedSeatsCountForFlight(flight.flightId)}
    foodItemsCount={getFoodItemsCountForFlight(flight.flightId)}
    onSeatClick={() => setSeatModalFlightId(flight.flightId)}
    onFoodClick={() => setFoodModalFlightId(flight.flightId)}
    formatTime={formatTime}
    formatDuration={formatDuration}
    formatDate={formatDate}
  />
))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            onClick={goBack}
            className="flex-1 py-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!allSeatsSelected || isSavingDetails}
            className="flex-1 py-3.5 rounded-lg bg-[#0a3a8a] text-white text-sm font-bold hover:bg-[#082c6b] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSavingDetails ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue to Summary
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Seats warning */}
        {!allSeatsSelected && (
          <p className="text-amber-600 text-xs text-center mt-3">
            Please select seats for all passengers on all flights to continue
          </p>
        )}
      </div>

      {/* Seat Selection Modal */}
      {seatModalFlightId && seatModalFlight && (
        <SeatSelectionModal
          flightId={seatModalFlightId}
          flightNumber={seatModalFlight.flightNumber}
          from={seatModalFlight.from}
          to={seatModalFlight.to}
          seatMap={seatModalFlight.seatMap}
          passengers={passengers}
          lockedSeats={lockedSeats}
          isLockingSeat={isLockingSeat}
          onSelectSeat={handleSelectSeat}
          getLockedSeatForPassenger={getLockedSeatForPassenger}
          isSeatLockedByOther={isSeatLockedByOther}
          onClose={() => setSeatModalFlightId(null)}
        />
      )}

      {/* Food Selection Modal */}
      {foodModalFlightId && foodModalFlight && (
        <FoodSelectionModal
          flightId={foodModalFlightId}
          flightNumber={foodModalFlight.flightNumber}
          from={foodModalFlight.from}
          to={foodModalFlight.to}
          aircraftId={foodModalFlight.aircraftId}
          foods={getFoodsForFlight(foodModalFlight.aircraftId)}
          isLoadingFoods={isLoadingFoods}
          getQuantity={getQuantity}
          incrementFood={incrementFood}
          decrementFood={decrementFood}
          getFlightFoodTotal={getFlightFoodTotal}
          onClose={() => setFoodModalFlightId(null)}
        />
      )}
    </div>
  );
};

export default BookingDetails;