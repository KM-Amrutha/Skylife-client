export interface SeatType {
  id: string;
  seatTypeName: string;
  cabinClass: string;
  basePriceMultiplier: number;
  seatPitch: number;
  seatWidth: number;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SeatLayout {
  id: string;
  aircraftId: string;
  cabinClass: string;
  layout: string;
  startRow: number;
  endRow: number;
  totalRows: number;
  seatsPerRow: number;
  columns: string[];
  aisleColumns: string[];
  exitRows: number[];
  wingStartRow: number;
  wingEndRow: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSeatLayoutDTO {
  aircraftId: string;
  cabinClass: string;
  layout: string;
  startRow: number;
  endRow: number;
  seatsPerRow?: number;
  columns?: string[];
  aisleColumns?: string[];
  exitRows?: number[];
  wingStartRow?: number;
  wingEndRow?: number;
}

export interface Seat {
  id: string;
  aircraftId: string;
  seatTypeId: string;
  seatTypeName: string;
  cabinClass: string;
  seatNumber: string;
  rowNumber: number;
  columnPosition: string;
  section: string;
  position: string;
  isExitRow: boolean;
  isBlocked: boolean;
  blockReason?: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface AircraftSeatDTO {
  id: string;
  aircraftId: string;
  seatNumber: string;
  rowNumber: number;
  columnPosition: string;
  section: string;
  position: string;
  cabinClass: string;
  isExitRow: boolean;
  isBlocked: boolean;
  blockReason?: string;
  features: string[];
}

export interface ToggleSeatBlockResponseDTO {
  seatId: string;
  seatNumber: string;
  isBlocked: boolean;
  affectedFlightSeats: number;
  refundIssued: boolean;
  refundAmount?: number;
  userId?: string;
}

export interface AircraftSeatsState {
  seats: AircraftSeatDTO[];
  isLoading: boolean;
  error: string | null;
  isToggling: boolean;
  toggleError: string | null;
}
