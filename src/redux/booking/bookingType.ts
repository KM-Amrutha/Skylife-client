export interface BookingSegmentFlight {
  flightId: string;
  flightNumber: string;
  aircraftId: string;
  aircraftName: string;
  providerId:string;
  providerName:string;
  providerLogo?:string;
  manufacturer:string;
  from: string;
  to: string;
  fromName: string;
  toName: string;
  departureTime: string;
  arrivalTime: string;
  gate?:string;
  durationMinutes: number;
  baseFare: {
    economy?: number;
    premium_economy?: number;
    business?: number;
    first?: number;
  };
  amenities?: string[];
  baggageRules: {
    freeCabinKg: number;
    extraChargePerKg: number;
    maxExtraKg?: number;
  };
  foodMenuIds: string[];
}

export interface BookingSegmentCache {
  sessionId: string;
  userId: string;
  passengerCount: number;
  segments: BookingSegmentFlight[];
  createdAt: string;
}

// ─── Requests ─────────────────────────────────────────────────────────────────

export interface AddFlightToSegmentRequest {
  flightId: string;
  passengerCount: number;
  sessionId?: string;
}

export interface AddFlightToSegmentResponse {
  sessionId: string;
  message: string;
}

export interface UpdateSegmentRequest {
  sessionId: string;
  passengerCount?: number;
  removeFlightId?: string;
}


// ─── Seat Map ─────────────────────────────────────────────────────────────────

