import React from 'react';
import { Plane, MapPin, Clock } from 'lucide-react';
import useFlightList from '../../hooks/provider/useFlightList';
import DeleteFlightModal from './DeleteFlightModal';
import FlightDetailModal from './FlightDetailModal';
import FlightSeatModal from './FlightSeatModal';
import Pagination from '../../layouts/Pagination';

const FlightList: React.FC = () => {
  const {
    flights,
    isLoading,
    error,
    pagination,
    currentPage,
    confirmDeleteId,
    selectedFlight,
    handleViewDetails,
    handleCloseDetails,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditClick,
    handlePageChange,
     flightSeats,
  isLoadingSeats,
  seatsError,
  selectedSeatFlightId,
  handleViewSeats,
  handleCloseSeats,
  } = useFlightList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-400/60 text-red-200 px-4 py-3 rounded-xl">
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

  return (
    <>
      {confirmDeleteId && (
        <DeleteFlightModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isLoading={isLoading}
        />
      )}
      {selectedFlight && (
        <FlightDetailModal
          flight={selectedFlight}
          onClose={handleCloseDetails}
        />
      )}
      {selectedSeatFlightId && (
     <FlightSeatModal
    flightSeats={flightSeats}
    isLoading={isLoadingSeats}
    error={seatsError}
    onClose={handleCloseSeats}
       />
       )}

      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Total flights: <span className="font-semibold text-white">{flights.length}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {flights.map((flight) => (
            <div
              key={flight._id}
              className={`bg-white/5 border rounded-2xl p-5 shadow-lg shadow-black/30 transition duration-150 flex flex-col justify-between ${
                flight.adminApproval.status === 'rejected'
                  ? 'border-red-400/30 hover:border-red-400/60'
                  : 'border-white/10 hover:border-blue-400/60 hover:shadow-blue-500/20'
              }`}
            >
              {/* Title */}
              <div className="mb-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">{flight.flightNumber}</h3>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-slate-900/60 text-slate-200 uppercase tracking-wide">
                    {flight.flightStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{flight.aircraftName}</p>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-xs text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> From
                  </span>
                  <span className="font-medium max-w-[60%] text-right truncate">
                    {flight.departureDestination?.name || '—'} ({flight.departureDestination?.iataCode || 'N/A'})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> To
                  </span>
                  <span className="font-medium max-w-[60%] text-right truncate">
                    {flight.arrivalDestination?.name || '—'} ({flight.arrivalDestination?.iataCode || 'N/A'})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Departure
                  </span>
                  <span className="font-medium">
                    {new Date(flight.departureTime).toLocaleString('en-IN', {
                      day: '2-digit', month: 'short',
                      hour: '2-digit', minute: '2-digit', hour12: true,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-medium">{flight.durationMinutes} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Economy fare</span>
                  <span className="font-medium">₹{flight.baseFare.economy.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <span className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${
                  flight.adminApproval.status === 'approved'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40'
                    : flight.adminApproval.status === 'rejected'
                    ? 'bg-red-500/15 text-red-300 border-red-400/40'
                    : 'bg-amber-500/15 text-amber-300 border-amber-400/40'
                }`}>
                  {flight.adminApproval.status}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDetails(flight)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-400/30 hover:bg-slate-500/30 transition font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleViewSeats(flight._id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 hover:bg-indigo-500/30 transition font-medium"
                    >
                    Seats
                   </button>
                  <button
                    onClick={() => handleEditClick(flight._id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(flight._id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages ?? 1}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default FlightList;