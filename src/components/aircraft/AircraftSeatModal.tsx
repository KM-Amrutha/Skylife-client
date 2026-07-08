import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AircraftSeatDTO } from "../../redux/seat/seatType";
import useAircraftSeats from "../../hooks/provider/useAircraftSeats";

interface Props {
  aircraftId: string;
  onClose: () => void;
}

const CABIN_ORDER = ["first", "business", "premium_economy", "economy"];
const CABIN_LABELS: Record<string, string> = {
  first: "First Class",
  business: "Business",
  premium_economy: "Premium Economy",
  economy: "Economy",
};
const CABIN_LABEL_COLOR: Record<string, string> = {
  first: "text-amber-500",
  business: "text-purple-500",
  premium_economy: "text-blue-500",
  economy: "text-slate-500",
};
const CABIN_COLORS: Record<string, string> = {
  first: "bg-amber-400 border-amber-300 text-amber-900",
  business: "bg-purple-500 border-purple-300 text-white",
  premium_economy: "bg-blue-500 border-blue-300 text-white",
  economy: "bg-slate-500 border-slate-300 text-white",
};

const getSeatColor = (seat: AircraftSeatDTO, cabinClass: string): string => {
  if (seat.isBlocked) return "bg-gray-700 border-gray-600 text-gray-400 cursor-pointer opacity-80";
  return `${CABIN_COLORS[cabinClass] ?? "bg-slate-500 border-slate-300 text-white"} cursor-pointer`;
};

