import React, { useState } from "react";
import {
  Plane,
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Tag,
  Briefcase,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import useFlightApproval from "../../hooks/admin/useFlightApproval";

const PendingFlight: React.FC = () => {
  const {
    pendingFlights,
    isLoading: flightsLoading,
    handleApproveFlight,
    handleRejectFlight,
  } = useFlightApproval();

  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [rejectFlightId, setRejectFlightId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const toggleExpand = (flightId: string) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  return (
    <AdminLayout title="Pending Flight Approvals">
      <div className="p-4 md:p-8 pt-20 lg:pt-8">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold">Pending Flight Approvals</h1>
            <p className="text-slate-400 text-sm mt-1">Review and approve flight schedules from providers</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-400/20 rounded-xl">
            <span className="text-2xl font-bold text-white">{pendingFlights.length}</span>
            <span className="text-xs text-amber-300 uppercase tracking-widest font-semibold">Pending</span>
          </div>
        </div>

        {/* Loading */}
        {flightsLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
          </div>
        )}

        {/* Empty */}
        {!flightsLoading && pendingFlights.length === 0 && (
          <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
            <Plane className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <p className="text-slate-100 text-base mb-2">All flights approved!</p>
            <p className="text-slate-400 text-sm">No pending flight reviews</p>
          </div>
        )}

        {/* Flight List */}
        {!flightsLoading && pendingFlights.length > 0 && (
          <div className="space-y-4">
            {pendingFlights.map((flight) => {
              const isExpanded = expandedFlight === flight._id;
              return (
                <div
                  key={flight._id}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl overflow-hidden transition-all duration-300 hover:border-blue-400/30"
                >
                  {/* Card Header — always visible */}
                  <div className="p-5 flex items-center justify-between gap-4">
  <div className="flex items-center gap-4 flex-1">
    {/* Icon */}
    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center border-2 border-white/10 shrink-0">
      <Plane className="w-7 h-7 text-white" />
    </div>

    {/* Left — Flight number + ID */}
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-[10px] uppercase tracking-wider">Flight No.</span>
        <span className="text-white font-bold text-xl">{flight.flightNumber}</span>
      </div>
      <p className="text-slate-500 text-xs mt-0.5">
        Provider: <span className="text-green-300 font-bold text-xl">{flight.providerName}</span>
      </p>
    </div>

    {/* Centre — Route */}
    <div className="flex-1 flex flex-col items-center gap-1">
      <div className="flex items-center gap-3">
        <div className="text-center">
          <p className="text-white font-bold text-lg">{flight.departureDestination?.iataCode || 'N/A'}</p>
          <p className="text-slate-400 text-[10px] truncate max-w-[100px]">{flight.departureDestination?.name || '—'}</p>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <div className="w-8 h-px bg-slate-600" />
          <Plane className="w-3 h-3 rotate-90" />
          <div className="w-8 h-px bg-slate-600" />
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-lg">{flight.arrivalDestination?.iataCode || 'N/A'}</p>
          <p className="text-slate-400 text-[10px] truncate max-w-[100px]">{flight.arrivalDestination?.name || '—'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
         <span className="text-slate-400 text-xs">Flight ID:  <span className="text-cyan-400">{flight.flightId}</span></span>
        <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider">{flight.flightStatus}</span>
        <span className="text-slate-600">·</span>
       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
  flight.flightType === "recurring"
    ? "bg-purple-500/15 border-purple-400/30 text-purple-300"
    : "bg-blue-500/15 border-blue-400/30 text-blue-300"
}`}>
  {flight.flightType === "recurring" ? "🔁 Recurring" : "✈️ Outbound"}
</span>
      </div>
    </div>
  </div>

  <button
    onClick={() => toggleExpand(flight._id)}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition text-sm font-medium shrink-0"
  >
    <Eye className="w-4 h-4" />
    {isExpanded ? 'Hide' : 'Review'}
    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
  </button>
</div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 px-5 py-5 space-y-5">

                      {/* Route & Schedule */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                        <div className="bg-white/5 rounded-xl p-3 col-span-2 md:col-span-1">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Route</p>
                          </div>
                          <p className="text-white text-xs font-medium">
                            {flight.departureDestination?.name || flight.departureDestinationId}
                            {' → '}
                            {flight.arrivalDestination?.name || flight.arrivalDestinationId}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Departure</p>
                          </div>
                          <p className="text-white text-xs font-medium">
                            {new Date(flight.departureTime).toLocaleString('en-IN', {
                              day: '2-digit', month: 'short',
                              hour: '2-digit', minute: '2-digit', hour12: true,
                            })}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Arrival</p>
                          </div>
                          <p className="text-white text-xs font-medium">
                            {new Date(flight.arrivalTime).toLocaleString('en-IN', {
                              day: '2-digit', month: 'short',
                              hour: '2-digit', minute: '2-digit', hour12: true,
                            })}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Duration</p>
                          </div>
                          <p className="text-white text-xs font-medium">{flight.durationMinutes} min</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
  <div className="flex items-center gap-2 mb-1">
    <Plane className="w-3 h-3 text-slate-400" />
    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Aircraft</p>
  </div>
  <p className="text-white text-xs font-medium">{flight.aircraftName}</p>
</div>



                        {flight.gate && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Briefcase className="w-3 h-3 text-slate-400" />
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Gate</p>
                            </div>
                            <p className="text-white text-xs font-medium">{flight.gate}</p>
                          </div>
                        )}
                      </div>

                      {/* Fares */}
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <Tag className="w-3 h-3 text-slate-400" />
                          <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Base Fares</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                          {flight.baseFare.economy > 0 && (
                            <div className="bg-slate-500/10 border border-slate-400/20 rounded-xl p-3">
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Economy</p>
                              <p className="text-white text-sm font-bold">₹{flight.baseFare.economy.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                          {flight.baseFare.premium_economy && (
                            <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-3">
                              <p className="text-blue-300 text-[10px] uppercase tracking-wider mb-1">Prem. Economy</p>
                              <p className="text-white text-sm font-bold">₹{flight.baseFare.premium_economy.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                          {flight.baseFare.business && (
                            <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-3">
                              <p className="text-purple-300 text-[10px] uppercase tracking-wider mb-1">Business</p>
                              <p className="text-white text-sm font-bold">₹{flight.baseFare.business.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                          {flight.baseFare.first && (
                            <div className="bg-amber-500/10 border border-amber-400/20 rounded-xl p-3">
                              <p className="text-amber-300 text-[10px] uppercase tracking-wider mb-1">First Class</p>
                              <p className="text-white text-sm font-bold">₹{flight.baseFare.first.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Seat Surcharges */}
                      {(flight.seatSurcharge?.window || flight.seatSurcharge?.aisle || flight.seatSurcharge?.extraLegroom) && (
                        <div className="grid grid-cols-3 gap-2.5">
                          {flight.seatSurcharge?.window && (
                            <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Window</p>
                              <p className="text-white text-xs font-bold">+₹{flight.seatSurcharge.window}</p>
                            </div>
                          )}
                          {flight.seatSurcharge?.aisle && (
                            <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Aisle</p>
                              <p className="text-white text-xs font-bold">+₹{flight.seatSurcharge.aisle}</p>
                            </div>
                          )}
                          {flight.seatSurcharge?.extraLegroom && (
                            <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Extra Legroom</p>
                              <p className="text-white text-xs font-bold">+₹{flight.seatSurcharge.extraLegroom}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Baggage Rules */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Free Cabin</p>
                          <p className="text-white text-xs font-bold">{flight.baggageRules?.freeCabinKg || 7} kg</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Extra/kg</p>
                          <p className="text-white text-xs font-bold">₹{flight.baggageRules?.extraChargePerKg || 0}</p>
                        </div>
                        {flight.baggageRules?.maxExtraKg && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Max Extra</p>
                            <p className="text-white text-xs font-bold">{flight.baggageRules.maxExtraKg} kg</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2 border-t border-white/10">
                        <button
                          onClick={() => handleApproveFlight(flight._id)}
                          disabled={flightsLoading}
                          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 hover:border-emerald-400/50 disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" /> Approve Flight
                        </button>
                        <button
                          onClick={() => { setRejectFlightId(flight._id); setRejectReason(""); }}
                          disabled={flightsLoading}
                          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 hover:border-red-400/50 disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" /> Reject Flight
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectFlightId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1628] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-red-500 to-rose-400" />

            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Reject Flight</h3>
                    <p className="text-slate-400 text-xs">This will notify the provider</p>
                  </div>
                </div>
                <button
                  onClick={() => { setRejectFlightId(null); setRejectReason(""); }}
                  className="text-slate-400 hover:text-white transition text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="border-t border-white/5 mb-5" />

              <p className="text-slate-300 text-sm mb-4">
                Provide a clear reason so the provider knows what to fix before resubmitting.
              </p>

              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g., Invalid departure time, missing fare structure, aircraft not verified..."
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-red-400/50 focus:outline-none focus:ring-1 focus:ring-red-400/30 resize-none text-sm transition"
                rows={5}
              />

              <div className="flex items-center justify-between mt-2 mb-5">
                <span className="text-slate-500 text-xs">Minimum 10 characters</span>
                <span className={`text-xs font-medium ${rejectReason.trim().length >= 10 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {rejectReason.trim().length} chars
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setRejectFlightId(null); setRejectReason(""); }}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleRejectFlight(rejectFlightId, rejectReason);
                    setRejectFlightId(null);
                    setRejectReason("");
                  }}
                  disabled={!rejectReason.trim() || rejectReason.trim().length < 10}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 hover:border-red-400/50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <XCircle className="w-4 h-4" /> Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PendingFlight;