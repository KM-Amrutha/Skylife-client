import React, { useState } from "react";
import {
  Plane,
  XCircle,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  Tag,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import useAdminFlights from "../../hooks/admin/useAdminFlights";
import Pagination from "../../layouts/Pagination";
import Sidebar from "./Sidebar";

const AdminFlights: React.FC = () => {
  const {
    adminFlights,
    isLoading,
    isRejecting,
    error,
    pagination,
    currentPage,
    handlePageChange,
    rejectFlightId,
    handleRejectClick,
    handleRejectCancel,
    handleRejectConfirm,
  } = useAdminFlights();

  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const toggleExpand = (flightId: string) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  return (
    <>
    <div className="flex min-h-screen bg-gray-50">
     <Sidebar />
     <div className="flex-1 min-w-0 p-4 md:p-8 pt-20 lg:pt-8 overflow-y-auto">
      <div className="p-4 md:p-8 pt-20 lg:pt-8 bg-gray-50 min-h-screen">
      
       {/* Header */}
<div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center justify-between gap-5">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
        <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">All Active Flights</h1>
        <p className="text-blue-200 text-sm mt-1">View and manage all approved scheduled flights</p>
      </div>
    </div>
    <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold whitespace-nowrap">
      {adminFlights.length} active
    </div>
  </div>
</div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && adminFlights.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-sm">
            <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-800 text-base font-semibold mb-1">No active flights</p>
            <p className="text-gray-500 text-sm">No approved scheduled flights found</p>
          </div>
        )}

        {/* Flight List */}
        {!isLoading && adminFlights.length > 0 && (
          <div className="space-y-4">
            {adminFlights.map((flight) => {
              const isExpanded = expandedFlight === flight.id;
              return (
                <div
                  key={flight.id}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:border-gray-300"
                >
                  {/* Card Header Summary */}
                  <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 w-full min-w-0">
                      {flight.providerLogo ? (
                        <img
                          src={flight.providerLogo}
                          alt={flight.providerName}
                          className="w-11 h-11 rounded-lg object-cover border border-gray-200 shadow-sm flex-shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                          <Plane className="w-5 h-5 text-blue-600" />
                        </div>
                      )}

                      {/* Flight/Aircraft Text */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-bold text-lg truncate">{flight.providerName}</span>
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5 space-y-0.5">
                          <p>
                            Flight No. <span className="text-blue-700 font-bold">{flight.flightNumber}</span>
                          </p>
                          <p className="text-gray-400 truncate">
                            {flight.aircraftName}
                            {flight.aircraftType ? ` · ${flight.aircraftType}` : ""}
                            {flight.manufacturer ? ` · ${flight.manufacturer}` : ""}
                          </p>
                        </div>
                      </div>

                      {/* Route Map Section */}
                      <div className="flex-1 hidden md:flex flex-col items-center gap-1 min-w-0 px-4">
                        <div className="flex items-center gap-4 justify-center w-full">
                          <div className="text-right max-w-[120px]">
                            <p className="text-gray-900 font-bold text-base tracking-tight">{flight.departureDestination?.iataCode || 'N/A'}</p>
                            <p className="text-gray-500 text-[10px] truncate">{flight.departureDestination?.name || '—'}</p>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-gray-300 flex-shrink-0">
                            <div className="w-10 h-px bg-gray-200" />
                            <Plane className="w-3.5 h-3.5 text-gray-400 rotate-90" />
                            <div className="w-10 h-px bg-gray-200" />
                          </div>

                          <div className="text-left max-w-[120px]">
                            <p className="text-gray-900 font-bold text-base tracking-tight">{flight.arrivalDestination?.iataCode || 'N/A'}</p>
                            <p className="text-gray-500 text-[10px] truncate">{flight.arrivalDestination?.name || '—'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-gray-400 text-[11px]">
                            ID: <span className="text-gray-600 font-mono font-medium">{flight.flightId}</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            flight.flightType === "recurring"
                              ? "bg-purple-50 border-purple-200 text-purple-700"
                              : flight.flightType === "return"
                              ? "bg-amber-50 border-amber-200 text-amber-700"
                              : "bg-blue-50 border-blue-200 text-blue-700"
                          }`}>
                            {flight.flightType === "recurring" ? "🔁 Recurring" : flight.flightType === "return" ? "↩️ Return" : "✈️ Outbound"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expand Trigger */}
                    <button
                      onClick={() => toggleExpand(flight.id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition text-sm font-semibold shrink-0"
                    >
                      <Eye className="w-4 h-4" />
                      {isExpanded ? 'Hide' : 'View Details'}
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expanded Flight Details Grid */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-6 space-y-6">
                      
                      {/* Mobile fallbacks for paths/routes */}
                      <div className="block md:hidden bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Route Blueprint</p>
                        <div className="flex justify-between items-center text-sm font-bold text-gray-900">
                          <span>{flight.departureDestination?.iataCode || 'N/A'} → {flight.arrivalDestination?.iataCode || 'N/A'}</span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono font-normal text-gray-600">{flight.flightId}</span>
                        </div>
                      </div>

                      {/* Route Timings & Schedule */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-white border border-gray-200 rounded-xl p-3.5 col-span-2 md:col-span-1 shadow-xs">
                          <div className="flex items-center gap-2 mb-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Full Route Path</p>
                          </div>
                          <p className="text-gray-900 text-xs font-semibold leading-relaxed">
                            {flight.departureDestination?.name || flight.departureDestinationId}
                            {" → "}
                            {flight.arrivalDestination?.name || flight.arrivalDestinationId}
                          </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Departure Time</p>
                          </div>
                          <p className="text-gray-900 text-xs font-bold">
                            {new Date(flight.departureTime).toLocaleString("en-IN", {
                              day: "2-digit", month: "short",
                              hour: "2-digit", minute: "2-digit", hour12: true,
                            })}
                          </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Arrival Time</p>
                          </div>
                          <p className="text-gray-900 text-xs font-bold">
                            {new Date(flight.arrivalTime).toLocaleString("en-IN", {
                              day: "2-digit", month: "short",
                              hour: "2-digit", minute: "2-digit", hour12: true,
                            })}
                          </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Air Duration</p>
                          </div>
                          <p className="text-gray-900 text-xs font-semibold">{flight.durationMinutes} mins</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Ground Buffer</p>
                          </div>
                          <p className="text-gray-900 text-xs font-semibold">{flight.bufferMinutes ?? "—"} mins</p>
                        </div>

                        {flight.gate && (
                          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                            <div className="flex items-center gap-2 mb-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Gate Terminal</p>
                            </div>
                            <p className="text-gray-900 text-xs font-bold text-blue-700">{flight.gate}</p>
                          </div>
                        )}
                      </div>

                      {/* Baggage Matrix Rules */}
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <Briefcase className="w-3.5 h-3.5 text-gray-500" />
                          <p className="text-gray-700 text-xs font-bold uppercase tracking-wider">Baggage Regulations</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Free Cabin Allowance</p>
                            <p className="text-gray-900 text-sm font-bold">{flight.baggageRules?.freeCabinKg ?? 0} kg</p>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Overage charge / kg</p>
                            <p className="text-gray-900 text-sm font-bold text-emerald-700">₹{flight.baggageRules?.extraChargePerKg ?? 0}</p>
                          </div>
                          {flight.baggageRules?.maxExtraKg && (
                            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Max Weight Cap</p>
                              <p className="text-gray-900 text-sm font-bold">{flight.baggageRules.maxExtraKg} kg</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Seat Layout Premium Costs */}
                      {(flight.seatSurcharge?.window || flight.seatSurcharge?.aisle || flight.seatSurcharge?.extraLegroom) && (
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <Tag className="w-3.5 h-3.5 text-gray-500" />
                            <p className="text-gray-700 text-xs font-bold uppercase tracking-wider">Seat Upgrade Surcharges</p>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {flight.seatSurcharge?.window && (
                              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Window Premium</p>
                                <p className="text-gray-900 text-sm font-bold">+₹{flight.seatSurcharge.window.toLocaleString("en-IN")}</p>
                              </div>
                            )}
                            {flight.seatSurcharge?.aisle && (
                              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Aisle Premium</p>
                                <p className="text-gray-900 text-sm font-bold">+₹{flight.seatSurcharge.aisle.toLocaleString("en-IN")}</p>
                              </div>
                            )}
                            {flight.seatSurcharge?.extraLegroom && (
                              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Extra Legroom</p>
                                <p className="text-gray-900 text-sm font-bold text-blue-700">+₹{flight.seatSurcharge.extraLegroom.toLocaleString("en-IN")}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Seat Class Fares */}
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <Tag className="w-3.5 h-3.5 text-gray-500" />
                          <p className="text-gray-700 text-xs font-bold uppercase tracking-wider">Base Seat Class Fares</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {flight.baseFare.economy > 0 && (
                            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Economy</p>
                              <p className="text-gray-900 text-base font-bold">₹{flight.baseFare.economy.toLocaleString("en-IN")}</p>
                            </div>
                          )}
                          {flight.baseFare.premium_economy && (
                            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 shadow-xs">
                              <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-1">Premium Economy</p>
                              <p className="text-blue-900 text-base font-bold">₹{flight.baseFare.premium_economy.toLocaleString("en-IN")}</p>
                            </div>
                          )}
                          {flight.baseFare.business && (
                            <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3.5 shadow-xs">
                              <p className="text-purple-600 text-[10px] font-bold uppercase tracking-wider mb-1">Business</p>
                              <p className="text-purple-900 text-base font-bold">₹{flight.baseFare.business.toLocaleString("en-IN")}</p>
                            </div>
                          )}
                          {flight.baseFare.first && (
                            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 shadow-xs">
                              <p className="text-amber-700 text-[10px] font-bold uppercase tracking-wider mb-1">First Class</p>
                              <p className="text-amber-900 text-base font-bold">₹{flight.baseFare.first.toLocaleString("en-IN")}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Revoke Action Panel */}
                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => { setRejectReason(""); handleRejectClick(flight.id); }}
                          disabled={isRejecting}
                          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" /> Cancel Flight Schedule
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}

            {pagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages ?? 4}
                isLoading={isLoading}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>

      {/* Reject Reason Dialog Modal */}
      {rejectFlightId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="h-1.5 w-full bg-red-500" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg">Cancel Scheduled Flight</h3>
                    <p className="text-gray-500 text-xs">This action will instantly notify the air carrier.</p>
                  </div>
                </div>
                <button
                  onClick={handleRejectCancel}
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 transition"
                >
                  ✕
                </button>
              </div>

              <div className="border-t border-gray-100 mb-4" />

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Please enter an explicit cancellation or rejection reason. This message displays on the provider dashboard log.
              </p>

              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g., Unstable flight path validation, operational gate conflict, scheduling overhaul..."
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-500 resize-none text-sm transition"
                rows={4}
              />

              <div className="flex items-center justify-between mt-1 mb-6">
                <span className="text-gray-400 text-xs">Minimum 10 characters required</span>
                <span className={`text-xs font-semibold ${rejectReason.trim().length >= 10 ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {rejectReason.trim().length} chars
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRejectCancel}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
                >
                  Go Back
                </button>
                <button
                  onClick={() => handleRejectConfirm(rejectReason)}
                  disabled={!rejectReason.trim() || rejectReason.trim().length < 10 || isRejecting}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent disabled:cursor-not-allowed"
                >
                  <XCircle className="w-4 h-4" />
                  {isRejecting ? "Processing..." : "Confirm Drop"}
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

export default AdminFlights;