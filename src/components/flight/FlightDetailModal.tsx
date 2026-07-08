import React from 'react';
import { FlightDetails } from '../../redux/flight/flightTypes';
import { Plane, Clock, MapPin, Tag, Luggage, X } from 'lucide-react';
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

  const sectionLabelClass = "text-gray-400 text-[11px] font-bold uppercase tracking-wider block mb-1";
  const itemCardClass = "bg-gray-50 border border-gray-200 rounded-xl p-4";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 bg-white border border-gray-200 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden my-auto text-gray-900">
        
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a3a8a]">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-gray-900 text-lg font-bold leading-tight">{flight.flightNumber}</h2>
              <p className="text-gray-500 text-xs font-medium">{flight.aircraftName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Section (Scollable) */}
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">

          {/* Status Badges */}
          <div className="flex gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
              flight.adminApproval.status === 'approved'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : flight.adminApproval.status === 'rejected'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}>
              Approval: {flight.adminApproval.status}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
              flight.flightStatus === 'scheduled'
                ? 'bg-blue-50 border-blue-200 text-[#0a3a8a]'
                : flight.flightStatus === 'completed'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}>
              Status: {flight.flightStatus}
            </span>
          </div>

          {/* Route Card */}
          <div className={itemCardClass}>
            <div className="flex items-center gap-1.5 mb-2 text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span className={sectionLabelClass}>Route Details</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="max-w-[40%]">
                <p className="text-gray-900 font-extrabold text-xl tracking-tight">{flight.departureDestination?.iataCode || 'N/A'}</p>
                <p className="text-gray-500 text-xs truncate mt-0.5">{flight.departureDestination?.name || '—'}</p>
              </div>
              <div className="flex-1 flex items-center gap-2 px-2">
                <div className="flex-1 h-px bg-gray-300" />
                <Plane className="w-3.5 h-3.5 text-[#0a3a8a] transform rotate-90 sm:rotate-0" />
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              <div className="text-right max-w-[40%]">
                <p className="text-gray-900 font-extrabold text-xl tracking-tight">{flight.arrivalDestination?.iataCode || 'N/A'}</p>
                <p className="text-gray-500 text-xs truncate mt-0.5">{flight.arrivalDestination?.name || '—'}</p>
              </div>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={itemCardClass}>
              <div className="flex items-center gap-1.5 mb-1.5 text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span className={sectionLabelClass}>Departure Time</span>
              </div>
              <p className="text-gray-900 text-sm font-semibold">{formatTime(flight.departureTime)}</p>
            </div>
            <div className={itemCardClass}>
              <div className="flex items-center gap-1.5 mb-1.5 text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span className={sectionLabelClass}>Arrival Time</span>
              </div>
              <p className="text-gray-900 text-sm font-semibold">{formatTime(flight.arrivalTime)}</p>
            </div>
          </div>

          {/* Timing Parameters */}
          <div className="grid grid-cols-2 gap-4">
            <div className={itemCardClass}>
              <span className={sectionLabelClass}>Duration</span>
              <p className="text-gray-900 text-base font-bold">{flight.durationMinutes} <span className="text-xs font-normal text-gray-500">mins</span></p>
            </div>
            <div className={itemCardClass}>
              <span className={sectionLabelClass}>Buffer Time</span>
              <p className="text-gray-900 text-base font-bold">
                {flight.bufferMinutes ?? '—'} {flight.bufferMinutes != null && <span className="text-xs font-normal text-gray-500">mins</span>}
              </p>
            </div>
          </div>

          {/* Pricing Rules */}
          <div className={itemCardClass}>
            <div className="flex items-center gap-1.5 mb-3 text-gray-500">
              <Tag className="w-3.5 h-3.5" />
              <span className={sectionLabelClass}>Base Fares</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm border-t border-gray-100 pt-2.5">
              {flight.baseFare.economy > 0 && (
                <div className="flex justify-between py-0.5">
                  <span className="text-gray-600 font-medium">Economy</span>
                  <span className="text-gray-900 font-bold">₹{flight.baseFare.economy.toLocaleString('en-IN')}</span>
                </div>
              )}
              {flight.baseFare.premium_economy != null && flight.baseFare.premium_economy > 0 && (
                <div className="flex justify-between py-0.5">
                  <span className="text-gray-600 font-medium">Premium Economy</span>
                  <span className="text-gray-900 font-bold">₹{flight.baseFare.premium_economy.toLocaleString('en-IN')}</span>
                </div>
              )}
              {flight.baseFare.business != null && flight.baseFare.business > 0 && (
                <div className="flex justify-between py-0.5">
                  <span className="text-gray-600 font-medium">Business Class</span>
                  <span className="text-gray-900 font-bold">₹{flight.baseFare.business.toLocaleString('en-IN')}</span>
                </div>
              )}
              {flight.baseFare.first != null && flight.baseFare.first > 0 && (
                <div className="flex justify-between py-0.5">
                  <span className="text-gray-600 font-medium">First Class</span>
                  <span className="text-gray-900 font-bold">₹{flight.baseFare.first.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Baggage Rules */}
          <div className={itemCardClass}>
            <div className="flex items-center gap-1.5 mb-3 text-gray-500">
              <Luggage className="w-3.5 h-3.5" />
              <span className={sectionLabelClass}>Baggage Allowances</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-2.5">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-medium">Free Cabin Bag</span>
                <span className="text-gray-900 font-bold mt-0.5">{flight.baggageRules?.freeCabinKg ?? '—'} kg</span>
              </div>
              <div className="flex flex-col border-x border-gray-200">
                <span className="text-gray-500 text-[11px] font-medium">Extra Charge / kg</span>
                <span className="text-gray-900 font-bold mt-0.5">₹{flight.baggageRules?.extraChargePerKg ?? '—'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-medium">Max Limit</span>
                <span className="text-gray-900 font-bold mt-0.5">{flight.baggageRules?.maxExtraKg ?? '—'} kg</span>
              </div>
            </div>
          </div>

          {/* Rejection Notification Banner */}
          {flight.adminApproval.reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-800 text-[11px] font-bold uppercase tracking-wider mb-1">Rejection Reason</p>
              <p className="text-red-700 text-sm italic">"{flight.adminApproval.reason}"</p>
            </div>
          )}

          {/* Secondary Footer Close Option */}
          <button
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Close Summary
          </button>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default FlightDetailModal;