
export interface FlightBaseFare {
  economy: number;
  premiumEconomy?: number;
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
  aircraftId: string;
  seatLayoutId?: string;

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
  gate?: string;

  baseFare: {
    economy: number;
    premiumEconomy?: number;
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
