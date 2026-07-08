import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BookingFlightSeatDTO,
     BookingFlightSeatMapDTO,
      LockedSeatEntry,
       PassengerFormData } 
       from "../../redux/booking/bookingType";

interface SeatSelectionModalProps {
  flightNumber: string;
  from: string;
  to: string;
  seatMap: BookingFlightSeatMapDTO[];
  passengers: PassengerFormData[];
  lockedSeats: Record<string, LockedSeatEntry>;
  isLockingSeat: boolean;
  onSelectSeat: (
    flightId: string,
    passengerId: string,
    seat: {
      flightSeatId: string;
      seatNumber: string;
      cabinClass: string;
      position: string;
      baseFare: number;
      seatSurcharge: number;
    }
  ) => void;
  getLockedSeatForPassenger: (flightId: string, passengerId: string) => LockedSeatEntry | null;
  isSeatLockedByOther: (flightId: string, flightSeatId: string, currentPassengerId: string) => boolean;
  flightId: string;
  onClose: () => void;
}

interface TooltipState {
  seat: BookingFlightSeatDTO;
  x: number;
  y: number;
}

const CABIN_ORDER = ["first", "business", "premium_economy", "economy"];

const CABIN_LABELS: Record<string, string> = {
  first: "First Class",
  business: "Business",
  premium_economy: "Premium Economy",
  economy: "Economy",
};

const CABIN_COLORS: Record<string, string> = {
  first: "bg-amber-400 border-amber-300 text-amber-900",
  business: "bg-purple-500 border-purple-300 text-white",
  premium_economy: "bg-blue-500 border-blue-300 text-white",
  economy: "bg-slate-500 border-slate-300 text-white",
};

const CABIN_LABEL_COLOR: Record<string, string> = {
  first: "text-amber-500",
  business: "text-purple-500",
  premium_economy: "text-blue-500",
  economy: "text-slate-500",
};

const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  flightNumber,
  from,
  to,
  seatMap,
  passengers,
