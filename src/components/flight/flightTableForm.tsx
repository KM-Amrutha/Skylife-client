import React from "react";
import { useNavigate } from "react-router-dom";
import useFlights from "../../hooks/useFlight";
import { Plane, Clock, MapPin, XCircle } from "lucide-react";

const ProviderFlightsTable: React.FC = () => {
  const { flights, isLoading, error } = useFlights();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-400/60 text-red-200 px-6 py-4 rounded-xl">
        <p className="text-sm font-medium">Error loading flights</p>
        <p className="text-xs mt-1">{error}</p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
        <Plane className="w-16 h-16 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-100 text-base mb-2">No flights scheduled yet</p>
        <p className="text-slate-400 text-sm">Schedule your first flight to get started</p>
      </div>
    );
  }

  // Separate rejected flights
  const rejectedFlights = flights.filter(f => f.adminApproval.status === 'rejected');
  const otherFlights = flights.filter(f => f.adminApproval.status !== 'rejected');

  return (
    <div className="px-8 py-6">
      <h2 className="text-white text-3xl font-bold mb-8">My Flights</h2>

      {/* Rejected Flights Section */}
      {rejectedFlights.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-red-300 mb-6">Rejected Flights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rejectedFlights.map((flight) => (
              <div
                key={flight._id}
                className="bg-white/5 border border-red-400/30 rounded-2xl p-6 shadow-lg shadow-black/30 hover:border-red-400/60 transition duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Plane className="w-10 h-10 text-red-300" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{flight.flightNumber}</h3>
                    <p className="text-sm text-slate-300">{flight.aircraftName}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <p className="text-slate-200">
                      {/* {flight.departureDestinationId} → {flight.arrivalDestinationId} */}
                      {flight.departureDestination?.name || flight.departureDestinationId} 
                      ({flight.departureDestination?.iataCode || 'N/A'}) 
                          → 
                       {flight.arrivalDestination?.name || flight.arrivalDestinationId} 
                        ({flight.arrivalDestination?.iataCode || 'N/A'})
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <p className="text-slate-200">
                      {new Date(flight.departureTime).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Rejection Reason */}
                {flight.adminApproval.reason && (
                  <div className="bg-red-900/30 border border-red-500/40 p-4 rounded-xl mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5 text-red-300" />
                      <h4 className="font-semibold text-red-300">Rejection Reason</h4>
                    </div>
                    <p className="text-sm text-slate-200 italic">
                      "{flight.adminApproval.reason}"
                    </p>
                  </div>
                )}

                {/* Button: Reschedule */}
                <button
                  onClick={() => navigate(`/provider/update-flights/${flight._id}`)}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-500/50 hover:scale-105"
                >
                  Reschedule Flight
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending + Approved Flights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherFlights.map((flight) => (
          <div
            key={flight._id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg shadow-black/30 hover:border-blue-400/60 hover:shadow-blue-500/20 transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <Plane className="w-10 h-10 text-blue-300" />
              <div>
                <h3 className="text-xl font-bold text-white">{flight.flightNumber}</h3>
                <p className="text-sm text-slate-300">{flight.aircraftName}</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <p className="text-slate-200">
                  {/* {flight.departureDestinationId} → {flight.arrivalDestinationId} */}
                  {flight.departureDestination?.name || flight.departureDestinationId} 
({flight.departureDestination?.iataCode || 'N/A'}) 
→ 
{flight.arrivalDestination?.name || flight.arrivalDestinationId} 
({flight.arrivalDestination?.iataCode || 'N/A'})
                 
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-400" />
                <p className="text-slate-200">
                  {new Date(flight.departureTime).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  flight.adminApproval.status === 'approved'
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {flight.adminApproval.status}
                </span>
              </div>
            </div>

            <div className="text-sm text-slate-400 mb-4">
              Duration: {flight.durationMinutes} min
            </div>

            {/* Button based on status */}
            {flight.adminApproval.status === 'approved' ? (
              <button
                onClick={() => navigate(`/provider/update-flights/${flight._id}`)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              >
                Edit Flight
              </button>
            ) : (
              <span className="block text-center text-yellow-300 italic text-sm">
                Awaiting admin approval...
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderFlightsTable;