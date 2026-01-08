import React, { useState } from "react";
import useFlightApproval from "../../hooks/useFlightApproval";
import AdminLayout from "../../layouts/AdminLayout";
import { Plane, CheckCircle, XCircle, Eye, MapPin, Calendar, Clock, X } from "lucide-react";

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

  const toggleFlightExpand = (flightId: string) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  return (
    <AdminLayout title="Pending Flight Approvals">
    <div className="p-4 md:p-8 pt-20 lg:pt-8">
     

     <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 mt-8">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-3xl font-bold text-white">
                   Pending Flight Approvals
                 </h2>
                 <div className="px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-medium">
                   {pendingFlights.length} flights
                 </div>
               </div>
     
               {flightsLoading ? (
                 <div className="text-center py-16">
                   <div className="inline-block w-16 h-16 border-4 border-orange-400/30 border-t-orange-400 rounded-full animate-spin mb-4"></div>
                   <p className="text-slate-300 text-lg">Loading flights...</p>
                 </div>
               ) : pendingFlights.length === 0 ? (
                 <div className="text-center py-16">
                   <Plane className="w-16 h-16 text-green-400 mx-auto mb-4" />
                   <p className="text-slate-300 text-lg">All flights approved! No pending reviews</p>
                 </div>
               ) : (
                 <div className="space-y-6">
                   {pendingFlights.map((flight) => (
                     <div
                       key={flight._id}
                       className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
                         expandedFlight === flight._id
                           ? "border-orange-400/50 shadow-2xl shadow-orange-500/20 scale-[1.02]"
                           : "border-white/10"
                       }`}
                     >
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-4">
                           <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center border-2 border-orange-400/30">
                             <Plane className="w-10 h-10 text-white" />
                           </div>
                           <div>
                             <h3 className="text-2xl font-bold text-white mb-1">
                               {flight.flightNumber}
                             </h3>
                             <p className="text-lg text-orange-300">
                               {flight.aircraftName}
                             </p>
                           </div>
                         </div>
     
                         <button
                           onClick={() => toggleFlightExpand(flight._id)}
                           className="flex items-center gap-2 px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/30 text-orange-300 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                         >
                           <Eye className="w-4 h-4" />
                           {expandedFlight === flight._id ? "Hide Details" : "View Details"}
                         </button>
                       </div>
                        
                                          {expandedFlight === flight._id && (
                         <div className="border-t border-white/10 pt-6 space-y-6">
                           {/* Route & Schedule */}
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="bg-slate-800/50 rounded-xl p-4">
                               <div className="flex items-center gap-2 mb-2">
                                 <MapPin className="w-4 h-4 text-slate-400" />
                                 <p className="text-xs font-semibold text-slate-400 uppercase">Route</p>
                               </div>
                               <p className="text-white font-medium text-lg">
                                 {/* {flight.departureDestinationId} → {flight.arrivalDestinationId} */}
                                 {flight.departureDestination?.name || flight.departureDestinationId} 
                                ({flight.departureDestination?.iataCode || 'N/A'}) 
                                    → 
                                {flight.arrivalDestination?.name || flight.arrivalDestinationId} 
                                ({flight.arrivalDestination?.iataCode || 'N/A'})
                               </p>
                             </div>
     
                             <div className="bg-slate-800/50 rounded-xl p-4">
                               <div className="flex items-center gap-2 mb-2">
                                 <Calendar className="w-4 h-4 text-slate-400" />
                                 <p className="text-xs font-semibold text-slate-400 uppercase">Departure Time</p>
                               </div>
                               <p className="text-white font-medium">
                                 {new Date(flight.departureTime).toLocaleString()}
                               </p>
                             </div>
     
                             <div className="bg-slate-800/50 rounded-xl p-4">
                               <div className="flex items-center gap-2 mb-2">
                                 <Clock className="w-4 h-4 text-slate-400" />
                                 <p className="text-xs font-semibold text-slate-400 uppercase">Flight Duration</p>
                               </div>
                               <p className="text-white font-medium">{flight.durationMinutes} minutes</p>
                             </div>
                           </div>
     
                           {/* Aircraft Info */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-slate-800/50 rounded-xl p-4">
                               <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Aircraft</p>
                               <p className="text-white font-medium text-lg">{flight.aircraftName}</p>
                             </div>
     
                             {flight.gate && (
                               <div className="bg-slate-800/50 rounded-xl p-4">
                                 <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Gate</p>
                                 <p className="text-white font-medium text-lg">{flight.gate}</p>
                               </div>
                             )}
                           </div>
     
                           {/* Pricing Details */}
                           <div>
                             <h4 className="text-sm font-bold text-orange-300 uppercase tracking-wide mb-4">
                               Pricing & Fare Structure
                             </h4>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                               <div className="bg-slate-800/50 rounded-xl p-4">
                                 <p className="text-xs text-slate-400">Economy</p>
                                 <p className="text-xl font-bold text-white">₹{flight.baseFare.economy}</p>
                               </div>
                               {flight.baseFare.premiumEconomy && (
                                 <div className="bg-slate-800/50 rounded-xl p-4">
                                   <p className="text-xs text-slate-400">Premium Economy</p>
                                   <p className="text-xl font-bold text-white">₹{flight.baseFare.premiumEconomy}</p>
                                 </div>
                               )}
                               {flight.baseFare.business && (
                                 <div className="bg-slate-800/50 rounded-xl p-4">
                                   <p className="text-xs text-slate-400">Business</p>
                                   <p className="text-xl font-bold text-white">₹{flight.baseFare.business}</p>
                                 </div>
                               )}
                               {flight.baseFare.first && (
                                 <div className="bg-slate-800/50 rounded-xl p-4">
                                   <p className="text-xs text-slate-400">First Class</p>
                                   <p className="text-xl font-bold text-white">₹{flight.baseFare.first}</p>
                                 </div>
                               )}
                             </div>
                           </div>
     
                           {/* Seat Surcharges */}
                           {(flight.seatSurcharge.window || flight.seatSurcharge.aisle || flight.seatSurcharge.extraLegroom) && (
                             <div>
                               <h4 className="text-sm font-bold text-orange-300 uppercase tracking-wide mb-4">
                                 Seat Surcharges
                               </h4>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                 {flight.seatSurcharge.window && (
                                   <div className="bg-slate-800/50 rounded-xl p-4">
                                     <p className="text-xs text-slate-400">Window Seat</p>
                                     <p className="text-lg font-bold text-white">+₹{flight.seatSurcharge.window}</p>
                                   </div>
                                 )}
                                 {flight.seatSurcharge.aisle && (
                                   <div className="bg-slate-800/50 rounded-xl p-4">
                                     <p className="text-xs text-slate-400">Aisle Seat</p>
                                     <p className="text-lg font-bold text-white">+₹{flight.seatSurcharge.aisle}</p>
                                   </div>
                                 )}
                                 {flight.seatSurcharge.extraLegroom && (
                                   <div className="bg-slate-800/50 rounded-xl p-4">
                                     <p className="text-xs text-slate-400">Extra Legroom</p>
                                     <p className="text-lg font-bold text-white">+₹{flight.seatSurcharge.extraLegroom}</p>
                                   </div>
                                 )}
                               </div>
                             </div>
                           )}
     
                           {/* Baggage Rules */}
                           <div>
                             <h4 className="text-sm font-bold text-orange-300 uppercase tracking-wide mb-4">
                               Baggage Rules
                             </h4>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               <div className="bg-slate-800/50 rounded-xl p-4">
                                 <p className="text-xs text-slate-400">Free Cabin Baggage</p>
                                 <p className="text-lg font-bold text-white">
                                   {flight.baggageRules.freeCabinKg || 7} kg
                                 </p>
                               </div>
                               <div className="bg-slate-800/50 rounded-xl p-4">
                                 <p className="text-xs text-slate-400">Extra Charge per Kg</p>
                                 <p className="text-lg font-bold text-white">
                                   ₹{flight.baggageRules.extraChargePerKg}
                                 </p>
                               </div>
                               {flight.baggageRules.maxExtraKg && (
                                 <div className="bg-slate-800/50 rounded-xl p-4">
                                   <p className="text-xs text-slate-400">Max Extra Allowed</p>
                                   <p className="text-lg font-bold text-white">
                                     {flight.baggageRules.maxExtraKg} kg
                                   </p>
                                 </div>
                               )}
                             </div>
                           </div>
     
                           {/* Flight Identifiers */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-slate-800/50 rounded-xl p-4">
                               <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Flight Number</p>
                               <p className="text-white font-medium">{flight.flightNumber}</p>
                             </div>
                             <div className="bg-slate-800/50 rounded-xl p-4">
                               <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Internal Flight ID</p>
                               <p className="text-white font-medium text-sm">{flight.flightId}</p>
                             </div>
                           </div>
                         </div>
                       )}
                       
                       <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                         <button
                           onClick={() => handleApproveFlight(flight._id)}
                           disabled={flightsLoading}
                           className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105 disabled:opacity-50"
                         >
                           <CheckCircle className="w-5 h-5" />
                           Approve Flight
                         </button>
                         <button
                           onClick={() => {
                             setRejectFlightId(flight._id);
                             setRejectReason("");
                           }}
                           disabled={flightsLoading}
                           className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105 disabled:opacity-50"
                         >
                           <XCircle className="w-5 h-5" />
                           Reject Flight
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>

      {/* Reject Modal */}
     {rejectFlightId && (
               <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                 <div className="bg-slate-900 rounded-2xl w-full max-w-md p-8 shadow-2xl border border-white/20">
                   <div className="flex items-center justify-between mb-6">
                     <h3 className="text-2xl font-bold text-white">Reject Flight</h3>
                     <button
                       onClick={() => {
                         setRejectFlightId(null);
                         setRejectReason("");
                       }}
                       className="p-2 hover:bg-white/10 rounded-lg"
                     >
                       <X className="w-6 h-6 text-slate-400" />
                     </button>
                   </div>
     
                   <p className="text-slate-300 mb-6">
                     Please provide a reason. This will be shown to the provider.
                   </p>
     
                   <textarea
                     value={rejectReason}
                     onChange={(e) => setRejectReason(e.target.value)}
                     placeholder="Enter rejection reason..."
                     className="w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 resize-none"
                     rows={5}
                   />
     
                   <div className="flex gap-4 mt-8">
                     <button
                       onClick={() => {
                         setRejectFlightId(null);
                         setRejectReason("");
                       }}
                       className="flex-1 py-3 border border-white/20 rounded-xl text-white hover:bg-white/10 font-medium"
                     >
                       Cancel
                     </button>
                     <button
                       onClick={() => {
                         handleRejectFlight(rejectFlightId, rejectReason);
                         setRejectFlightId(null);
                         setRejectReason("");
                       }}
                       disabled={!rejectReason.trim() || flightsLoading}
                       className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl disabled:opacity-50 shadow-lg hover:shadow-red-500/50"
                     >
                       Confirm Reject
                     </button>
                   </div>
                 </div>
               </div>
             )}
    </div>
    </AdminLayout>
  );
};

export default PendingFlight;