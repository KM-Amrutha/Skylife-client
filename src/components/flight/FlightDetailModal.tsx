import React from 'react';
import { FlightDetails } from '../../redux/flight/flightTypes';
import { Plane, Clock, MapPin, Tag } from 'lucide-react';
import { createPortal } from 'react-dom';

interface FlightDetailModalProps {
  flight: FlightDetails;
  onClose: () => void;
}

const FlightDetailModal: React.FC<FlightDetailModalProps> = ({ flight, onClose }) => {
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });

  return createPortal(
    
      
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-4 overflow-y-auto">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
        <div className="relative z-10 bg-[#0a1628] border border-white/20 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header — always visible */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Plane className="w-6 h-6 text-blue-300" />
            <div>
              <h2 className="text-white text-xl font-bold">{flight.flightNumber}</h2>
              <p className="text-slate-400 text-sm">{flight.aircraftName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition text-xl font-bold ml-4"
          >
            ✕
          </button>
        </div>

        {/* Body — scrolls independently */}
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto">

          {/* Status badges */}
          <div className="flex gap-3 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${
              flight.adminApproval.status === 'approved'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40'
                : flight.adminApproval.status === 'rejected'
                ? 'bg-red-500/15 text-red-300 border-red-400/40'
                : 'bg-amber-500/15 text-amber-300 border-amber-400/40'
            }`}>
              {flight.adminApproval.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${
              flight.flightStatus === 'scheduled'
                ? 'bg-blue-500/15 text-blue-300 border-blue-400/40'
                : flight.flightStatus === 'completed'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40'
                : 'bg-slate-500/20 text-slate-300 border-slate-400/40'
            }`}>
              {flight.flightStatus}
            </span>
          </div>

          {/* Route */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-xs uppercase tracking-wider">Route</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-lg">{flight.departureDestination?.iataCode || 'N/A'}</p>
                <p className="text-slate-400 text-xs">{flight.departureDestination?.name || '—'}</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-white/20" />
                <Plane className="w-4 h-4 text-blue-300" />
                <div className="flex-1 h-px bg-white/20" />
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">{flight.arrivalDestination?.iataCode || 'N/A'}</p>
                <p className="text-slate-400 text-xs">{flight.arrivalDestination?.name || '—'}</p>
              </div>
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-xs uppercase tracking-wider">Departure</span>
              </div>
              <p className="text-white text-sm font-medium">{formatTime(flight.departureTime)}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-xs uppercase tracking-wider">Arrival</span>
              </div>
              <p className="text-white text-sm font-medium">{formatTime(flight.arrivalTime)}</p>
            </div>
          </div>

          {/* Buffer Time */}
          <div className="grid grid-cols-2 gap-4">
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Clock className="w-4 h-4 text-slate-400" />
      <span className="text-slate-400 text-xs uppercase tracking-wider">Duration</span>
    </div>
    <p className="text-white text-sm font-medium">{flight.durationMinutes} min</p>
  </div>
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Clock className="w-4 h-4 text-slate-400" />
      <span className="text-slate-400 text-xs uppercase tracking-wider">Buffer</span>
    </div>
    <p className="text-white text-sm font-medium">{flight.bufferMinutes ?? '—'} min</p>
  </div>
</div>

          {/* Fares */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-xs uppercase tracking-wider">Base Fares</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {flight.baseFare.economy > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Economy</span>
                  <span className="text-white font-medium">₹{flight.baseFare.economy.toLocaleString('en-IN')}</span>
                </div>
              )}
              {flight.baseFare.premium_economy != null && flight.baseFare.premium_economy > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Prem. Economy</span>
                  <span className="text-white font-medium">₹{flight.baseFare.premium_economy.toLocaleString('en-IN')}</span>
                </div>
              )}
              {flight.baseFare.business != null && flight.baseFare.business > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Business</span>
                  <span className="text-white font-medium">₹{flight.baseFare.business.toLocaleString('en-IN')}</span>
                </div>
              )}
              {flight.baseFare.first != null && flight.baseFare.first > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">First</span>
                  <span className="text-white font-medium">₹{flight.baseFare.first.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Baggage */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <span className="text-slate-400 text-xs uppercase tracking-wider">Baggage Rules</span>
            <div className="grid grid-cols-3 gap-3 text-sm mt-3">
              <div className="flex flex-col">
                <span className="text-slate-400">Free cabin</span>
                <span className="text-white font-medium">{flight.baggageRules?.freeCabinKg ?? '—'} kg</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400">Extra/kg</span>
                <span className="text-white font-medium">₹{flight.baggageRules?.extraChargePerKg ?? '—'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400">Max extra</span>
                <span className="text-white font-medium">{flight.baggageRules?.maxExtraKg ?? '—'} kg</span>
              </div>
            </div>
          </div>

          {/* Rejection reason */}
          {flight.adminApproval.reason && (
            <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4">
              <p className="text-red-300 text-xs uppercase tracking-wider mb-2">Rejection Reason</p>
              <p className="text-slate-200 text-sm italic">"{flight.adminApproval.reason}"</p>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition"
          >
            Close
          </button>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default FlightDetailModal;