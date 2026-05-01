import React from 'react';
import { Aircraft } from '../../redux/aircraft/aircraftTypes';

interface AircraftDetailModalProps {
  aircraft: Aircraft;
  onClose: () => void;
}

const AircraftDetailModal: React.FC<AircraftDetailModalProps> = ({ aircraft, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-[#00001F] border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-white text-2xl font-bold">{aircraft.aircraftName}</h3>
            <p className="text-slate-400 text-sm mt-1">{aircraft.aircraftType} • {aircraft.manufacturer}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition text-xl font-bold ml-4"
          >
            ✕
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={
            'px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ' +
            (aircraft.status === 'active'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/40'
              : aircraft.status === 'maintenance'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-400/40'
              : 'bg-slate-500/20 text-slate-200 border border-slate-400/40')
          }>
            {aircraft.status}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          
          {/* Aircraft Info */}
          <div className="col-span-2">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3 border-b border-white/10 pb-2">
              Aircraft Info
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Build Year</p>
            <p className="text-white font-medium">{aircraft.buildYear}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Seat Capacity</p>
            <p className="text-white font-medium">{aircraft.seatCapacity}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Flying Range</p>
            <p className="text-white font-medium">{aircraft.flyingRangeKm} km</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Engine Count</p>
            <p className="text-white font-medium">{aircraft.engineCount}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Lavatory Count</p>
            <p className="text-white font-medium">{aircraft.lavatoryCount}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Available From</p>
            <p className="text-white font-medium">
              {new Date(aircraft.availableFrom).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>

          {/* Location Info */}
          <div className="col-span-2 mt-2">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3 border-b border-white/10 pb-2">
              Location Info
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Base Station</p>
            <p className="text-white font-medium">{aircraft.baseStation?.name || '—'}</p>
            {aircraft.baseStation?.city && (
              <p className="text-slate-400 text-xs mt-1">{aircraft.baseStation.city}</p>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Current Location</p>
            <p className="text-white font-medium">{aircraft.currentLocation?.name || '—'}</p>
            {aircraft.currentLocation?.city && (
              <p className="text-slate-400 text-xs mt-1">{aircraft.currentLocation.city}</p>
            )}
          </div>

          {/* Timestamps */}
          <div className="col-span-2 mt-2">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3 border-b border-white/10 pb-2">
              Timestamps
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Created At</p>
            <p className="text-white font-medium">
              {new Date(aircraft.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">Last Updated</p>
            <p className="text-white font-medium">
              {new Date(aircraft.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>

        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AircraftDetailModal;