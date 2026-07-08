import React, { useEffect, useState } from "react";
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
import useFlightApproval from "../../hooks/admin/useFlightApproval";
import Sidebar from "./Sidebar";

const PendingFlight: React.FC = () => {
  const {
    pendingFlights,
    isLoading: flightsLoading,
    handleApproveFlight,
    handleRejectFlight,
  } = useFlightApproval();
  
  useEffect(() => {
    console.log("Pending Flights:", pendingFlights);
  }, [pendingFlights]);

  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [rejectFlightId, setRejectFlightId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const toggleExpand = (flightId: string) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  return (
    <>
    <div className="flex min-h-screen bg-gray-50">
  <Sidebar />
  <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="p-4 md:p-8 pt-20 lg:pt-8 bg-gray-50 min-h-screen">

        {/* Page Header */}
       <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center justify-between gap-5">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
        <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Pending Flight Approvals</h1>
        <p className="text-blue-200 text-sm mt-1">Review and approve flight schedules from providers</p>
      </div>
    </div>
    <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold whitespace-nowrap">
      {pendingFlights.length} pending
    </div>
  </div>
</div>

        {/* Loading Spinner */}
        {flightsLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600" />
          </div>
        )}

        {/* Empty State */}
        {!flightsLoading && pendingFlights.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-xs">
            <Plane className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <p className="text-gray-800 text-base font-semibold mb-1">All flights approved!</p>
            <p className="text-gray-500 text-sm">No pending flight reviews</p>
          </div>
        )}

        {/* Flight List Canvas */}
        {!flightsLoading && pendingFlights.length > 0 && (
          <div className="space-y-4">
            {pendingFlights.map((flight) => {
              const isExpanded = expandedFlight === flight.id;
              return (
                <div
                  key={flight.id}
                  className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all duration-200 hover:border-gray-300"
                >
                  {/* Card Header Container */}
                  <div className="p-5 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Logo Frame */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-50 flex items-center justify-center shadow-xs">
                        <img
                          src={flight.providerLogo}
                          alt={flight.providerName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Flight Number & Provider Meta */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Flight No.</span>
                          <span className="text-gray-900 font-black text-xl">{flight.flightNumber}</span>
                        </div>
                        <div className="mt-0.5">
                          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Provider</p>
                          <p className="text-gray-800 font-bold text-base leading-tight">{flight.providerName}</p>
                        </div>
                      </div>

                      {/* Connection/Route Graphic */}
                      <div className="flex-1 hidden sm:flex flex-col items-center gap-1 px-4">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-gray-900 font-black text-lg tracking-tight">{flight.departureDestination?.iataCode || 'N/A'}</p>
                            <p className="text-gray-500 text-[10px] font-medium truncate max-w-[100px]">{flight.departureDestination?.name || '—'}</p>
                          </div>
                          <div className="flex items-center gap-1 text-gray-300">
                            <div className="w-8 h-px bg-gray-200" />
                            <Plane className="w-3 h-3 rotate-90 text-gray-400" />
                            <div className="w-8 h-px bg-gray-200" />
                          </div>
                          <div className="text-center">
                            <p className="text-gray-900 font-black text-lg tracking-tight">{flight.arrivalDestination?.iataCode || 'N/A'}</p>
                            <p className="text-gray-500 text-[10px] font-medium truncate max-w-[100px]">{flight.arrivalDestination?.name || '—'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-400 text-xs">ID: <span className="text-gray-700 font-semibold">{flight.flightId}</span></span>
                          <span className="text-gray-300">·</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider">{flight.flightStatus}</span>
                          <span className="text-gray-300">·</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            flight.flightType === "recurring"
                              ? "bg-purple-50 border-purple-200 text-purple-700"
                              : "bg-blue-50 border-blue-200 text-blue-700"
                          }`}>
                            {flight.flightType === "recurring" ? "🔁 Recurring" : "✈️ Outbound"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(flight.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition text-xs font-bold uppercase tracking-wider shrink-0 shadow-xs"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                      {isExpanded ? 'Hide' : 'Review'}
                      {isExpanded ? <ChevronUp className="w-3 h-3 text-gray-500" /> : <ChevronDown className="w-3 h-3 text-gray-500" />}
                    </button>
                  </div>

                  {/* Fallback Mobile Layout for Route Info */}
                  {(!isExpanded) && (
                    <div className="p-4 bg-gray-50/50 border-t border-gray-100 sm:hidden flex justify-between text-xs text-gray-600">
                      <div><span className="font-bold text-gray-900">{flight.departureDestination?.iataCode}</span> → <span className="font-bold text-gray-900">{flight.arrivalDestination?.iataCode}</span></div>
                      <div className="capitalize font-medium text-gray-500">{flight.flightType}</div>
                    </div>
                  )}

                  {/* Expanded Details Drawer */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/40 px-5 py-5 space-y-5">

                      {/* Logistics Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs col-span-2 md:col-span-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Route Details</p>
                          </div>
                          <p className="text-gray-800 text-xs font-semibold">
                            {flight.departureDestination?.name || flight.departureDestinationId}
                            {' → '}
                            {flight.arrivalDestination?.name || flight.arrivalDestinationId}
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Departure</p>
                          </div>
                          <p className="text-gray-800 text-xs font-semibold">
                            {new Date(flight.departureTime).toLocaleString('en-IN', {
                              day: '2-digit', month: 'short',
                              hour: '2-digit', minute: '2-digit', hour12: true,
                            })}
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Arrival</p>
                          </div>
                          <p className="text-gray-800 text-xs font-semibold">
                            {new Date(flight.arrivalTime).toLocaleString('en-IN', {
                              day: '2-digit', month: 'short',
                              hour: '2-digit', minute: '2-digit', hour12: true,
                            })}
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Duration</p>
                          </div>
                          <p className="text-gray-800 text-xs font-semibold">{flight.durationMinutes} min</p>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Plane className="w-3 h-3 text-gray-400" />
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Aircraft</p>
                          </div>
                          <p className="text-gray-800 text-xs font-semibold">{flight.aircraftName}</p>
                          {flight.manufacturer && (
                            <p className="text-blue-600 text-[10px] font-medium mt-0.5">
                              Mfr: {flight.manufacturer}
                            </p>
                          )}
                        </div>

                        {flight.gate && (
                          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Briefcase className="w-3 h-3 text-gray-400" />
                              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Terminal Gate</p>
                            </div>
                            <p className="text-gray-800 text-xs font-semibold">{flight.gate}</p>
                          </div>
                        )}
                      </div>

                      {/* Pricing Structures */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Tag className="w-3 h-3 text-gray-400" />
                          <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Base Tier Fares</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                          {flight.baseFare.economy > 0 && (
                            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Economy</p>
                              <p className="text-gray-900 text-sm font-black">₹{flight.baseFare.economy.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                          {flight.baseFare.premium_economy && (
                            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 shadow-xs">
                              <p className="text-blue-700 text-[9px] font-bold uppercase tracking-wider mb-0.5">Prem. Economy</p>
                              <p className="text-blue-900 text-sm font-black">₹{flight.baseFare.premium_economy.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                          {flight.baseFare.business && (
                            <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3 shadow-xs">
                              <p className="text-purple-700 text-[9px] font-bold uppercase tracking-wider mb-0.5">Business</p>
                              <p className="text-purple-900 text-sm font-black">₹{flight.baseFare.business.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                          {flight.baseFare.first && (
                            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 shadow-xs">
                              <p className="text-amber-700 text-[9px] font-bold uppercase tracking-wider mb-0.5">First Class</p>
                              <p className="text-amber-900 text-sm font-black">₹{flight.baseFare.first.toLocaleString('en-IN')}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Extra Seat Surcharges */}
                      {(flight.seatSurcharge?.window || flight.seatSurcharge?.aisle || flight.seatSurcharge?.extraLegroom) && (
                        <div className="grid grid-cols-3 gap-2.5">
                          {flight.seatSurcharge?.window && (
                            <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Window Seat</p>
                              <p className="text-gray-800 text-xs font-bold">+₹{flight.seatSurcharge.window}</p>
                            </div>
                          )}
                          {flight.seatSurcharge?.aisle && (
                            <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Aisle Seat</p>
                              <p className="text-gray-800 text-xs font-bold">+₹{flight.seatSurcharge.aisle}</p>
                            </div>
                          )}
                          {flight.seatSurcharge?.extraLegroom && (
                            <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Legroom Space</p>
                              <p className="text-gray-800 text-xs font-bold">+₹{flight.seatSurcharge.extraLegroom}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Luggage Metrics */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Free Cabin</p>
                          <p className="text-gray-800 text-xs font-bold">{flight.baggageRules?.freeCabinKg || 7} kg</p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Excess Charge / kg</p>
                          <p className="text-gray-800 text-xs font-bold">₹{flight.baggageRules?.extraChargePerKg || 0}</p>
                        </div>
                        {flight.baggageRules?.maxExtraKg && (
                          <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Max Excess Cap</p>
                            <p className="text-gray-800 text-xs font-bold">{flight.baggageRules.maxExtraKg} kg</p>
                          </div>
                        )}
                      </div>

                      {/* Management Controls */}
                      <div className="flex gap-3 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => handleApproveFlight(flight.id)}
                          disabled={flightsLoading}
                          className="flex-1 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 hover:border-emerald-300 disabled:opacity-50 shadow-xs"
                        >
                          <CheckCircle className="w-4 h-4" /> Approve Flight
                        </button>
                        <button
                          onClick={() => { setRejectFlightId(flight.id); setRejectReason(""); }}
                          disabled={flightsLoading}
                          className="flex-1 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 disabled:opacity-50 shadow-xs"
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

      {/* Rejection Remarks Modal */}
      {rejectFlightId && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="h-1 w-full bg-red-500" />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-extrabold text-base">Reject Schedule Request</h3>
                    <p className="text-gray-500 text-xs">A message will log to the provider's panel</p>
                  </div>
                </div>
                <button
                  onClick={() => { setRejectFlightId(null); setRejectReason(""); }}
                  className="text-gray-400 hover:text-gray-600 transition text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="border-t border-gray-100 mb-4" />

              <p className="text-gray-600 text-xs mb-3 font-medium">
                Please document a reason explaining what requires corrections before submission cycles open back up.
              </p>

              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g., Invalid departure time configuration, missing baseline fare matrices, aircraft profile unverified..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none text-xs transition font-medium"
                rows={4}
              />

              <div className="flex items-center justify-between mt-1.5 mb-5">
                <span className="text-gray-400 text-[10px] font-bold tracking-wide uppercase">Minimum 10 characters</span>
                <span className={`text-[10px] font-bold uppercase tracking-wide ${rejectReason.trim().length >= 10 ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {rejectReason.trim().length} Chars logged
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setRejectFlightId(null); setRejectReason(""); }}
                  className="flex-1 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-700 border border-gray-200 hover:bg-gray-50 transition shadow-xs"
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
                  className="flex-1 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                >
                  <XCircle className="w-4 h-4" /> Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
</div>
    </>
  );
};

export default PendingFlight;