const AircraftSeatModal: React.FC<Props> = ({ aircraftId, onClose }) => {
  const {
    seats,
    isLoading,
    error,
    isToggling,
    blockReasonInput,
    setBlockReasonInput,
    pendingSeatId,
    setPendingSeatId,
    handleToggleBlock,
  } = useAircraftSeats(aircraftId);

  const [tooltip, setTooltip] = useState<{ seat: AircraftSeatDTO; x: number; y: number } | null>(null);

  // group by cabin
  const grouped = seats.reduce((acc, seat) => {
    if (!acc[seat.cabinClass]) acc[seat.cabinClass] = [];
    acc[seat.cabinClass]!.push(seat);
    return acc;
  }, {} as Record<string, AircraftSeatDTO[]>);

  const sortedCabins = Object.keys(grouped).sort(
    (a, b) => CABIN_ORDER.indexOf(a) - CABIN_ORDER.indexOf(b)
  );

  const renderCabinGrid = (cabinClass: string, cabinSeats: AircraftSeatDTO[]) => {
    const rowMap: Record<number, AircraftSeatDTO[]> = {};
    cabinSeats.forEach((s) => {
      if (!rowMap[s.rowNumber]) rowMap[s.rowNumber] = [];
      rowMap[s.rowNumber]!.push(s);
    });

    const sortedRows = Object.keys(rowMap).map(Number).sort((a, b) => a - b);
    const allColumns = Array.from(new Set(cabinSeats.map((s) => s.columnPosition))).sort();

    const colPositionMap: Record<string, string> = {};
    cabinSeats.forEach((s) => { colPositionMap[s.columnPosition] = s.position; });

    const aisleAfter = new Set<string>();
    for (let i = 0; i < allColumns.length - 1; i++) {
      const curr = allColumns[i]!;
      const next = allColumns[i + 1]!;
      if (colPositionMap[curr] === "aisle" && colPositionMap[next] === "aisle") {
        aisleAfter.add(curr);
      }
    }

    return (
      <div className="flex flex-col items-center gap-1">
        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${CABIN_LABEL_COLOR[cabinClass] ?? "text-slate-400"}`}>
          {CABIN_LABELS[cabinClass] ?? cabinClass}
        </div>
        <div className="flex items-center gap-1">
          <div className="w-7" />
          {allColumns.map((col) => (
            <React.Fragment key={col}>
              <div className="w-7 text-center text-[10px] text-slate-500 font-semibold">{col}</div>
              {aisleAfter.has(col) && <div className="w-8 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
        {sortedRows.map((rowNum) => {
          const rowSeats = rowMap[rowNum]!;
          const seatByCol: Record<string, AircraftSeatDTO> = {};
          rowSeats.forEach((s) => { seatByCol[s.columnPosition] = s; });

          return (
            <div key={rowNum} className="flex items-center gap-1">
              <div className="w-7 text-right text-[10px] text-slate-600 pr-1 font-mono">{rowNum}</div>
              {allColumns.map((col) => {
                const seat = seatByCol[col];
                return (
                  <React.Fragment key={col}>
                    {seat ? (
                      <div
                        className={`w-7 h-7 rounded-md border-2 text-[9px] font-bold flex items-center justify-center transition-all duration-150 hover:scale-110 hover:z-10 relative ${getSeatColor(seat, cabinClass)}`}
                        onClick={() => setPendingSeatId(seat.id === pendingSeatId ? null : seat.id)}
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

  const pendingSeat = seats.find((s) => s.id === pendingSeatId);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex flex-col items-center my-auto drop-shadow-xl">

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-slate-700 border border-white/20 text-white hover:bg-slate-600 transition flex items-center justify-center text-sm font-bold"
        >✕</button>

        {/* Cockpit */}
        <div style={{ width: "100%", height: "50px", background: "#ffffff", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />

        {/* Fuselage */}
        <div
          style={{ background: "#ffffff", borderLeft: "1px solid rgba(0,0,0,0.08)", borderRight: "1px solid rgba(0,0,0,0.08)" }}
          className="px-6 py-4 flex flex-col items-center gap-1 w-auto"
        >
          <h2 className="text-[#00001F] text-base font-bold tracking-wide mb-2">Aircraft Seats</h2>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mb-4">
            {[
              { label: "First", color: "bg-amber-400" },
              { label: "Business", color: "bg-purple-500" },
              { label: "Prem. Economy", color: "bg-blue-500" },
              { label: "Economy", color: "bg-slate-500" },
              { label: "Blocked", color: "bg-gray-700" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1">
                <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                <span className="text-[10px] text-slate-500">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 mb-3">Click a seat to block / unblock it</p>

          {isLoading && (
            <div className="flex items-center justify-center h-32 w-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800" />
            </div>
          )}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs">{error}</div>
          )}
          {!isLoading && !error && seats.length === 0 && (
            <p className="text-slate-400 text-xs text-center py-8">No seats found.</p>
          )}

          {!isLoading && !error && sortedCabins.map((cabinClass, index) => (
            <div key={cabinClass} className="flex flex-col items-center w-full">
              {index > 0 && <div className="w-full flex items-center gap-2 my-3"><div className="flex-1 h-px bg-slate-200" /><div className="flex-1 h-px bg-slate-200" /></div>}
              {renderCabinGrid(cabinClass, grouped[cabinClass]!)}
            </div>
          ))}

          {/* Block/Unblock panel — shows when seat selected */}
          {pendingSeat && (
            <div className="mt-4 w-full border border-slate-200 rounded-xl p-4 bg-slate-50">
              <p className="text-sm font-bold text-slate-800 mb-2">
                Seat {pendingSeat.seatNumber} — {pendingSeat.isBlocked ? "Currently Blocked" : "Currently Active"}
              </p>
              {!pendingSeat.isBlocked && (
                <input
                  type="text"
                  placeholder="Block reason (required)"
                  value={blockReasonInput}
                  onChange={(e) => setBlockReasonInput(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              )}
              {pendingSeat.isBlocked && pendingSeat.blockReason && (
                <p className="text-xs text-slate-500 mb-3">Reason: <span className="text-slate-700 font-medium">{pendingSeat.blockReason}</span></p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleBlock(pendingSeat.id, pendingSeat.isBlocked)}
                  disabled={isToggling}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold text-white transition ${
                    pendingSeat.isBlocked
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-600 hover:bg-red-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isToggling ? "Processing..." : pendingSeat.isBlocked ? "Unblock Seat" : "Block Seat"}
                </button>
                <button
                  onClick={() => { setPendingSeatId(null); setBlockReasonInput(""); }}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold text-slate-600 border border-slate-300 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tail */}
        <div style={{ width: "100%", height: "50px", background: "#ffffff", clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }} />
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] bg-white border border-slate-200 rounded-xl p-3.5 shadow-xl text-xs text-slate-700 min-w-[190px] pointer-events-none"
          style={{ top: tooltip.y - 10, left: tooltip.x + 36 }}
        >
          <p className="font-extrabold text-slate-900 text-sm mb-1.5 border-b border-slate-100 pb-1">{tooltip.seat.seatNumber}</p>
          <div className="space-y-1 font-medium">
            <p className="text-slate-400">Cabin: <span className="text-slate-800">{CABIN_LABELS[tooltip.seat.cabinClass] ?? tooltip.seat.cabinClass}</span></p>
            <p className="text-slate-400">Position: <span className="text-slate-800 capitalize">{tooltip.seat.position}</span></p>
            <p className="text-slate-400">Section: <span className="text-slate-800 capitalize">{tooltip.seat.section}</span></p>
            <p className="text-slate-400">Status: <span className={`font-bold ${tooltip.seat.isBlocked ? "text-gray-500" : "text-emerald-600"}`}>{tooltip.seat.isBlocked ? "Blocked" : "Active"}</span></p>
            {tooltip.seat.blockReason && <p className="text-slate-400">Reason: <span className="text-slate-700">{tooltip.seat.blockReason}</span></p>}
            {tooltip.seat.isExitRow && <p className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">⚠ Exit Row</p>}
            {tooltip.seat.features.length > 0 && <p className="text-slate-400">Features: <span className="text-slate-800">{tooltip.seat.features.join(", ")}</span></p>}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default AircraftSeatModal;