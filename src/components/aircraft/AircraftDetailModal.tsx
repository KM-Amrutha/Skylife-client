import React from 'react';
import { Aircraft } from '../../redux/aircraft/aircraftTypes';

interface AircraftDetailModalProps {
  aircraft: Aircraft;
  onClose: () => void;
}

const AircraftDetailModal: React.FC<AircraftDetailModalProps> = ({ aircraft, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-xl max-h-[85vh] flex flex-col">
        
        {/* Header Row */}
        <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50 rounded-t-2xl">
          <div className="min-w-0">
            <h3 className="text-gray-900 text-xl font-bold tracking-tight">{aircraft.aircraftName}</h3>
            <p className="text-gray-500 text-xs font-medium mt-1">
              {aircraft.aircraftType} <span className="text-gray-300 mx-1">•</span> {aircraft.manufacturer}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <span className="text-sm font-semibold">✕</span>
          </button>
        </div>

        {/* Workspace Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Status Badge Block */}
          <div>
            <span className={
              'inline-flex px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ' +
              (aircraft.status === 'active'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : aircraft.status === 'maintenance'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-gray-100 text-gray-600 border-gray-200')
            }>
              {aircraft.status}
            </span>
          </div>

          {/* Grid Layout Container */}
          <div className="space-y-5">
            
            {/* Section: Aircraft Info */}
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2.5 border-b border-gray-100 pb-1.5">
                Aircraft Info
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Build Year</p>
                  <p className="text-gray-900 font-bold mt-0.5">{aircraft.buildYear}</p>
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Seat Capacity</p>
                  <p className="text-gray-900 font-bold mt-0.5">{aircraft.seatCapacity}</p>
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Flying Range</p>
                  <p className="text-gray-900 font-bold mt-0.5">{aircraft.flyingRangeKm} km</p>
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Engine Count</p>
                  <p className="text-gray-900 font-bold mt-0.5">{aircraft.engineCount}</p>
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Lavatory Count</p>
                  <p className="text-gray-900 font-bold mt-0.5">{aircraft.lavatoryCount}</p>
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Available From</p>
                  <p className="text-gray-800 text-xs font-semibold mt-0.5">
                    {new Date(aircraft.availableFrom).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Location Info */}
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2.5 border-b border-gray-100 pb-1.5">
                Location Info
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Base Station</p>
                  <p className="text-gray-900 font-bold mt-0.5 truncate">{aircraft.baseStation?.name || '—'}</p>
                  {aircraft.baseStation?.city && (
                    <p className="text-gray-500 text-xs mt-0.5 font-medium">{aircraft.baseStation.city}</p>
                  )}
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Current Location</p>
                  <p className="text-gray-900 font-bold mt-0.5 truncate">{aircraft.currentLocation?.name || '—'}</p>
                  {aircraft.currentLocation?.city && (
                    <p className="text-gray-500 text-xs mt-0.5 font-medium">{aircraft.currentLocation.city}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Timestamps */}
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2.5 border-b border-gray-100 pb-1.5">
                Timestamps
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Created At</p>
                  <p className="text-gray-700 text-xs font-semibold mt-0.5">
                    {new Date(aircraft.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Last Updated</p>
                  <p className="text-gray-700 text-xs font-semibold mt-0.5">
                    {new Date(aircraft.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition shadow-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default AircraftDetailModal;