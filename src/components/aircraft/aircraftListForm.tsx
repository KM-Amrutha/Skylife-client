import React from 'react';
import useAircraftList from '../../hooks/provider/useAircraftList';
import DeleteConfirmModal from './DeleteAircraftModal';
import AircraftDetailModal from './AircraftDetailModal';
import Pagination from '../../layouts/Pagination';

const AircraftList: React.FC = () => {
  const {
    aircrafts,
    isLoading,
    error,
    pagination,
    currentPage,
    confirmDeleteId,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditClick,
    handlePageChange,
     selectedAircraft,
  handleViewDetails,
  handleCloseDetails,
  } = useAircraftList();

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
        <p className="text-sm font-medium">Error loading aircrafts</p>
        <p className="text-xs mt-1">{error}</p>
      </div>
    );
  }

  if (aircrafts.length === 0) {
    return (
      <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
        <p className="text-slate-100 text-base mb-2">No aircrafts added yet</p>
        <p className="text-slate-400 text-sm">
          Add your first aircraft to start scheduling flights
        </p>
      </div>
    );
  }

  return (
    <>
      {confirmDeleteId && (
        <DeleteConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isLoading={isLoading}
        />
      )}
      {selectedAircraft && (
  <AircraftDetailModal
    aircraft={selectedAircraft}
    onClose={handleCloseDetails}
     />
       )}

      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Total aircrafts:{' '}
          <span className="font-semibold text-white">{aircrafts.length}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {aircrafts.map((aircraft) => (
            <div
              key={aircraft._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg shadow-black/30 hover:border-blue-400/60 hover:shadow-blue-500/20 transition duration-150 flex flex-col justify-between"
            >
              {/* Title */}
              <div className="mb-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {aircraft.aircraftName}
                  </h3>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-slate-900/60 text-slate-200 uppercase tracking-wide">
                    {aircraft.aircraftType}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {aircraft.manufacturer} • {aircraft.buildYear}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-xs text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Seat capacity</span>
                  <span className="font-medium">{aircraft.seatCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flying range</span>
                  <span className="font-medium">{aircraft.flyingRangeKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Engines</span>
                  <span className="font-medium">{aircraft.engineCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lavatories</span>
                  <span className="font-medium">{aircraft.lavatoryCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Base station</span>
                  <span className="font-medium max-w-[60%] text-right truncate">
                    {aircraft.baseStation?.name || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current location</span>
                  <span className="font-medium max-w-[60%] text-right truncate">
                    {aircraft.currentLocation?.name || '—'}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <span
                  className={
                    'px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ' +
                    (aircraft.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/40'
                      : aircraft.status === 'maintenance'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-400/40'
                      : 'bg-slate-500/20 text-slate-200 border border-slate-400/40')
                  }
                >
                  {aircraft.status}
                </span>

                <div className="flex items-center gap-2">
                  <button
                   onClick={() => handleViewDetails(aircraft)}
                   className="text-xs px-3 py-1.5 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-400/30 hover:bg-slate-500/30 transition font-medium"
                    >
                        View
                    </button>
                  <button
                    onClick={() => handleEditClick(aircraft._id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition font-medium"
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleDeleteClick(aircraft._id)}
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

export default AircraftList;