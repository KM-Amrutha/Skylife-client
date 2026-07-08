import React from 'react';
import { Plane, MapPin, Clock, Hash, Calendar, Layers, Eye, Edit3, Trash2 } from 'lucide-react';
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
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl my-4 mx-4 sm:mx-8">
        <p className="text-sm font-bold">Error loading flights</p>
        <p className="text-xs mt-1 opacity-90">{error}</p>
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-xs my-4 mx-4 sm:mx-8">
        <Plane className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-800 text-base font-semibold mb-1">
          No flights scheduled yet
        </p>
        <p className="text-gray-500 text-sm">
          Schedule your first flight to get started
        </p>
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

      <div className="space-y-6">
        {/* Blue Banner Header Block */}
        <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
              <Plane className="w-8 h-8 text-[#0a3a8a]" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold">Flight List</h1>
              <p className="text-blue-200 text-sm mt-1">
                Manage scheduling details and flight operations for your fleet
              </p>
            </div>
            {!isLoading && flights.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold text-white">
                  {flights.length} flights
                </div>
                <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold text-white">
                  {pagination?.totalPages ?? 1} pages
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Constrained Grid Layout to match exact booking list width */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className={`rounded-2xl border shadow-xs bg-white hover:border-gray-300 transition duration-200 flex flex-col justify-between ${
                  flight.adminApproval.status === 'rejected'
                    ? 'border-red-200 hover:border-red-300'
                    : 'border-gray-200'
                }`}
              >
                <div className="p-5 flex-1">
                  {/* Profile Header Style */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs shrink-0">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <h3 className="text-gray-900 font-bold text-base truncate">
                          {flight.flightNumber}
                        </h3>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600 uppercase tracking-wider border border-gray-200 whitespace-nowrap">
                          {flight.flightStatus}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs truncate mt-0.5">{flight.aircraftName}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-3" />

                  {/* Info Grid Style */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100 col-span-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">From</p>
                      </div>
                      <p className="text-gray-800 text-xs font-semibold truncate">
                        {flight.departureDestination?.name || '—'} ({flight.departureDestination?.iataCode || 'N/A'})
                      </p>
                    </div>

                    <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100 col-span-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">To</p>
                      </div>
                      <p className="text-gray-800 text-xs font-semibold truncate">
                        {flight.arrivalDestination?.name || '—'} ({flight.arrivalDestination?.iataCode || 'N/A'})
                      </p>
                    </div>

                    <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100 col-span-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Departure</p>
                      </div>
                      <p className="text-gray-800 text-xs font-semibold">
                        {new Date(flight.departureTime).toLocaleString('en-IN', {
                          day: '2-digit', month: 'short',
                          hour: '2-digit', minute: '2-digit', hour12: true,
                        })}
                      </p>
                    </div>

                    <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Duration</p>
                      </div>
                      <p className="text-gray-800 text-xs font-semibold truncate">{flight.durationMinutes} min</p>
                    </div>

                    <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Hash className="w-3 h-3 text-gray-400" />
                        <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Economy fare</p>
                      </div>
                      <p className="text-gray-800 text-xs font-semibold truncate">₹{flight.baseFare.economy.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                {/* Actions Block */}
                <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex items-center justify-between gap-2">
                  <span
                    className={
                      'px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ' +
                      (flight.adminApproval.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : flight.adminApproval.status === 'rejected'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200')
                    }
                  >
                    {flight.adminApproval.status}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleViewDetails(flight)}
                      className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition shadow-xs"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleViewSeats(flight.id)}
                      className="p-2 rounded-xl bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition shadow-xs"
                      title="View Seats"
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEditClick(flight.id)}
                      className="p-2 rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition shadow-xs"
                      title="Edit Flight"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(flight.id)}
                      className="p-2 rounded-xl bg-white border border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 transition shadow-xs"
                      title="Delete Flight"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Pagination Footer Element inside structural bounds */}
          {pagination && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages ?? 1}
                isLoading={isLoading}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightList;