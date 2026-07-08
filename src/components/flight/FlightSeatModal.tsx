import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FlightSeatDTO, FlightSeatMapDTO } from '../../redux/flight/flightTypes';

interface FlightSeatModalProps {
  flightSeats: FlightSeatMapDTO[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

interface TooltipState {
  seat: FlightSeatDTO;
  x: number;
  y: number;
}

const CABIN_ORDER = ['first', 'business', 'premium_economy', 'economy'];

const CABIN_LABELS: Record<string, string> = {
  first: 'First Class',
  business: 'Business',
  premium_economy: 'Premium Economy',
  economy: 'Economy',
};

const CABIN_COLORS: Record<string, string> = {
  first:           'bg-amber-400 border-amber-300 text-amber-900',
  business:        'bg-purple-500 border-purple-300 text-white',
  premium_economy: 'bg-blue-500 border-blue-300 text-white',
  economy:         'bg-slate-500 border-slate-300 text-white',
};

const CABIN_LABEL_COLOR: Record<string, string> = {
  first:           'text-amber-500',
  business:        'text-purple-500',
  premium_economy: 'text-blue-500',
  economy:         'text-slate-500',
};

const getSeatColor = (seat: FlightSeatDTO, cabinClass: string): string => {
  if (seat.isBooked)  return 'bg-red-500 border-red-400 text-white cursor-not-allowed opacity-80';
  if (seat.isLocked)  return 'bg-amber-500 border-amber-400 text-white cursor-not-allowed opacity-80';
  if (seat.isBlocked) return 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed opacity-60';
  return CABIN_COLORS[cabinClass] ?? 'bg-slate-500 border-slate-300 text-white';
};

const getSeatStatus = (seat: FlightSeatDTO): string => {
  if (seat.isBooked)  return 'Booked';
  if (seat.isLocked)  return 'Locked';
  if (seat.isBlocked) return 'Blocked';
  return 'Available';
};

const FlightSeatModal: React.FC<FlightSeatModalProps> = ({ flightSeats, isLoading, error, onClose }) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const sortedCabins = [...flightSeats].sort(
    (a, b) => CABIN_ORDER.indexOf(a.cabinClass) - CABIN_ORDER.indexOf(b.cabinClass)
  );

  const surcharge = flightSeats[0]?.seatSurcharge;

  const renderCabinGrid = (cabinData: FlightSeatMapDTO) => {
    const { seats, cabinClass } = cabinData;

    const rowMap: Record<number, FlightSeatDTO[]> = {};
    seats.forEach((seat) => {
      if (!rowMap[seat.rowNumber]) rowMap[seat.rowNumber] = [];
      rowMap[seat.rowNumber]!.push(seat);
    });

    const sortedRows = Object.keys(rowMap).map(Number).sort((a, b) => a - b);
    const allColumns = Array.from(new Set(seats.map((s) => s.columnPosition))).sort();

    const colPositionMap: Record<string, string> = {};
    seats.forEach((s) => { colPositionMap[s.columnPosition] = s.position; });

    const aisleAfter = new Set<string>();
    for (let i = 0; i < allColumns.length - 1; i++) {
      const currCol = allColumns[i]!;
      const nextCol = allColumns[i + 1]!;
      if (
        colPositionMap[currCol] === 'aisle' &&
        colPositionMap[nextCol] === 'aisle'
      ) {
        aisleAfter.add(currCol);
      }
    }
    const overwingRows = new Set(
      seats.filter((s) => s.section === 'overwing').map((s) => s.rowNumber)
    );

    return (
      <div className="flex flex-col items-center gap-1">
        {/* Cabin label */}
        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${CABIN_LABEL_COLOR[cabinClass] ?? 'text-slate-400'}`}>
          {CABIN_LABELS[cabinClass] ?? cabinClass}
        </div>

        {/* Column headers */}
        <div className="flex items-center gap-1">
          <div className="w-7" />
          {allColumns.map((col) => (
            <React.Fragment key={col}>
              <div className="w-7 text-center text-[10px] text-slate-500 font-semibold">{col}</div>
              {aisleAfter.has(col) && <div className="w-8 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        {/* Rows */}
        {sortedRows.map((rowNum) => {
          const rowSeats = rowMap[rowNum]!;
          const seatByCol: Record<string, FlightSeatDTO> = {};
          rowSeats.forEach((s) => { seatByCol[s.columnPosition] = s; });
          const isOverwing = overwingRows.has(rowNum);

          return (
            <div key={rowNum} className="flex items-center gap-1">
              <div className="w-7 text-right text-[10px] text-slate-600 pr-1 font-mono">{rowNum}</div>
              {allColumns.map((col) => {
                const seat = seatByCol[col];
                return (
                  <React.Fragment key={col}>
                    {seat ? (
                      <div
                        className={`w-7 h-7 rounded-md border-2 text-[9px] font-bold flex items-center justify-center cursor-pointer transition-all duration-150 hover:scale-110 hover:z-10 relative ${getSeatColor(seat, cabinClass)} ${isOverwing ? 'ring-1 ring-cyan-400/50' : ''}`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({ seat, x: rect.left, y: rect.top });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        {col}
                      </div>
                    ) : (
                      <div className="w-7 h-7" />
                    )}
                    {aisleAfter.has(col) && (
                      <div className="w-8 flex-shrink-0 flex items-center justify-center">
                        <div className="w-px h-6 bg-slate-500/60" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Outer wrapper */}
      <div className="relative z-10 flex flex-col items-center my-auto drop-shadow-xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-slate-700 border border-white/20 text-white hover:bg-slate-600 transition flex items-center justify-center text-sm font-bold"
        >
          ✕
        </button>

        {/* Cockpit triangle */}
        <div
          style={{
            width: '100%',
            height: '50px',
            background: '#ffffff',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          }}
        />

        {/* Main fuselage */}
        <div
          style={{ background: '#ffffff', borderLeft: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}
          className="px-6 py-4 flex flex-col items-center gap-1 w-auto"
        >
          {/* Modal title + surcharge + legend */}
          <div className="flex flex-col items-center gap-2 mb-4 w-full">
            
            <h2 className="text-[#00001F] text-base font-bold tracking-wide">Seat Map</h2>

            {surcharge && (
              <div className="flex gap-3 text-[10px] text-slate-500 flex-wrap justify-center">
                {surcharge.window      && <span>Window <span className="text-blue-600 font-bold">+₹{surcharge.window}</span></span>}
                {surcharge.aisle       && <span>Aisle <span className="text-blue-600 font-bold">+₹{surcharge.aisle}</span></span>}
                {surcharge.extraLegroom && <span>Extra legroom <span className="text-blue-600 font-bold">+₹{surcharge.extraLegroom}</span></span>}
              </div>
            )}

            <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
              {[
                { label: 'First',         color: 'bg-amber-400' },
                { label: 'Business',      color: 'bg-purple-500' },
                { label: 'Prem. Economy', color: 'bg-blue-500' },
                { label: 'Economy',       color: 'bg-slate-500' },
                { label: 'Booked',        color: 'bg-red-500' },
                { label: 'Locked',        color: 'bg-amber-500' },
                { label: 'Blocked',       color: 'bg-gray-700' },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                  <span className="text-[10px] text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center h-32 w-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800" />
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs">
              {error}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && flightSeats.length === 0 && (
            <p className="text-slate-400 text-xs text-center py-8">No seats found.</p>
          )}

          {/* Cabin sections */}
          {!isLoading && !error && sortedCabins.map((cabin, index) => (
            <div key={cabin.cabinClass} className="flex flex-col items-center w-full">
              {index > 0 && (
                <div className="w-full flex items-center gap-2 my-3">
                  <div className="flex-1 h-px bg-slate-200" />
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              )}
              {renderCabinGrid(cabin)}
            </div>
          ))}
        </div>

        {/* Fuels + Amenities */}
        <div
          style={{ background: '#ffffff', borderLeft: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)', borderTop: '1px solid rgba(0,0,0,0.05)' }}
          className="w-full flex border-b border-slate-100"
        >
          <div className="flex-1 py-3 flex items-center justify-center" style={{ borderRight: '1px solid rgba(0,0,0,0.05)' }}>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Fuels</span>
          </div>
          <div className="flex-1 py-3 flex items-center justify-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Amenities</span>
          </div>
        </div>

        {/* Tail */}
        <div
          style={{
            width: '100%',
            height: '50px',
            background: '#ffffff',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
          }}
        />

      </div>

      {/* Attractive Light-Theme Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] bg-white border border-slate-200 rounded-xl p-3.5 shadow-xl text-xs text-slate-700 min-w-[190px] pointer-events-none animate-in fade-in duration-150"
          style={{ top: tooltip.y - 10, left: tooltip.x + 36 }}
        >
          <p className="font-extrabold text-slate-900 text-sm mb-1.5 border-b border-slate-100 pb-1">{tooltip.seat.seatNumber}</p>
          <div className="space-y-1 font-medium">
            <p className="text-slate-400">Cabin: <span className="text-slate-800">{CABIN_LABELS[tooltip.seat.cabinClass] ?? tooltip.seat.cabinClass}</span></p>
            <p className="text-slate-400">Position: <span className="text-slate-800 capitalize">{tooltip.seat.position}</span></p>
            <p className="text-slate-400">Section: <span className="text-slate-800 capitalize">{tooltip.seat.section}</span></p>
            <p className="text-slate-400">Status: <span className={`font-bold ${
              tooltip.seat.isBooked  ? 'text-red-500'   :
              tooltip.seat.isLocked  ? 'text-amber-500' :
              tooltip.seat.isBlocked ? 'text-gray-500'  : 'text-emerald-600'
            }`}>{getSeatStatus(tooltip.seat)}</span></p>
            {tooltip.seat.isExitRow && <p className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">⚠ Exit Row</p>}
            <p className="text-slate-400 border-t border-slate-100 pt-1.5 mt-1.5">Fare: <span className="text-slate-900 font-extrabold text-sm">₹{tooltip.seat.fare.toLocaleString('en-IN')}</span></p>
            {tooltip.seat.features.length > 0 && (
              <p className="text-slate-400">Features: <span className="text-slate-800">{tooltip.seat.features.join(', ')}</span></p>
            )}
            {tooltip.seat.lockedUntil && (
              <p className="text-slate-400 text-[10px]">Locked until: <span className="text-amber-600 font-mono">{new Date(tooltip.seat.lockedUntil).toLocaleTimeString()}</span></p>
            )}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default FlightSeatModal;