export interface BookingFlightSeatDTO {
  id: string;
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

export interface BookingFlightSeatMapDTO {
  flightId: string;
  cabinClass: string;
  baseFare: number;
  seatSurcharge: {
    window?: number;
    aisle?: number;
    extraLegroom?: number;
  };
  seats: BookingFlightSeatDTO[];
}

export interface BookingFlightSeatMapEntry {
  flightId: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  availableSeatCount: number;
  hasWarning: boolean;
  seatMap: BookingFlightSeatMapDTO[];
}

export interface BookingSeatsMapResponse {
  sessionId: string;
  passengerCount: number;
  flights: BookingFlightSeatMapEntry[];
}

// ─── Seat Lock ────────────────────────────────────────────────────────────────

export interface SeatLockRequest {
  flightId: string;
  flightSeatId: string;
  passengerId: string;
  cabinClass: string;
  position: string;
  baseFare: number;
  seatSurcharge: number;
}


export interface SeatLockResponse {
  flightSeatId: string;
  seatNumber: string;
  flightId: string;
  passengerId: string;
  lockedUntil: string;
}

// ─── Locked seat tracking (frontend state) ───────────────────────────────────

// key: `${flightId}__${passengerId}`
export interface LockedSeatEntry {
  flightSeatId: string;
  seatNumber: string;
  cabinClass: string;
  position: string;
  baseFare: number;
  seatSurcharge: number;
  lockedUntil: string;
}

// ─── Food ─────────────────────────────────────────────────────────────────────

export interface BookingFoodItem {
  id: string;
  aircraftId: string;
  providerId: string;
  foodName: string;
  foodType: string;
  vegNonveg: "veg" | "non-veg";
  serveMethod: string;
  isComplimentary: boolean;
  foodPrice: number;
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// key: flightId — quantity per foodId
// { [flightId]: { [foodId]: number } }
export type FoodSelectionMap = Record<string, Record<string, number>>;

// ─── Passenger Form ───────────────────────────────────────────────────────────

export interface PassengerFormData {
  passengerId: string; // crypto.randomUUID()
  name: string;
  dob: string;
  gender: "male" | "female" | "other";
  address: string;
  mobile: string;
  extraLuggageKg: number;
}

// ─── Save Booking Details Request ─────────────────────────────────────────────

export interface SaveBookingDetailsRequest {
  passengers: {
    passengerId: string;
    name: string;
    dob: string;
    gender: "male" | "female" | "other";
    address: string;
    mobile: string;
    extraLuggageKg: number;
    seats: {
      flightId: string;
      flightSeatId: string;
    }[];
  }[];
  flightFoods: {
    flightId: string;
    items: {
      foodId: string;
      quantity: number;
    }[];
  }[];
}
// ─── Summary ──────────────────────────────────────────────────────────────────

export interface BookingFareBreakdownSegment {
  flightId: string;
  flightNumber: string;
  from: string;
  to: string;
  seatNumber: string;
  cabinClass: string;
  baseFare: number;
  seatSurcharge: number;
  luggageCharge: number;
  segmentFare: number;
}

export interface BookingFareBreakdownPassenger {
  passengerId: string;
  passengerName: string;
  perSegment: BookingFareBreakdownSegment[];
  passengerTotal: number;
}

export interface BookingFareBreakdown {
  passengerFares: BookingFareBreakdownPassenger[];
  foodTotal: number;
  subtotal: number;
  discount: number;
  grandTotal: number;
  offerId?: string;
  offerCode?: string;
  discountPercentage?: number;
}

export interface BookingFoodItem {
  foodId: string;
  foodName: string;
  foodPrice: number;
  quantity: number;
  itemTotal: number;
}

export interface BookingFlightFood {
  flightId: string;
  items: BookingFoodItem[];
  flightFoodTotal: number;
}

export interface BookingSummaryPassengerSeat {
  flightId: string;
  flightSeatId: string;
  seatNumber: string;
  cabinClass: string;
  position: string;
  baseFare: number;
  seatSurcharge: number;
  luggageCharge: number;
  segmentFare: number;
}

export interface BookingSummaryPassenger {
  passengerId: string;
  name: string;
  dob: string;
  gender: "male" | "female" | "other";
  address: string;
  mobile: string;
  extraLuggageKg: number;
  seats: BookingSummaryPassengerSeat[];
}

export interface BookingSummaryResponse {
  sessionId: string;
  segments: BookingSegmentFlight[];
  passengers: BookingSummaryPassenger[];
  flightFoods: BookingFlightFood[];
  fareBreakdown: BookingFareBreakdown;
  createdAt: string;
}

// ─── Offers ───────────────────────────────────────────────────────────────────

export interface EligibleOffer {
  id: string;
  offerCode: string;
  description: string;
  discountPercentage: number;
  minimumAmount: number;
  validFrom: string;
  validTo: string;
  discountAmount: number;
  finalAmount: number;
}

// ─── Initiate Booking ─────────────────────────────────────────────────────────

export interface InitiateBookingRequest {
  sessionId: string;
  offerId?: string;
}

export interface InitiateBookingResponse {
  bookingId: string;
  clientSecret: string;
  amount: number;
}

// ─── Retry Payment ────────────────────────────────────────────────────────────

export interface RetryPaymentResponse {
  bookingId: string;
  clientSecret: string;
  amount: number;
}

// ─── Booking Detail (Post Payment) ───────────────────────────────────────────

export interface BookingPassengerSegment {
  flightId: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  flightSeatId: string;
  seatNumber: string;
  cabinClass: string;
  position: string;
  baseFare: number;
  foodTotal: number;
  seatSurcharge: number;
  luggageCharge: number;
  segmentFare: number;
  status: "active" | "cancelled";
  cancelledAt?: string;
}

export interface BookingPassenger {
  passengerId: string;
  name: string;
  dob: string;
  gender: "male" | "female" | "other";
  address: string;
  mobile: string;
  extraLuggageKg: number;
  segments: BookingPassengerSegment[];
  passengerTotal: number;
  status: "active" | "cancelled";
  cancelledAt?: string;
  refundAmount?: number;
}

export interface BookingFlightFoodItem {
  foodId: string;
  foodName: string;
  foodPrice: number;
  quantity: number;
  itemTotal: number;
}

export interface BookingFlightFoodDetail {
  flightId: string;
  aircraftId: string;
  items: BookingFlightFoodItem[];
  flightFoodTotal: number;
}

export interface BookingSegmentSummary {
  flightId: string;
  flightNumber: string;
  aircraftName: string;
  providerName: string;
  providerLogo?: string;
  manufacturer: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  departureTime: string;
  arrivalTime: string;
  gate?: string;
  durationMinutes: number;
  amenities?: string[];
  baggageRules: {
    freeCabinKg: number;
    extraChargePerKg: number;
    maxExtraKg?: number;
  };
}

export interface BookingDetail {
  id: string;
  userId: string;
  segments: BookingSegmentSummary[];
  passengers: BookingPassenger[];
  flightFoods: BookingFlightFoodDetail[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  status: "pending" | "confirmed" | "payment_failed" | "cancelled";
  paymentIntentId?: string;
  paymentConfirmedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CancelPassengerResponse {
  bookingId: string;
  passengerId: string;
  refundAmount: number;
  walletBalance: number;
}

// ─── Ticket ───────────────────────────────────────────────────────────────────
export interface TicketPassengerSegment {
  flightId: string;
  flightNumber: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  departureTime: string;
  arrivalTime: string;
  seatNumber: string;
  cabinClass: string;
  position: string;
  baseFare: number;
  seatSurcharge: number;
  luggageCharge: number;
  segmentFare: number;
  providerName: string;
  providerLogo?: string;
  aircraftName: string;
  manufacturer: string;
  gate?: string;
  durationMinutes: number;
  amenities?: string[];
  baggageRules: {
    freeCabinKg: number;
    extraChargePerKg: number;
    maxExtraKg?: number;
  };
}

export interface TicketPassenger {
  passengerId: string;
  name: string;
  dob: string;
  gender: "male" | "female" | "other";
  mobile: string;
  segment: TicketPassengerSegment;
  segmentTotal: number;
}

export interface TicketFlightFood {
  flightId: string;
  flightNumber: string;
  items: {
    foodName: string;
    foodPrice: number;
    quantity: number;
    itemTotal: number;
  }[];
  flightFoodTotal: number;
}

export interface Ticket {
  id: string;
  bookingId: string;
  userId: string;
  ticketNumber: string;
  passengerIndex: number;
  flightIndex: number;
  issuedAt: string;
  passenger: TicketPassenger;
  flightFood?: TicketFlightFood;
  fareBreakdown: {
    subtotal: number;
    discount: number;
    grandTotal: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ─── User Bookings List ───────────────────────────────────────────────────────

export interface BookingListItem {
  id: string;
  userId: string;
  segments: BookingSegmentSummary[];
  passengers: BookingPassenger[];
  flightFoods: BookingFlightFoodDetail[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  status: "pending" | "confirmed" | "payment_failed" | "cancelled";
  paymentIntentId?: string;
  paymentConfirmedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
}