//   lockedSeats,
  isLockingSeat,
  onSelectSeat,
  getLockedSeatForPassenger,
  isSeatLockedByOther,
  flightId,
  onClose,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [activePassengerId, setActivePassengerId] = useState<string>(
    passengers[0]?.passengerId ?? ""
  );

  const sortedCabins = [...seatMap].sort(
    (a, b) => CABIN_ORDER.indexOf(a.cabinClass) - CABIN_ORDER.indexOf(b.cabinClass)
  );

  const surcharge = seatMap[0]?.seatSurcharge;

  // ─── Seat color logic ─────────────────────────────────────────────────────
  const getSeatColor = (seat: BookingFlightSeatDTO, cabinClass: string): string => {
    if (seat.isBooked) return "bg-red-500 border-red-400 text-white cursor-not-allowed opacity-80";
    if (seat.isBlocked) return "bg-gray-700 border-gray-600 text-gray-600 cursor-not-allowed opacity-60";

    // Locked by current active passenger
    const myLocked = getLockedSeatForPassenger(flightId, activePassengerId);
    if (myLocked?.flightSeatId === seat.id)
      return "bg-emerald-400 border-emerald-300 text-white cursor-pointer ring-2 ring-emerald-300";

    // Locked by another passenger in this booking
    if (isSeatLockedByOther(flightId, seat.id, activePassengerId))
      return "bg-amber-500 border-amber-400 text-white cursor-not-allowed opacity-80";

    // Locked by someone else (isLocked from backend)
    if (seat.isLocked)
      return "bg-amber-500 border-amber-400 text-white cursor-not-allowed opacity-80";

    return CABIN_COLORS[cabinClass] ?? "bg-slate-500 border-slate-300 text-white";
  };

  const getSeatStatus = (seat: BookingFlightSeatDTO): string => {
    if (seat.isBooked) return "Booked";
    if (seat.isBlocked) return "Blocked";
    const myLocked = getLockedSeatForPassenger(flightId, activePassengerId);
    if (myLocked?.flightSeatId === seat.id) return "Your seat";
    if (isSeatLockedByOther(flightId, seat.id, activePassengerId)) return "Taken by co-passenger";
    if (seat.isLocked) return "Locked";
    return "Available";
  };

  const isSeatClickable = (seat: BookingFlightSeatDTO): boolean => {
    if (seat.isBooked || seat.isBlocked) return false;
    if (isSeatLockedByOther(flightId, seat.id, activePassengerId)) return false;
    if (seat.isLocked) {
      // allow if it's locked by current passenger
      const myLocked = getLockedSeatForPassenger(flightId, activePassengerId);
      return myLocked?.flightSeatId === seat.id;
    }
    return true;
  };

  const handleSeatClick = (seat: BookingFlightSeatDTO, cabinData: BookingFlightSeatMapDTO) => {
    if (!isSeatClickable(seat)) return;
    // Determine surcharge for this position
    const seatSurcharge =
      seat.position === "window"
        ? (cabinData.seatSurcharge.window ?? 0)
        : seat.position === "aisle"
        ? (cabinData.seatSurcharge.aisle ?? 0)
        : seat.features.includes("extra legroom")
        ? (cabinData.seatSurcharge.extraLegroom ?? 0)
        : 0;

    onSelectSeat(flightId, activePassengerId, {
      flightSeatId: seat.id,
      seatNumber: seat.seatNumber,
      cabinClass: seat.cabinClass,
      position: seat.position,
      baseFare: cabinData.baseFare,
      seatSurcharge,
    });
  };

  // ─── All passengers have seats selected ───────────────────────────────────
  const allSeatsSelected = passengers.every(
    (p) => getLockedSeatForPassenger(flightId, p.passengerId) !== null
  );

  const renderCabinGrid = (cabinData: BookingFlightSeatMapDTO) => {
    const { seats, cabinClass } = cabinData;

    const rowMap: Record<number, BookingFlightSeatDTO[]> = {};
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
        colPositionMap[currCol] === "aisle" &&
        colPositionMap[nextCol] === "aisle"
      ) {
        aisleAfter.add(currCol);
      }
    }

    const overwingRows = new Set(
      seats.filter((s) => s.section === "overwing").map((s) => s.rowNumber)
    );

    return (
      <div className="flex flex-col items-center gap-1">
        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${CABIN_LABEL_COLOR[cabinClass] ?? "text-slate-400"}`}>
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
          const seatByCol: Record<string, BookingFlightSeatDTO> = {};
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
                        className={`w-7 h-7 rounded-md border-2 text-[9px] font-bold flex items-center justify-center transition-all duration-150 hover:scale-110 hover:z-10 relative
                          ${getSeatColor(seat, cabinClass)}
                          ${isOverwing ? "ring-1 ring-cyan-400/50" : ""}
                          ${isSeatClickable(seat) ? "cursor-pointer" : "cursor-not-allowed"}
                        `}
                        onClick={() => handleSeatClick(seat, cabinData)}
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
     <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex flex-col items-center my-auto">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-slate-700 border border-white/20 text-white hover:bg-slate-600 transition flex items-center justify-center text-sm font-bold"
        >
          ✕
        </button>

        {/* Cockpit */}
        <div style={{ width: "100%", height: "50px", background: "#ffffff", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />

        {/* Fuselage */}
        <div
          style={{ background:"#ffffff", borderLeft: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)" }}
          className="px-6 py-4 flex flex-col items-center gap-3 w-auto"
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-2 w-full">
            <h2 className="text-[#00001F] text-base font-bold tracking-wide">
              Select Seats — {flightNumber}
            </h2>
            <p className="text-slate-500 text-xs">{from} → {to}</p>

            {/* Passenger tabs */}
            <div className="flex gap-2 flex-wrap justify-center mt-1">
              {passengers.map((p, i) => {
                const locked = getLockedSeatForPassenger(flightId, p.passengerId);
                return (
                  <button
                    key={p.passengerId}
                    onClick={() => setActivePassengerId(p.passengerId)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                      activePassengerId === p.passengerId
                        ? "bg-[#0a3a8a] text-white border-[#0a3a8a]"
                        : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {p.name || `Passenger ${i + 1}`}
                    {locked && (
                      <span className="ml-1.5 text-emerald-500">✓ {locked.seatNumber}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Surcharge info */}
            {surcharge && (
              <div className="flex gap-3 text-[10px] text-slate-400 flex-wrap justify-center">
                {surcharge.window && <span>Window <span className="text-blue-600 font-bold">+₹{surcharge.window}</span></span>}
                {surcharge.aisle && <span>Aisle <span className="text-blue-600 font-bold">+₹{surcharge.aisle}</span></span>}
                {surcharge.extraLegroom && <span>Extra legroom <span className="text-blue-600 font-bold">+₹{surcharge.extraLegroom}</span></span>}
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
              {[
                { label: "First", color: "bg-amber-400" },
                { label: "Business", color: "bg-purple-500" },
                { label: "Prem. Economy", color: "bg-blue-500" },
                { label: "Economy", color: "bg-slate-500" },
                { label: "Your seat", color: "bg-emerald-400" },
                { label: "Booked", color: "bg-red-500" },
                { label: "Locked", color: "bg-amber-500" },
                { label: "Blocked", color: "bg-gray-700" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                  <span className="text-[10px] text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cabin grids */}
          {sortedCabins.map((cabin, index) => (
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

          {/* Done button */}
          <button
            onClick={onClose}
            disabled={!allSeatsSelected || isLockingSeat}
            className="mt-4 w-full py-2.5 rounded-full bg-[#0a3a8a] text-white text-sm font-bold hover:bg-[#082c6b] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allSeatsSelected ? "Done — All seats selected" : `Select seats for all ${passengers.length} passengers`}
          </button>
        </div>

        {/* Wings */}
        <div
          style={{ background: "#ffffff", borderLeft: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)", borderTop: "1px solid rgba(255,255,255,0.1)" }}
          className="w-full flex"
        >
          <div className="flex-1 py-3 flex items-center justify-center" style={{ borderRight: "1px solid rgba(241,248,249,0.1)" }}>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Fuels</span>
          </div>
          <div className="flex-1 py-3 flex items-center justify-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Amenities</span>
          </div>
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
  <p className="text-slate-400">Status: <span className={`font-bold ${
    tooltip.seat.isBooked ? "text-red-500" :
    tooltip.seat.isLocked ? "text-amber-500" :
    tooltip.seat.isBlocked ? "text-gray-500" : "text-emerald-600"
  }`}>{getSeatStatus(tooltip.seat)}</span></p>
  {tooltip.seat.isExitRow && <p className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">⚠ Exit Row</p>}
  <p className="text-slate-400 border-t border-slate-100 pt-1.5 mt-1.5">Fare: <span className="text-slate-900 font-extrabold text-sm">₹{tooltip.seat.fare.toLocaleString("en-IN")}</span></p>
  {tooltip.seat.features.length > 0 && (
    <p className="text-slate-400">Features: <span className="text-slate-800">{tooltip.seat.features.join(", ")}</span></p>
  )}
</div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default SeatSelectionModal;