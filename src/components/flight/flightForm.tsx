import React, { useEffect, useRef } from "react";
import {  ArrowLeft, Settings, Calendar, DollarSign, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAircraftSchedule } from "../../hooks/provider/useAircraftSchedule";
import useFlights from "../../hooks/provider/useFlight";
import { AMENITY_ICONS, AMENITY_LABELS } from "../../types/amenities";

const FlightForm: React.FC = () => {
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

  const labelClass = "block text-gray-700 text-xs font-bold mb-1.5";

  const inputBaseClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 " +
    "text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] " +
    "transition duration-200 ease-in-out text-sm";

  const inputErrorClass = "border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50/30";

  const hasDepAndTime = !!formik.values.departureDestinationId && 
                        !!formik.values.departureTime && 
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
            <h1 className="text-2xl sm:text-3xl font-bold">Schedule New Flight ✈️</h1>
            <p className="text-blue-200 text-sm mt-1">Configure route, fleet allocation, operational schedule and rules</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          
          {/* ===== 1. BASIC FLIGHT INFO ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Settings className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Basic Flight Information</h2>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="flightId" className={labelClass}>Flight ID *</label>
                  <input
                    type="text"
                    id="flightId"
                    name="flightId"
                    value={formik.values.flightId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., FL-2025-001"
                    className={`${inputBaseClass} ${formik.touched.flightId && formik.errors.flightId ? inputErrorClass : ""}`}
                  />
                  {formik.touched.flightId && formik.errors.flightId && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.flightId}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="flightNumber" className={labelClass}>Flight Number *</label>
                  <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={formik.values.flightNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., AI101"
                    className={`${inputBaseClass} ${formik.touched.flightNumber && formik.errors.flightNumber ? inputErrorClass : ""}`}
                  />
                  {formik.touched.flightNumber && formik.errors.flightNumber && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.flightNumber}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="aircraftId" className={labelClass}>Aircraft *</label>
                <select
                  id="aircraftId"
                  name="aircraftId"
                  value={formik.values.aircraftId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isAvailLoading || !hasDepAndTime}
                  className={`${inputBaseClass} disabled:opacity-60 disabled:cursor-not-allowed ${
                    formik.touched.aircraftId && formik.errors.aircraftId ? inputErrorClass : ""
                  }`}
                  style={{ backgroundColor: '#f9fafb' }}
                >
                  <option value="">
                    {isAvailLoading
                      ? "Loading available aircraft..."
                      : !hasDepAndTime
                      ? "Select departure airport, time & duration first"
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
                
                {/* Departure Airport Search */}
                <div ref={departureRef} className="relative">
                  <label htmlFor="departureSearch" className={labelClass}>Departure Airport *</label>
                  <input
                    type="text"
                    id="departureSearch"
                    placeholder="Search airport (e.g., Delhi, DXB)"
                    value={departureDisplayName}
                    onChange={(e) => handleDepartureSearch(e.target.value)}
                    className={inputBaseClass}
                    autoComplete="off"
                  />
                  {departureSearchResults.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                      {departureSearchResults.map((dest) => (
                        <li
                          key={dest.id}
                          onMouseDown={() => selectDeparture(dest)}
                          className="p-3 cursor-pointer hover:bg-slate-50 transition"
                        >
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

                {/* Arrival Airport Search */}
                <div ref={arrivalRef} className="relative">
                  <label htmlFor="arrivalSearch" className={labelClass}>Arrival Airport *</label>
                  <input
                    type="text"
                    id="arrivalSearch"
                    placeholder="Search airport (e.g., Mumbai, BOM)"
                    value={arrivalDisplayName}
                    onChange={(e) => handleArrivalSearch(e.target.value)}
                    className={inputBaseClass}
                    autoComplete="off"
                  />
                  {arrivalSearchResults.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                      {arrivalSearchResults.map((dest) => (
                        <li
                          key={dest.id}
                          onMouseDown={() => selectArrival(dest)}
                          className="p-3 cursor-pointer hover:bg-slate-50 transition"
                        >
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
                  <label htmlFor="departureTime" className={labelClass}>Departure Time (Local) *</label>
                  <input
                    type="datetime-local"
                    id="departureTime"
                    name="departureTime"
                    value={formik.values.departureTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.departureTime && formik.errors.departureTime ? inputErrorClass : ""}`}
                  />
                  {formik.touched.departureTime && formik.errors.departureTime && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.departureTime}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="durationMinutes" className={labelClass}>Duration (minutes) *</label>
                  <input
                    type="number"
                    id="durationMinutes"
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
                  <label htmlFor="bufferMinutes" className={labelClass}>Buffer Time (minutes) *</label>
                  <input
                    type="number"
                    id="bufferMinutes"
                    name="bufferMinutes"
                    value={formik.values.bufferMinutes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="120"
                    className={`${inputBaseClass} ${
                      formik.touched.bufferMinutes && formik.errors.bufferMinutes ? inputErrorClass : ""
                    }`}
                  />
                  <p className="text-gray-400 text-[11px] font-medium mt-1">Minimum gap between outbound and return flight</p>
                  {formik.touched.bufferMinutes && formik.errors.bufferMinutes && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.bufferMinutes}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="gate" className={labelClass}>Gate (optional)</label>
                  <input
                    type="text"
                    id="gate"
                    name="gate"
                    value={formik.values.gate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., A12"
                    className={inputBaseClass}
                  />
                </div>

              </div>
            </div>
          </div>

          {/* ===== 3. PRICING & RULES ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <DollarSign className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Pricing & Baggage Rules</h2>
            </div>

            <div className="p-5 space-y-6">
              {/* Base Fare */}
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Base Fare (INR)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="baseFareEconomy" className={labelClass}>Economy *</label>
                    <input
                      type="number"
                      id="baseFareEconomy"
                      name="baseFare.economy"
                      value={formik.values.baseFare.economy}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="5000"
                      className={`${inputBaseClass} ${formik.touched.baseFare?.economy && formik.errors.baseFare?.economy ? inputErrorClass : ""}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="baseFarePremium" className={labelClass}>Premium Economy</label>
                    <input
                      type="number"
                      id="baseFarePremium"
                      name="baseFare.premium_economy"
                      value={formik.values.baseFare.premium_economy || ""}
                      onChange={formik.handleChange}
                      placeholder="8000"
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="baseFareBusiness" className={labelClass}>Business</label>
                    <input
                      type="number"
                      id="baseFareBusiness"
                      name="baseFare.business"
                      value={formik.values.baseFare.business || ""}
                      onChange={formik.handleChange}
                      placeholder="15000"
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="baseFareFirst" className={labelClass}>First Class</label>
                    <input
                      type="number"
                      id="baseFareFirst"
                      name="baseFare.first"
                      value={formik.values.baseFare.first || ""}
                      onChange={formik.handleChange}
                      placeholder="30000"
                      className={inputBaseClass}
                    />
                  </div>
                </div>
                {formik.touched.baseFare?.economy && formik.errors.baseFare?.economy && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.baseFare.economy}</p>
                )}
              </div>

              {/* Seat Surcharge */}
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Seat Surcharge (INR, optional)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="surchargeWindow" className={labelClass}>Window Seat</label>
                    <input
                      type="number"
                      id="surchargeWindow"
                      name="seatSurcharge.window"
                      value={formik.values.seatSurcharge.window || ""}
                      onChange={formik.handleChange}
                      placeholder="500"
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="surchargeAisle" className={labelClass}>Aisle Seat</label>
                    <input
                      type="number"
                      id="surchargeAisle"
                      name="seatSurcharge.aisle"
                      value={formik.values.seatSurcharge.aisle || ""}
                      onChange={formik.handleChange}
                      placeholder="500"
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="surchargeLegroom" className={labelClass}>Extra Legroom</label>
                    <input
                      type="number"
                      id="surchargeLegroom"
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
                <h4 className="text-gray-900 font-bold text-sm mb-3">Baggage Rules</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="freeCabinKg" className={labelClass}>Free Cabin Bag (kg)</label>
                    <input
                      type="number"
                      id="freeCabinKg"
                      name="baggageRules.freeCabinKg"
                      value={formik.values.baggageRules.freeCabinKg}
                      onChange={formik.handleChange}
                      placeholder="7"
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="extraChargePerKg" className={labelClass}>Extra Charge per Kg (INR) *</label>
                    <input
                      type="number"
                      id="extraChargePerKg"
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
                      <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.baggageRules.extraChargePerKg}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="maxExtraKg" className={labelClass}>Max Extra Kg Allowed</label>
                    <input
                      type="number"
                      id="maxExtraKg"
                      name="baggageRules.maxExtraKg"
                      value={formik.values.baggageRules.maxExtraKg || ""}
                      onChange={formik.handleChange}
                      placeholder="23"
                      className={inputBaseClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 4. AMENITIES ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Heart className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Flight Amenities (optional)</h2>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(AMENITY_LABELS).map(([key, label]) => {
                  const selected = (formik.values.amenities ?? []).includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        const current = formik.values.amenities ?? [];
                        formik.setFieldValue(
                          "amenities",
                          selected ? current.filter((a) => a !== key) : [...current, key]
                        );
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                        selected
                          ? "bg-amber-50 text-amber-700 border-amber-200 shadow-xs"
                          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-sm leading-none">{AMENITY_ICONS[key] || "✨"}</span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting || isAvailLoading}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {formik.isSubmitting ? "Scheduling Flight..." : "Schedule Flight"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FlightForm;