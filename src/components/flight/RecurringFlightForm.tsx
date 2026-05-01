import React, { useEffect, useRef } from "react";
import useRecurringFlight from "../../hooks/provider/useRecurringFlight";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const RecurringFlightForm: React.FC = () => {
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
    toggleWeekday,
    previewDates,
    availableAircrafts,
    isLoadingAircrafts,
    fetchAvailableAircrafts,
    isCreatingRecurring,
  } = useRecurringFlight();

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
  const inputErrorClass =
    "border-red-500 focus:ring-red-500 focus:border-red-500 ring-2 ring-red-200/50";

  const hasRequiredForAircraft =
    !!formik.values.departureDestinationId &&
    !!formik.values.departureTimeOfDay &&
    !!formik.values.startDate &&
    !!formik.values.durationMinutes &&
    !!formik.values.bufferMinutes;

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h2 className="text-white text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Schedule Recurring Flights 🔁
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-10" noValidate>

        {/* ===== 1. BASIC INFO ===== */}
        <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-4">
            <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold">1</span>
            Basic Flight Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/90 font-medium mb-2">Base Flight ID *</label>
              <input
                type="text"
                name="baseFlightId"
                value={formik.values.baseFlightId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., FL-2025-001"
                className={`${inputBaseClass} ${formik.touched.baseFlightId && formik.errors.baseFlightId ? inputErrorClass : ""}`}
              />
              <p className="text-white/50 text-xs mt-1">Occurrences will be FL-2025-001-1, FL-2025-001-2...</p>
              {formik.touched.baseFlightId && formik.errors.baseFlightId && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.baseFlightId}</p>
              )}
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">Base Flight Number *</label>
              <input
                type="text"
                name="baseFlightNumber"
                value={formik.values.baseFlightNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., AI101"
                className={`${inputBaseClass} ${formik.touched.baseFlightNumber && formik.errors.baseFlightNumber ? inputErrorClass : ""}`}
              />
              <p className="text-white/50 text-xs mt-1">Occurrences will be AI101-1, AI101-2...</p>
              {formik.touched.baseFlightNumber && formik.errors.baseFlightNumber && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.baseFlightNumber}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/90 font-medium mb-2">Aircraft *</label>
              <div className="flex gap-3">
               <select
  name="aircraftId"
  value={formik.values.aircraftId}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  disabled={isLoadingAircrafts || !hasRequiredForAircraft}
  className={`${inputBaseClass} disabled:opacity-60 disabled:cursor-not-allowed ${
    formik.touched.aircraftId && formik.errors.aircraftId ? inputErrorClass : ""
  }`}
  style={{ color: 'white', backgroundColor: '#00001F' }}
>
  <option value="" style={{ backgroundColor: '#0a1628', color: 'white' }}>
    {isLoadingAircrafts
      ? "Loading available aircraft..."
      : !hasRequiredForAircraft
      ? "Fill route, date, duration & buffer first"
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
                <button
                  type="button"
                  onClick={fetchAvailableAircrafts}
                  disabled={!hasRequiredForAircraft || isLoadingAircrafts}
                  className="px-4 py-3 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoadingAircrafts ? "Checking..." : "Check Availability"}
                </button>
              </div>
              {formik.touched.aircraftId && formik.errors.aircraftId && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.aircraftId}</p>
              )}
            </div>
          </div>
        </section>

        {/* ===== 2. ROUTE ===== */}
        <section className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-4">
            <span className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-lg font-bold">2</span>
            Route & Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Departure */}
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

            {/* Arrival */}
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

            {/* Departure Time of Day */}
            <div>
              <label className="block text-white/90 font-medium mb-2">Departure Time (Daily) *</label>
              <input
                type="time"
                name="departureTimeOfDay"
                value={formik.values.departureTimeOfDay}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputBaseClass} ${formik.touched.departureTimeOfDay && formik.errors.departureTimeOfDay ? inputErrorClass : ""}`}
              />
              <p className="text-white/50 text-xs mt-1">Same time will apply for every occurrence</p>
              {formik.touched.departureTimeOfDay && formik.errors.departureTimeOfDay && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.departureTimeOfDay}</p>
              )}
            </div>

            {/* Duration */}
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

            {/* Buffer */}
            <div>
              <label className="block text-white/90 font-medium mb-2">Buffer Time (minutes) *</label>
              <input
                type="number"
                name="bufferMinutes"
                value={formik.values.bufferMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="120"
                className={`${inputBaseClass} ${formik.touched.bufferMinutes && formik.errors.bufferMinutes ? inputErrorClass : ""}`}
              />
              <p className="text-white/50 text-xs mt-1">Minimum gap between outbound and return flight</p>
              {formik.touched.bufferMinutes && formik.errors.bufferMinutes && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.bufferMinutes}</p>
              )}
            </div>

            {/* Gate */}
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

            {/* Start Date */}
            <div>
              <label className="block text-white/90 font-medium mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputBaseClass} ${formik.touched.startDate && formik.errors.startDate ? inputErrorClass : ""}`}
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.startDate}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-white/90 font-medium mb-2">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputBaseClass} ${formik.touched.endDate && formik.errors.endDate ? inputErrorClass : ""}`}
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Weekday Picker */}
          <div className="mt-8">
            <label className="block text-white/90 font-medium mb-4">Repeat on Weekdays *</label>
            <div className="flex gap-3 flex-wrap">
              {WEEKDAY_LABELS.map((label, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleWeekday(index)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    formik.values.weekdays.includes(index)
                      ? "bg-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {formik.touched.weekdays && formik.errors.weekdays && (
              <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.weekdays as string}</p>
            )}
          </div>

          {/* rrule Date Preview */}
          {previewDates.length > 0 && (
            <div className="mt-8 p-5 rounded-xl bg-purple-500/10 border border-purple-400/30">
              <p className="text-purple-300 font-semibold mb-3">
                📅 {previewDates.length} flights will be created on:
              </p>
              <div className="flex flex-wrap gap-2">
                {previewDates.map((date, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-200 text-xs font-medium border border-purple-400/20"
                  >
                    {date.toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ===== 3. PRICING ===== */}
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
                {formik.touched.baseFare?.economy && formik.errors.baseFare?.economy && (
                  <p className="text-red-400 text-xs mt-2">⚠ {formik.errors.baseFare.economy}</p>
                )}
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

        {/* ===== SUBMIT ===== */}
        <div className="flex justify-center mt-12">
          <button
            type="submit"
            disabled={formik.isSubmitting || isCreatingRecurring}
            className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {formik.isSubmitting || isCreatingRecurring
              ? "Scheduling Recurring Flights..."
              : "Schedule Recurring Flights"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecurringFlightForm;