import React from "react";
import { Plane, MapPin, Clock, DollarSign, Luggage, Armchair, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEditFlight from "../../hooks/provider/useEditFlight";
import { Destination } from "../../redux/destination/destinationType";

const EditFlightForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    flight,
    isLoading,
    error,
    formik,
    arrivalDisplayName,
    arrivalSearchResults,
    handleArrivalSearch,
    selectArrival,
    clearArrivalResults,
    isRecurringOrReturn,
    isReturn,
  } = useEditFlight();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0a3a8a]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-2xl text-center mx-4 mt-6">
        <p className="text-lg font-bold">Error loading flight</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-700 px-8 py-6 rounded-2xl text-center mx-4 mt-6">
        <p className="text-lg font-bold">Flight not found</p>
        <p className="text-sm mt-1">The flight you're trying to edit doesn't exist or has been removed.</p>
      </div>
    );
  }

  const isRejected = flight.adminApproval.status === "rejected";

  const labelClass = "block text-gray-700 text-xs font-bold mb-1.5";
  const inputBaseClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 " +
    "text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] " +
    "transition duration-200 ease-in-out text-sm";
  const staticBlockClass = "px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm flex items-center gap-2.5 min-h-[42px]";

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
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isRejected ? "Reschedule Rejected Flight ✈️" : "Edit Flight Schedule ✈️"}
            </h1>
            <p className="text-blue-200 text-sm mt-1">
              {isRejected
                ? "Update your flight details and resubmit for approval"
                : "Modify flight details — changes will require admin re-approval"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        
        {/* Previous Rejection Reason Callout */}
        {isRejected && flight.adminApproval.reason && (
          <div className="bg-red-50 border border-red-200 p-5 rounded-2xl mb-6">
            <div className="flex items-center gap-2 mb-2 text-red-800">
              <Plane className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-sm">Previous Rejection Reason</h3>
            </div>
            <p className="text-red-700 italic text-sm leading-relaxed">
              "{flight.adminApproval.reason}"
            </p>
          </div>
        )}

        {/* Locked Flight Constraints Indicator */}
        {(flight.flightType === "recurring" || flight.flightType === "return") && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold text-center uppercase tracking-wider">
            {flight.flightType === "recurring" 
              ? "🔁 Recurring Flight — duration and arrival airport are locked" 
              : "↩️ Return Flight — duration and arrival airport are locked"}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          
          {/* ===== 1. FLIGHT INFORMATION ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Plane className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Flight Information</h2>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="flightNumber" className={labelClass}>Flight Number *</label>
                  <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={formik.values.flightNumber || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., AI101"
                    className={`${inputBaseClass} ${formik.touched.flightNumber && formik.errors.flightNumber ? "border-red-400 bg-red-50/30" : ""}`}
                  />
                  {formik.touched.flightNumber && formik.errors.flightNumber && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.flightNumber}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Aircraft</label>
                  <div className={staticBlockClass}>
                    {flight.aircraftName}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Departure Airport</label>
                  <div className={staticBlockClass}>
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{flight.departureDestination?.name || flight.departureDestinationId}</span>
                  </div>
                  <p className="text-gray-400 text-[11px] font-medium mt-1">Departure airport cannot be changed</p>
                </div>

                {!isRecurringOrReturn ? (
                  <div>
                    <label className={labelClass}>Arrival Airport *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={arrivalDisplayName}
                        onChange={(e) => handleArrivalSearch(e.target.value)}
                        className={inputBaseClass}
                        placeholder="Search arrival airport..."
                      />
                      {arrivalSearchResults.length > 0 && (
                        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                          {arrivalSearchResults.map((dest: Destination) => (
                            <li
                              key={dest.id}
                              onMouseDown={() => { selectArrival(dest); clearArrivalResults(); }}
                              className="p-3 cursor-pointer hover:bg-slate-50 transition text-sm font-semibold text-gray-900"
                            >
                              {dest.name} ({dest.iataCode || dest.ident})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className={labelClass}>Arrival Airport</label>
                    <div className={staticBlockClass}>
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{flight.arrivalDestination?.name || flight.arrivalDestinationId}</span>
                    </div>
                    <p className="text-gray-400 text-[11px] font-medium mt-1">Cannot be changed for recurring/return routes</p>
                  </div>
                )}

                {!isReturn ? (
                  <div>
                    <label className={labelClass}>Departure Time *</label>
                    <input
                      type="datetime-local"
                      name="departureTime"
                      value={formik.values.departureTime || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      min={new Date().toISOString().slice(0, 16)}
                      className={`${inputBaseClass} ${formik.touched.departureTime && formik.errors.departureTime ? "border-red-400 bg-red-50/30" : ""}`}
                    />
                    {formik.touched.departureTime && formik.errors.departureTime && (
                      <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.departureTime}</p>
                    )}
                    <p className="text-gray-400 text-[11px] font-medium mt-1">Changing departure time will auto-update return pair</p>
                  </div>
                ) : (
                  <div>
                    <label className={labelClass}>Departure Time</label>
                    <div className={staticBlockClass}>
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      {new Date(flight.departureTime).toLocaleString()}
                    </div>
                    <p className="text-gray-400 text-[11px] font-medium mt-1">Return flight departure time is auto-calculated</p>
                  </div>
                )}

                {!isRecurringOrReturn && (
                  <div>
                    <label className={labelClass}>Duration (minutes) *</label>
                    <input
                      type="number"
                      name="durationMinutes"
                      value={formik.values.durationMinutes || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputBaseClass} ${formik.touched.durationMinutes && formik.errors.durationMinutes ? "border-red-400 bg-red-50/30" : ""}`}
                    />
                    {formik.touched.durationMinutes && formik.errors.durationMinutes && (
                      <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.durationMinutes}</p>
                    )}
                  </div>
                )}

                {!isReturn ? (
                  <div>
                    <label className={labelClass}>Buffer Time (minutes) *</label>
                    <input
                      type="number"
                      name="bufferMinutes"
                      value={formik.values.bufferMinutes || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputBaseClass} ${formik.touched.bufferMinutes && formik.errors.bufferMinutes ? "border-red-400 bg-red-50/30" : ""}`}
                    />
                    <p className="text-gray-400 text-[11px] font-medium mt-1">Changing buffer updates the paired return flight</p>
                    {formik.touched.bufferMinutes && formik.errors.bufferMinutes && (
                      <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.bufferMinutes as string}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className={labelClass}>Buffer Time (minutes)</label>
                    <div className={staticBlockClass}>
                      {flight.bufferMinutes ?? "—"}
                    </div>
                    <p className="text-gray-400 text-[11px] font-medium mt-1">Buffer time is auto-calculated for return legs</p>
                  </div>
                )}

                <div>
                  <label className={labelClass}>Gate (optional)</label>
                  <input
                    type="text"
                    name="gate"
                    value={formik.values.gate || ""}
                    onChange={formik.handleChange}
                    placeholder="e.g., A12"
                    className={inputBaseClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== 2. PRICING & SURCHARGES ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <DollarSign className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Pricing & Surcharges</h2>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Base Fare (INR)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Economy *</label>
                    <input
                      type="number"
                      name="baseFare.economy"
                      value={formik.values.baseFare?.economy || ""}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Premium Economy</label>
                    <input
                      type="number"
                      name="baseFare.premium_economy"
                      value={formik.values.baseFare?.premium_economy || ""}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Business</label>
                    <input
                      type="number"
                      name="baseFare.business"
                      value={formik.values.baseFare?.business || ""}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>First Class</label>
                    <input
                      type="number"
                      name="baseFare.first"
                      value={formik.values.baseFare?.first || ""}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-gray-900 font-bold text-sm mb-3 flex items-center gap-1.5">
                  <Armchair className="w-4 h-4 text-[#0a3a8a]" />
                  Seat Surcharges (INR, optional)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Window Seat</label>
                    <input
                      type="number"
                      name="seatSurcharge.window"
                      value={formik.values.seatSurcharge?.window || ""}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Aisle Seat</label>
                    <input
                      type="number"
                      name="seatSurcharge.aisle"
                      value={formik.values.seatSurcharge?.aisle || ""}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Extra Legroom</label>
                    <input
                      type="number"
                      name="seatSurcharge.extraLegroom"
                      value={formik.values.seatSurcharge?.extraLegroom || ""}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 3. BAGGAGE RULES ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Luggage className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Baggage Rules</h2>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Free Cabin Bag (kg)</label>
                  <input
                    type="number"
                    name="baggageRules.freeCabinKg"
                    value={formik.values.baggageRules?.freeCabinKg || ""}
                    onChange={formik.handleChange}
                    className={inputBaseClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Extra Charge per Kg (INR)</label>
                  <input
                    type="number"
                    name="baggageRules.extraChargePerKg"
                    value={formik.values.baggageRules?.extraChargePerKg || ""}
                    onChange={formik.handleChange}
                    className={inputBaseClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max Extra Kg Allowed</label>
                  <input
                    type="number"
                    name="baggageRules.maxExtraKg"
                    value={formik.values.baggageRules?.maxExtraKg || ""}
                    onChange={formik.handleChange}
                    className={inputBaseClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== ACTION SUBMIT BUTTON ===== */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {formik.isSubmitting ? "Submitting..." : "Submit for Approval"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditFlightForm;