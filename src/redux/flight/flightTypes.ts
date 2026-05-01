
export interface FlightBaseFare {
  economy: number;
  premium_economy?: number;
  business?: number;
  first?: number;
}

export interface FlightSeatSurcharge {
  window?: number;
  aisle?: number;
  extraLegroom?: number;
}

export interface FlightBaggageRules {
  freeCabinKg?: number;
  extraChargePerKg: number;
  maxExtraKg?: number;
  
}



export interface FlightDetails {
  _id: string;
  flightId: string;
  flightNumber: string;
  aircraftName: string;
  providerId: string;
  providerName: string,
  aircraftId: string;
  seatLayoutId?: string;
    flightType: "outbound" | "return" | "recurring";
  parentFlightId?: string;                     
  recurringGroupId?: string;                        
  recurringDays?: number[]; 

  departureDestinationId: string;
  arrivalDestinationId: string;

  // Add exactly like aircraft — simple nested objects
  departureDestination?: {
    name: string;
    iataCode?: string;
  };
  arrivalDestination?: {
    name: string;
    iataCode?: string;
  };

  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  gate?: string;

  baseFare: FlightBaseFare;
  seatSurcharge: FlightSeatSurcharge;
  baggageRules: FlightBaggageRules;

  luggageRuleId?: string;
  foodMenuId?: string[];

  flightStatus: "scheduled" | "cancelled" | "completed";
  
  adminApproval: {
    status: "pending" | "approved" | "rejected";
    reviewedAt?: string;
    reason?: string | null;
  };

  createdAt: string;
  updatedAt: string;
}

export interface CreateFlightDTO {
  flightId: string;
  flightNumber: string;
  providerId: string;
  aircraftId: string;
  departureDestinationId: string;
  arrivalDestinationId: string;
  departureTime: string;
  durationMinutes: number;
  bufferMinutes?: number;
  gate?: string;

  baseFare: {
    economy: number;
    premium_economy?: number;
    business?: number;
    first?: number;
  };

  seatSurcharge: {
    window?: number;
    aisle?: number;
    extraLegroom?: number;
  };

  baggageRules: {
    freeCabinKg?: number;
    extraChargePerKg: number;
    maxExtraKg?: number;
  };

  aircraftName?: string;
  luggageRuleId?: string;
  foodMenuId?: string[];
}

export interface SearchFlightsRequest {
  from: string;
  to: string;
  departureDate: string;
  passengers: number;
  tripType: "one-way" | "round-trip";
  returnDate?: string;
  page?: number;
  limit?: number;
}
export interface SearchFlightPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface SearchFlightResult {
  _id: string;
  flightId: string;
  flightNumber: string;
  aircraftName: string;

  departure: {
    destinationId: string;
    name: string;
    iataCode: string;
    time: string;
  };

  arrival: {
    destinationId: string;
    name: string;
    iataCode: string;
    time: string;
  };

  durationMinutes: number;
  gate?: string;

  baseFare: FlightBaseFare;
  baggageRules: FlightBaggageRules;

  flightStatus: "scheduled" | "cancelled" | "completed";
  availableClasses: Array<"economy" | "premium_economy" | "business" | "first">;
}

export interface FlightSeatDTO {
  _id: string;
  flightId: string;
  aircraftId: string;
  seatId: string;

  seatNumber: string;
  rowNumber: number;
  columnPosition: string;
  section: string;
  position: string;
  cabinClass: string;
  isExitRow: boolean;
  features: string[];

  isBooked: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  lockedUntil?: string;

  fare: number;

  bookingId?: string;

  createdAt: string;
  updatedAt: string;
}

export interface FlightSeatMapDTO {
  flightId: string;
  cabinClass: string;
  baseFare: number;
  seatSurcharge: {
    window?: number;
    aisle?: number;
    extraLegroom?: number;
  };
  seats: FlightSeatDTO[];
}
export interface SearchFlightResponse {
  outbound: SearchFlightResult[];
  return?: SearchFlightResult[];
    pagination: {
    outbound: SearchFlightPagination;
    return?: SearchFlightPagination;
  };
}

export interface CreateRecurringFlightDTO {
  aircraftId: string;
  departureDestinationId: string;
  arrivalDestinationId: string;
  baseFlightId: string;
  baseFlightNumber: string;
  departureTimeOfDay: string;  // "HH:mm"
  startDate: string;           // "YYYY-MM-DD"
  endDate: string;             // "YYYY-MM-DD"
  weekdays: number[];          // [0-6] 0=Sun
  durationMinutes: number;
  bufferMinutes: number;
  gate?: string;
  baseFare: {
    economy: number;
    premium_economy?: number;
    business?: number;
    first?: number;
  };
  seatSurcharge: {
    window?: number;
    aisle?: number;
    extraLegroom?: number;
  };
  baggageRules: {
    freeCabinKg?: number;
    extraChargePerKg: number;
    maxExtraKg?: number;
  };
  luggageRuleId?: string;
  foodMenuId?: string[];
  seatLayoutId?: string;
}

export interface RecurringFlightResultDTO {
  created: FlightDetails[];
  skipped: {
    date: string;
    reason: string;
  }[];
  totalCreated: number;
  totalSkipped: number;
}