import React, { useEffect, useRef } from "react";
import useRecurringFlight from "../../hooks/provider/useRecurringFlight";
import { ArrowLeft,Settings, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const RecurringFlightForm: React.FC = () => {
   const navigate = useNavigate();
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

  const labelClass = "block text-gray-700 text-xs font-bold mb-1.5";

  const inputBaseClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 " +
    "text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] " +
    "transition duration-200 ease-in-out text-sm";

  const inputErrorClass = "border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50/30";

  const hasRequiredForAircraft =
    !!formik.values.departureDestinationId &&
    !!formik.values.departureTimeOfDay &&
    !!formik.values.startDate &&
    !!formik.values.durationMinutes &&
    !!formik.values.bufferMinutes;

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
      {/* Top Header Card */}
<div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
  <div className="max-w-3xl mx-auto flex items-center gap-5">
    <button
      type="button"
      onClick={() => navigate("/provider/flights")}
      className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-blue-50 transition"
    >
      <ArrowLeft className="w-5 h-5 text-[#0a3a8a]" />
    </button>
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">Schedule Recurring Flights ✈️</h1>
      <p className="text-blue-200 text-sm mt-1">
        Configure route, fleet allocation, operational schedule and rules
      </p>
    </div>
  </div>
</div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>

          {/* ===== 1. BASIC INFO ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Settings className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Basic Flight Information</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Base Flight ID *</label>
                  <input
                    type="text"
                    name="baseFlightId"
                    value={formik.values.baseFlightId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., FL-2025-001"
                    className={`${inputBaseClass} ${formik.touched.baseFlightId && formik.errors.baseFlightId ? inputErrorClass : ""}`}
                  />
                  <p className="text-gray-400 text-[11px] font-medium mt-1">Occurrences will be FL-2025-001-1, FL-2025-001-2...</p>
                  {formik.touched.baseFlightId && formik.errors.baseFlightId && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.baseFlightId}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Base Flight Number *</label>
                  <input
                    type="text"
                    name="baseFlightNumber"
                    value={formik.values.baseFlightNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., AI101"
                    className={`${inputBaseClass} ${formik.touched.baseFlightNumber && formik.errors.baseFlightNumber ? inputErrorClass : ""}`}
                  />
                  <p className="text-gray-400 text-[11px] font-medium mt-1">Occurrences will be AI101-1, AI101-2...</p>
                  {formik.touched.baseFlightNumber && formik.errors.baseFlightNumber && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.baseFlightNumber}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Aircraft *</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    name="aircraftId"
                    value={formik.values.aircraftId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoadingAircrafts || !hasRequiredForAircraft}
                    className={`${inputBaseClass} disabled:opacity-60 disabled:cursor-not-allowed ${formik.touched.aircraftId && formik.errors.aircraftId ? inputErrorClass : ""}`}
                    style={{ backgroundColor: '#f9fafb' }}
                  >
                    <option value="">
                      {isLoadingAircrafts
                        ? "Loading available aircraft..."
                        : !hasRequiredForAircraft
                        ? "Fill route, date, duration & buffer first"
                        : availableAircrafts.length === 0
                        ? "No aircraft available"
                        : "Select aircraft"}
                    </option>
                    {availableAircrafts.map((aircraft) => (
                      <option key={aircraft.id} value={aircraft.id}>
                        {aircraft.aircraftName} ({aircraft.aircraftType})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={fetchAvailableAircrafts}
                    disabled={!hasRequiredForAircraft || isLoadingAircrafts}
                    className="px-4 py-2.5 rounded-xl bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 transition text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
                  >
                    {isLoadingAircrafts ? "Checking..." : "Check Availability"}
                  </button>
                </div>
                {formik.touched.aircraftId && formik.errors.aircraftId && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.aircraftId}</p>
                )}
              </div>
            </div>
          </div>

          {/* ===== 2. ROUTE & SCHEDULE ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Calendar className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Route & Schedule</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div ref={departureRef} className="relative">
                  <label className={labelClass}>Departure Airport *</label>
                  <input
                    type="text"
                    placeholder="Search airport (e.g., Delhi, DXB)"
                    value={departureDisplayName}
                    onChange={(e) => handleDepartureSearch(e.target.value)}
                    className={inputBaseClass}
                    autoComplete="off"
                  />
                  {departureSearchResults.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                      {departureSearchResults.map((dest) => (
                        <li key={dest.id} onMouseDown={() => selectDeparture(dest)} className="p-3 cursor-pointer hover:bg-slate-50 transition">
                          <div className="font-semibold text-sm text-gray-900">{dest.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{dest.iataCode || dest.ident} • {dest.municipality}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {formik.touched.departureDestinationId && formik.errors.departureDestinationId && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.departureDestinationId}</p>
                  )}
                </div>

                <div ref={arrivalRef} className="relative">
                  <label className={labelClass}>Arrival Airport *</label>
                  <input
                    type="text"
                    placeholder="Search airport (e.g., Mumbai, BOM)"
                    value={arrivalDisplayName}
                    onChange={(e) => handleArrivalSearch(e.target.value)}
                    className={inputBaseClass}
                    autoComplete="off"
                  />
                  {arrivalSearchResults.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                      {arrivalSearchResults.map((dest) => (
                        <li key={dest.id} onMouseDown={() => selectArrival(dest)} className="p-3 cursor-pointer hover:bg-slate-50 transition">
                          <div className="font-semibold text-sm text-gray-900">{dest.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{dest.iataCode || dest.ident} • {dest.municipality}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {formik.touched.arrivalDestinationId && formik.errors.arrivalDestinationId && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.arrivalDestinationId}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Departure Time (Daily) *</label>
                  <input
                    type="time"
                    name="departureTimeOfDay"
                    value={formik.values.departureTimeOfDay}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.departureTimeOfDay && formik.errors.departureTimeOfDay ? inputErrorClass : ""}`}
                  />
                  <p className="text-gray-400 text-[11px] font-medium mt-1">Same time will apply for every occurrence</p>
                  {formik.touched.departureTimeOfDay && formik.errors.departureTimeOfDay && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.departureTimeOfDay}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Duration (minutes) *</label>
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
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.durationMinutes}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Buffer Time (minutes) *</label>
                  <input
                    type="number"
                    name="bufferMinutes"
                    value={formik.values.bufferMinutes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="120"
                    className={`${inputBaseClass} ${formik.touched.bufferMinutes && formik.errors.bufferMinutes ? inputErrorClass : ""}`}
                  />
                  <p className="text-gray-400 text-[11px] font-medium mt-1">Minimum gap between outbound and return flight</p>
                  {formik.touched.bufferMinutes && formik.errors.bufferMinutes && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.bufferMinutes}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Gate (optional)</label>
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

                <div>
                  <label className={labelClass}>Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.startDate && formik.errors.startDate ? inputErrorClass : ""}`}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.endDate && formik.errors.endDate ? inputErrorClass : ""}`}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.endDate}</p>
                  )}
                </div>
              </div>

              {/* Weekday Picker */}
              <div>
                <label className={labelClass}>Repeat on Weekdays *</label>
                <div className="flex gap-2 flex-wrap">
                  {WEEKDAY_LABELS.map((label, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => toggleWeekday(index)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                        formik.values.weekdays.includes(index)
                          ? "bg-[#0a3a8a] border-[#0a3a8a] text-white shadow-sm"
                          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {formik.touched.weekdays && formik.errors.weekdays && (
                  <p className="text-red-500 text-xs mt-2">⚠ {formik.errors.weekdays as string}</p>
                )}
              </div>

              {/* Preview Dates */}
              {previewDates.length > 0 && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-[#0a3a8a] font-bold text-xs uppercase tracking-wider mb-3">
                    📅 {previewDates.length} flights will be created on:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {previewDates.map((date, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-white text-[#0a3a8a] text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                        {date.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" })}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== 3. PRICING & BAGGAGE ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <DollarSign className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Pricing & Baggage Rules</h2>
            </div>
            <div className="p-5 space-y-6">

              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Base Fare (INR)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Economy *</label>
                    <input type="number" name="baseFare.economy" value={formik.values.baseFare.economy}
                      onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="5000"
                      className={`${inputBaseClass} ${formik.touched.baseFare?.economy && formik.errors.baseFare?.economy ? inputErrorClass : ""}`} />
                    {formik.touched.baseFare?.economy && formik.errors.baseFare?.economy && (
                      <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.baseFare.economy}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Premium Economy</label>
                    <input type="number" name="baseFare.premium_economy" value={formik.values.baseFare.premium_economy || ""}
                      onChange={formik.handleChange} placeholder="8000" className={inputBaseClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Business</label>
                    <input type="number" name="baseFare.business" value={formik.values.baseFare.business || ""}
                      onChange={formik.handleChange} placeholder="15000" className={inputBaseClass} />
                  </div>
                  <div>
                    <label className={labelClass}>First Class</label>
                    <input type="number" name="baseFare.first" value={formik.values.baseFare.first || ""}
                      onChange={formik.handleChange} placeholder="30000" className={inputBaseClass} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Seat Surcharge (INR, optional)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Window Seat</label>
                    <input type="number" name="seatSurcharge.window" value={formik.values.seatSurcharge.window || ""}
                      onChange={formik.handleChange} placeholder="500" className={inputBaseClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Aisle Seat</label>
                    <input type="number" name="seatSurcharge.aisle" value={formik.values.seatSurcharge.aisle || ""}
                      onChange={formik.handleChange} placeholder="500" className={inputBaseClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Extra Legroom</label>
                    <input type="number" name="seatSurcharge.extraLegroom" value={formik.values.seatSurcharge.extraLegroom || ""}
                      onChange={formik.handleChange} placeholder="2000" className={inputBaseClass} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Baggage Rules</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Free Cabin Bag (kg)</label>
                    <input type="number" name="baggageRules.freeCabinKg" value={formik.values.baggageRules.freeCabinKg}
                      onChange={formik.handleChange} placeholder="7" className={inputBaseClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Extra Charge per Kg (INR) *</label>
                    <input type="number" name="baggageRules.extraChargePerKg" value={formik.values.baggageRules.extraChargePerKg}
                      onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="500"
                      className={`${inputBaseClass} ${formik.touched.baggageRules?.extraChargePerKg && formik.errors.baggageRules?.extraChargePerKg ? inputErrorClass : ""}`} />
                    {formik.touched.baggageRules?.extraChargePerKg && formik.errors.baggageRules?.extraChargePerKg && (
                      <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.baggageRules.extraChargePerKg}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Max Extra Kg Allowed</label>
                    <input type="number" name="baggageRules.maxExtraKg" value={formik.values.baggageRules.maxExtraKg || ""}
                      onChange={formik.handleChange} placeholder="23" className={inputBaseClass} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SUBMIT ===== */}

 <div className="flex justify-center mt-4">
  <button
    type="submit"
    disabled={formik.isSubmitting || isCreatingRecurring}
     className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
  >
    {formik.isSubmitting || isCreatingRecurring ? "Scheduling Recurring Flights..." : "Schedule Recurring Flights"}
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default RecurringFlightForm;