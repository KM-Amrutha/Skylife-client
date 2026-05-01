import React, { useEffect, useRef } from "react";
import { useAircraftSchedule } from "../../hooks/provider/useAircraftSchedule";
import useFlights from "../../hooks/provider/useFlight";

const FlightForm: React.FC = () => {
  const {
    formik,
    departureSearchResults,
    arrivalSearchResults,
    departureDisplayName,
    arrivalDisplayName,
    handleDepartureSearch,
    handleArrivalSearch,
    selectDeparture,
    selectArrival,
    clearDepartureResults,
    clearArrivalResults,
  } = useFlights();

  const { availableAircrafts, isLoading: isAvailLoading } = useAircraftSchedule(formik);

  const departureRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departureRef.current && !departureRef.current.contains(event.target as Node)) {
        clearDepartureResults();
      }
      if (arrivalRef.current && !arrivalRef.current.contains(event.target as Node)) {
        clearArrivalResults();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearDepartureResults, clearArrivalResults]);

  const inputBaseClass =
    "w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-sm font-medium";
  const inputErrorClass = "border-red-500 focus:ring-red-500 focus:border-red-500 ring-2 ring-red-200/50";

  
  const hasDepAndTime = !!formik.values.departureDestinationId && 
                      !!formik.values.departureTime && 
                      !!formik.values.durationMinutes &&
                      !!formik.values.bufferMinutes;

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h2 className="text-white text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Schedule New Flight ✈️
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-10" noValidate>
        {/* ===== 1. BASIC FLIGHT INFO ===== */}
        <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-4">
            <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold">1</span>
            Basic Flight Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/90 font-medium mb-2">Flight ID *</label>
              <input
                type="text"
                name="flightId"
                value={formik.values.flightId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., FL-2025-001"
                className={`${inputBaseClass} ${formik.touched.flightId && formik.errors.flightId ? inputErrorClass : ""}`}
              />
              {formik.touched.flightId && formik.errors.flightId && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.flightId}</p>
              )}
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">Flight Number *</label>
              <input
                type="text"
                name="flightNumber"
                value={formik.values.flightNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., AI101"
                className={`${inputBaseClass} ${formik.touched.flightNumber && formik.errors.flightNumber ? inputErrorClass : ""}`}
              />
              {formik.touched.flightNumber && formik.errors.flightNumber && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.flightNumber}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/90 font-medium mb-2">Aircraft *</label>
           <select
  name="aircraftId"
  value={formik.values.aircraftId}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  disabled={isAvailLoading || !hasDepAndTime}
  className={`${inputBaseClass} disabled:opacity-60 disabled:cursor-not-allowed ${
    formik.touched.aircraftId && formik.errors.aircraftId ? inputErrorClass : ""
  }`}
  style={{ color: 'white', backgroundColor: '#00001F' }}
>
  <option value="" style={{ backgroundColor: '#0a1628', color: 'white' }}>
    {isAvailLoading
      ? "Loading available aircraft..."
      : !hasDepAndTime
      ? "Select departure airport, time & duration first"
      : availableAircrafts.length === 0
      ? "No aircraft available"
      : "Select aircraft"}
  </option>

  {availableAircrafts.map((aircraft) => (
    <option
      key={aircraft._id}
      value={aircraft._id}
      style={{ backgroundColor: '#0a1628', color: 'white' }}
    >
      {aircraft.aircraftName} ({aircraft.aircraftType})
    </option>
  ))}
</select>
              {formik.touched.aircraftId && formik.errors.aircraftId && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.aircraftId}</p>
              )}
            </div>
          </div>
        </section>

        {/* ===== 2. ROUTE & SCHEDULE ===== */}
        <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-4">
            <span className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-lg font-bold">2</span>
            Route & Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div ref={departureRef} className="relative">
              <label className="block text-white/90 font-medium mb-2">Departure Airport *</label>
              <input
                type="text"
                placeholder="Search airport (e.g., Delhi, DXB)"
                value={departureDisplayName}
                onChange={(e) => handleDepartureSearch(e.target.value)}
                className={inputBaseClass}
                autoComplete="off"
              />
              {departureSearchResults.length > 0 && (
                <ul className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl max-h-60 overflow-y-auto border border-white/30">
                  {departureSearchResults.map((dest) => (
                    <li
                      key={dest._id}
                      onMouseDown={() => selectDeparture(dest)}
                      className="px-4 py-3 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <div className="font-semibold">{dest.name}</div>
                      <div className="text-sm opacity-80">{dest.iataCode || dest.ident} • {dest.municipality}</div>
                    </li>
                  ))}
                </ul>
              )}
              {formik.touched.departureDestinationId && formik.errors.departureDestinationId && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.departureDestinationId}</p>
              )}
            </div>

            <div ref={arrivalRef} className="relative">
              <label className="block text-white/90 font-medium mb-2">Arrival Airport *</label>
              <input
                type="text"
                placeholder="Search airport (e.g., Mumbai, BOM)"
                value={arrivalDisplayName}
                onChange={(e) => handleArrivalSearch(e.target.value)}
                className={inputBaseClass}
                autoComplete="off"
              />
              {arrivalSearchResults.length > 0 && (
                <ul className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl max-h-60 overflow-y-auto border border-white/30">
                  {arrivalSearchResults.map((dest) => (
                    <li
                      key={dest._id}
                      onMouseDown={() => selectArrival(dest)}
                      className="px-4 py-3 cursor-pointer hover:bg-purple-500 hover:text-white transition-colors"
                    >
                      <div className="font-semibold">{dest.name}</div>
                      <div className="text-sm opacity-80">{dest.iataCode || dest.ident} • {dest.municipality}</div>
                    </li>
                  ))}
                </ul>
              )}
              {formik.touched.arrivalDestinationId && formik.errors.arrivalDestinationId && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.arrivalDestinationId}</p>
              )}
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">Departure Time (Local) *</label>
              <input
                type="datetime-local"
                name="departureTime"
                value={formik.values.departureTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputBaseClass} ${formik.touched.departureTime && formik.errors.departureTime ? inputErrorClass : ""}`}
              />
              {formik.touched.departureTime && formik.errors.departureTime && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.departureTime}</p>
              )}
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">Duration (minutes) *</label>
              <input
                type="number"
                name="durationMinutes"
                value={formik.values.durationMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="120"
                className={`${inputBaseClass} ${formik.touched.durationMinutes && formik.errors.durationMinutes ? inputErrorClass : ""}`}
              />
              {formik.touched.durationMinutes && formik.errors.durationMinutes && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.durationMinutes}</p>
              )}
            </div>
            <div>
  <label className="block text-white/90 font-medium mb-2">Buffer Time (minutes) *</label>
  <input
    type="number"
    name="bufferMinutes"
    value={formik.values.bufferMinutes}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="120"
    className={`${inputBaseClass} ${
      formik.touched.bufferMinutes && formik.errors.bufferMinutes ? inputErrorClass : ""
    }`}
  />
  <p className="text-white/50 text-xs mt-1">Minimum gap between outbound and return flight</p>
  {formik.touched.bufferMinutes && formik.errors.bufferMinutes && (
    <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.bufferMinutes}</p>
  )}
</div>

            <div>
              <label className="block text-white/90 font-medium mb-2">Gate (optional)</label>
              <input
                type="text"
                name="gate"
                value={formik.values.gate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., A12"
                className={inputBaseClass}
              />
            </div>
          </div>
        </section>

        {/* ===== 3. PRICING & RULES ===== */}
        <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-4">
            <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-lg font-bold">3</span>
            Pricing & Baggage Rules
          </h3>

          {/* Base Fare */}
          <div className="mb-10">
            <h4 className="text-xl font-medium text-white mb-6">Base Fare (INR)</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Economy *</label>
                <input
                  type="number"
                  name="baseFare.economy"
                  value={formik.values.baseFare.economy}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="5000"
                  className={`${inputBaseClass} ${formik.touched.baseFare?.economy && formik.errors.baseFare?.economy ? inputErrorClass : ""}`}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Premium Economy</label>
                <input
                  type="number"
                  name="baseFare.premium_economy"
                  value={formik.values.baseFare.premium_economy || ""}
                  onChange={formik.handleChange}
                  placeholder="8000"
                  className={inputBaseClass}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Business</label>
                <input
                  type="number"
                  name="baseFare.business"
                  value={formik.values.baseFare.business || ""}
                  onChange={formik.handleChange}
                  placeholder="15000"
                  className={inputBaseClass}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">First Class</label>
                <input
                  type="number"
                  name="baseFare.first"
                  value={formik.values.baseFare.first || ""}
                  onChange={formik.handleChange}
                  placeholder="30000"
                  className={inputBaseClass}
                />
              </div>
            </div>
            {formik.touched.baseFare?.economy && formik.errors.baseFare?.economy && (
              <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.baseFare.economy}</p>
            )}
          </div>

          {/* Seat Surcharge */}
          <div className="mb-10">
            <h4 className="text-xl font-medium text-white mb-6">Seat Surcharge (INR, optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Window Seat</label>
                <input
                  type="number"
                  name="seatSurcharge.window"
                  value={formik.values.seatSurcharge.window || ""}
                  onChange={formik.handleChange}
                  placeholder="500"
                  className={inputBaseClass}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Aisle Seat</label>
                <input
                  type="number"
                  name="seatSurcharge.aisle"
                  value={formik.values.seatSurcharge.aisle || ""}
                  onChange={formik.handleChange}
                  placeholder="500"
                  className={inputBaseClass}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Extra Legroom</label>
                <input
                  type="number"
                  name="seatSurcharge.extraLegroom"
                  value={formik.values.seatSurcharge.extraLegroom || ""}
                  onChange={formik.handleChange}
                  placeholder="2000"
                  className={inputBaseClass}
                />
              </div>
            </div>
          </div>

          {/* Baggage Rules */}
          <div>
            <h4 className="text-xl font-medium text-white mb-6">Baggage Rules</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Free Cabin Bag (kg)</label>
                <input
                  type="number"
                  name="baggageRules.freeCabinKg"
                  value={formik.values.baggageRules.freeCabinKg}
                  onChange={formik.handleChange}
                  placeholder="7"
                  className={inputBaseClass}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Extra Charge per Kg (INR) *</label>
                <input
                  type="number"
                  name="baggageRules.extraChargePerKg"
                  value={formik.values.baggageRules.extraChargePerKg}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="500"
                  className={`${inputBaseClass} ${
                    formik.touched.baggageRules?.extraChargePerKg && formik.errors.baggageRules?.extraChargePerKg ? inputErrorClass : ""
                  }`}
                />
                {formik.touched.baggageRules?.extraChargePerKg && formik.errors.baggageRules?.extraChargePerKg && (
                  <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.baggageRules.extraChargePerKg}</p>
                )}
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Max Extra Kg Allowed</label>
                <input
                  type="number"
                  name="baggageRules.maxExtraKg"
                  value={formik.values.baggageRules.maxExtraKg || ""}
                  onChange={formik.handleChange}
                  placeholder="23"
                  className={inputBaseClass}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== SUBMIT BUTTON ===== */}
        <div className="flex justify-center mt-12">
          <button
            type="submit"
            disabled={formik.isSubmitting || isAvailLoading}
            className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {formik.isSubmitting ? "Scheduling Flight..." : "Schedule Flight"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightForm;