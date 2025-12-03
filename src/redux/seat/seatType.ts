export interface SeatType {
  _id: string;
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
  _id: string;
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
  _id: string;
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
