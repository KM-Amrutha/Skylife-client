import React from "react";
// import { FormikHelpers } from "formik";
import { Plane, MapPin, Clock, DollarSign, Luggage,Armchair } from "lucide-react";
import useEditFlight from "../../hooks/provider/useEditFlight";
import { Destination } from "../../redux/destination/destinationType";

const EditFlightForm: React.FC = () => {
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

  } = useEditFlight();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-400/60 text-red-200 px-8 py-6 rounded-2xl text-center">
        <p className="text-lg font-medium">Error loading flight</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-400/60 text-yellow-200 px-8 py-6 rounded-2xl text-center">
        <p className="text-lg font-medium">Flight not found</p>
        <p className="text-sm mt-2">The flight you're trying to edit doesn't exist or has been removed.</p>
      </div>
    );
  }

  const isRejected = flight.adminApproval.status === "rejected";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          {isRejected ? "Reschedule Rejected Flight" : "Edit Flight Schedule"}
        </h1>
        <p className="text-slate-300 text-lg">
          {isRejected
            ? "Update your flight details and resubmit for approval"
            : "Modify flight details — changes will require admin re-approval"}
        </p>
      </div>

      {isRejected && flight.adminApproval.reason && (
        <div className="bg-red-900/30 border border-red-500/50 p-6 rounded-2xl mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Plane className="w-8 h-8 text-red-300" />
            <h3 className="text-xl font-bold text-red-300">Previous Rejection Reason</h3>
          </div>
          <p className="text-slate-200 italic text-base leading-relaxed">
            "{flight.adminApproval.reason}"
          </p>
        </div>
      )}

      {(flight.flightType === "recurring" || flight.flightType === "return") && (
  <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm font-medium text-center">
    {flight.flightType === "recurring" ? "🔁 Recurring Flight — duration and arrival airport are locked" : "↩️ Return Flight — duration and arrival airport are locked"}
  </div>
)}

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Flight Info Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Plane className="w-7 h-7 text-blue-300" />
            Flight Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Flight Number
              </label>
              <input
                type="text"
                name="flightNumber"
                value={formik.values.flightNumber || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition"
                placeholder="e.g., AI101"
              />
              {formik.touched.flightNumber && formik.errors.flightNumber && (
                <p className="text-red-400 text-sm mt-2">{formik.errors.flightNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Aircraft
              </label>
              <div className="px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-300">
                {flight.aircraftName}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Departure Airport
              </label>
              <div className="px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-300 flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                {/* {flight.departureDestinationId} */}
                 {flight.departureDestination?.name || flight.departureDestinationId} 
              </div>
              <p className="text-slate-400 text-xs mt-2">Departure airport cannot be changed</p>
            </div>

           {!isRecurringOrReturn ? (
  <div>
    <label className="block text-slate-300 text-sm font-medium mb-2">Arrival Airport</label>
    <div className="relative">
      <input
        type="text"
        value={arrivalDisplayName}
        onChange={(e) => handleArrivalSearch(e.target.value)}
        className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
        placeholder="Search arrival airport..."
      />
      {arrivalSearchResults.length > 0 && (
        <div className="absolute z-20 w-full mt-2 bg-slate-800/90 backdrop-blur border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
          {arrivalSearchResults.map((dest: Destination) => (
            <button
              key={dest._id}
              type="button"
              onClick={() => { selectArrival(dest); clearArrivalResults(); }}
              className="w-full px-5 py-3 text-left text-slate-200 hover:bg-white/10 transition"
            >
              {dest.name} ({dest.iataCode || dest.ident})
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
) : (
  <div>
    <label className="block text-slate-300 text-sm font-medium mb-2">Arrival Airport</label>
    <div className="px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-300 flex items-center gap-3">
      <MapPin className="w-5 h-5" />
      {flight.arrivalDestination?.name || flight.arrivalDestinationId}
    </div>
    <p className="text-slate-400 text-xs mt-2">Cannot be changed for recurring or return flights</p>
  </div>
)}

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Departure Time
              </label>
              <div className="px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-300 flex items-center gap-3">
                <Clock className="w-5 h-5" />
                {new Date(flight.departureTime).toLocaleString()}
              </div>
              <p className="text-slate-400 text-xs mt-2">Departure time cannot be changed</p>
            </div>

          {!isRecurringOrReturn && (
  <div>
    <label className="block text-slate-300 text-sm font-medium mb-2">Duration (minutes)</label>
    <input
      type="number"
      name="durationMinutes"
      value={formik.values.durationMinutes || ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
    />
    {formik.touched.durationMinutes && formik.errors.durationMinutes && (
      <p className="text-red-400 text-sm mt-2">{formik.errors.durationMinutes}</p>
    )}
  </div>
)}

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Gate (optional)
              </label>
              <input
                type="text"
                name="gate"
                value={formik.values.gate || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                placeholder="e.g., A12"
              />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <DollarSign className="w-7 h-7 text-green-300" />
            Pricing & Surcharges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Economy Base Fare
              </label>
              <input
                type="number"
                name="baseFare.economy"
                value={formik.values.baseFare?.economy || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Premium Economy (optional)
              </label>
              <input
                type="number"
                name="baseFare.premium_economy"
                value={formik.values.baseFare?.premium_economy || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Business Class (optional)
              </label>
              <input
                type="number"
                name="baseFare.business"
                value={formik.values.baseFare?.business || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                First Class (optional)
              </label>
              <input
                type="number"
                name="baseFare.first"
                value={formik.values.baseFare?.first || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Armchair className="w-6 h-6 text-cyan-300" />
              Seat Surcharges (optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Window Seat</label>
                <input
                  type="number"
                  name="seatSurcharge.window"
                  value={formik.values.seatSurcharge?.window || ""}
                  onChange={formik.handleChange}
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Aisle Seat</label>
                <input
                  type="number"
                  name="seatSurcharge.aisle"
                  value={formik.values.seatSurcharge?.aisle || ""}
                  onChange={formik.handleChange}
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Extra Legroom</label>
                <input
                  type="number"
                  name="seatSurcharge.extraLegroom"
                  value={formik.values.seatSurcharge?.extraLegroom || ""}
                  onChange={formik.handleChange}
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Baggage Rules */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Luggage className="w-7 h-7 text-purple-300" />
            Baggage Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Free Cabin Bag (kg)
              </label>
              <input
                type="number"
                name="baggageRules.freeCabinKg"
                value={formik.values.baggageRules?.freeCabinKg || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Extra Charge per Kg
              </label>
              <input
                type="number"
                name="baggageRules.extraChargePerKg"
                value={formik.values.baggageRules?.extraChargePerKg || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Max Extra Kg (optional)
              </label>
              <input
                type="number"
                name="baggageRules.maxExtraKg"
                value={formik.values.baggageRules?.maxExtraKg || ""}
                onChange={formik.handleChange}
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-xl rounded-2xl transition-all shadow-lg hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {formik.isSubmitting ? "Submitting..." : "Submit for Approval"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFlightForm;