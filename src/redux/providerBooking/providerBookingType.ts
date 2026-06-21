export interface ProviderBookingSegment {
  flightId: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
}

export interface ProviderBookingPassengerSegment {
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
  seatSurcharge: number;
  luggageCharge: number;
  segmentFare: number;
  status: "active" | "cancelled";
  cancelledAt?: string;
}

export interface ProviderBookingPassenger {
  passengerId: string;
  name: string;
  dob: string;
  gender: "male" | "female" | "other";
  address: string;
  mobile: string;
  extraLuggageKg: number;
  segments: ProviderBookingPassengerSegment[];
  passengerTotal: number;
  status: "active" | "cancelled";
  cancelledAt?: string;
  refundAmount?: number;
}

export interface ProviderBookingFoodItem {
  foodId: string;
  foodName: string;
  foodPrice: number;
  quantity: number;
  itemTotal: number;
}

export interface ProviderBookingFlightFood {
  flightId: string;
  aircraftId: string;
  items: ProviderBookingFoodItem[];
  flightFoodTotal: number;
}

export interface ProviderBookingListItem {
  id: string;
  userId: string;
  segments: ProviderBookingSegment[];
  passengers: ProviderBookingPassenger[];
  flightFoods: ProviderBookingFlightFood[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  status: "pending" | "confirmed" | "payment_failed" | "cancelled";
  paymentConfirmedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderBookingPagination {
  currentPage: number;
  totalPages: number;
}

// bookinglist for provider

export interface ProviderBookingPassenger {
  passengerId: string;
  name: string;
  gender: "male" | "female" | "other";
  dob: string;
  mobile: string;
  status: "active" | "cancelled";
  segments: {
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
    seatSurcharge: number;
    luggageCharge: number;
    segmentFare: number;
    status: "active" | "cancelled";
    cancelledAt?: string;
  }[];
  passengerTotal: number;
}

export interface ProviderBookingDetail {
  id: string;
  status: "pending" | "confirmed" | "payment_failed" | "cancelled";
  paymentConfirmedAt?: string;
  createdAt: string;
  segments: {
    flightId: string;
    flightNumber: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
  }[];
  passengers: ProviderBookingPassenger[];
  flightFoods: {
    flightId: string;
    aircraftId: string;
    items: {
      foodId: string;
      foodName: string;
      foodPrice: number;
      quantity: number;
      itemTotal: number;
    }[];
    flightFoodTotal: number;
  }[];
  grossAmount: number;
  commissionAmount: number;
  providerRevenue: number;
  grandTotal: number;
}