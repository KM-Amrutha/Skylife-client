import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {
  BookingSegmentCache,
  BookingSeatsMapResponse,
  BookingFoodItem,
  LockedSeatEntry,
  FoodSelectionMap,
   BookingSummaryResponse,
  EligibleOffer,
  InitiateBookingResponse,
  RetryPaymentResponse,
   BookingDetail,
  BookingListItem,
  PaginationMeta,
  CancelPassengerResponse,
  Ticket,
  PassengerFormData,
} from "./bookingType";
import {
  addFlightToSegment,
  getBookingSegment,
  updateBookingSegment,
  getBookingSeatsMap,
  lockSeat,
  getFoodsByAircraft,
  saveBookingDetails,
   getBookingSummary,
  getEligibleOffers,
  initiateBooking,
  retryPayment,
   getBookingById,
  getUserBookings,
  cancelPassenger,
  getTicket,
 

} from "./bookingThunk";

interface BookingState {
  // ─── Page 2 ───────────────────────────────────────────────────────────────
  sessionId: string | null;
  savedPassengers: PassengerFormData[];
  savedFoodSelection: FoodSelectionMap;
  segment: BookingSegmentCache | null;
  isLoadingSegment: boolean;
  segmentError: string | null;
  isUpdatingSegment: boolean;
  updateSegmentError: string | null;

  // ─── Page 3 — Seat Map ────────────────────────────────────────────────────
  seatsMap: BookingSeatsMapResponse | null;
  isLoadingSeatsMap: boolean;
  seatsMapError: string | null;

  // ─── Page 3 — Seat Lock ───────────────────────────────────────────────────
  // key: `${flightId}__${passengerId}`
  lockedSeats: Record<string, LockedSeatEntry>;
  isLockingSeat: boolean;
  seatLockError: string | null;

  // ─── Page 3 — Food ────────────────────────────────────────────────────────
  // key: aircraftId
  foodsByAircraft: Record<string, BookingFoodItem[]>;
  isLoadingFoods: boolean;
  foodsError: string | null;
  // key: flightId → { foodId: quantity }
  foodSelection: FoodSelectionMap;

  // ─── Page 3 — Save Details ────────────────────────────────────────────────
  isSavingDetails: boolean;
  saveDetailsError: string | null;
  // ─── Page 4 — Summary ────────────────────────────────────────────────────
  summary: BookingSummaryResponse | null;
  isLoadingSummary: boolean;
  summaryError: string | null;

  // ─── Page 4 — Offers ─────────────────────────────────────────────────────
  eligibleOffers: EligibleOffer[];
  isLoadingOffers: boolean;
  offersError: string | null;
  selectedOfferId: string | null;

  // ─── Page 4 — Initiate Booking ────────────────────────────────────────────
  initiateBookingData: InitiateBookingResponse | null;
  isInitiatingBooking: boolean;
  initiateBookingError: string | null;

  // ─── Retry Payment ────────────────────────────────────────────────────────
  retryPaymentData: RetryPaymentResponse | null;
  isRetryingPayment: boolean;
  retryPaymentError: string | null;

  // ─── Booking Detail ───────────────────────────────────────────────────────────
bookingDetail: BookingDetail | null;
isLoadingBookingDetail: boolean;
bookingDetailError: string | null;

// ─── User Bookings List ───────────────────────────────────────────────────────
userBookings: BookingListItem[];
isLoadingUserBookings: boolean;
userBookingsError: string | null;
userBookingsPagination: PaginationMeta | null;

// ─── Cancel Passenger ─────────────────────────────────────────────────────────
isCancellingPassenger: boolean;
cancelPassengerError: string | null;

// ─── Ticket ───────────────────────────────────────────────────────────────────
tickets: Ticket[];
isLoadingTicket: boolean;
ticketError: string | null;


}

const initialState: BookingState = {
  sessionId: null,
  savedPassengers: [],
  segment: null,
  isLoadingSegment: false,
  segmentError: null,
  isUpdatingSegment: false,
  updateSegmentError: null,

  seatsMap: null,
  isLoadingSeatsMap: false,
  seatsMapError: null,

  lockedSeats: {},
  isLockingSeat: false,
  seatLockError: null,

  savedFoodSelection: {},
  foodsByAircraft: {},
  isLoadingFoods: false,
  foodsError: null,
  foodSelection: {},

  isSavingDetails: false,
  saveDetailsError: null,

   summary: null,
  isLoadingSummary: false,
  summaryError: null,

  eligibleOffers: [],
  isLoadingOffers: false,
  offersError: null,
  selectedOfferId: null,

  initiateBookingData: null,
  isInitiatingBooking: false,
  initiateBookingError: null,

  retryPaymentData: null,
  isRetryingPayment: false,
  retryPaymentError: null,

  bookingDetail: null,
isLoadingBookingDetail: false,
bookingDetailError: null,
userBookings: [],
isLoadingUserBookings: false,
userBookingsError: null,
userBookingsPagination: null,
isCancellingPassenger: false,
cancelPassengerError: null,
tickets: [] ,
isLoadingTicket: false,
ticketError: null,

};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingSession: (state) => {
      state.sessionId = null;
      state.savedPassengers = [];
      state.segment = null;
      state.segmentError = null;
      state.updateSegmentError = null;
      state.seatsMap = null;
      state.lockedSeats = {};
      state.foodsByAircraft = {};
      state.foodSelection = {};
      state.saveDetailsError = null;
    },
    clearSegmentError: (state) => {
      state.segmentError = null;
    },
    clearSeatLockError: (state) => {
      state.seatLockError = null;
    },
    clearSaveDetailsError: (state) => {
      state.saveDetailsError = null;
    },
     clearInitiateBookingError: (state) => {
      state.initiateBookingError = null;
    },
    setSelectedOffer: (state, action: { payload: string | null }) => {
      state.selectedOfferId = action.payload;
    },
    // Food quantity management — per flight, per food item
    setFoodQuantity: (
      state,
      action: {
        payload: { flightId: string; foodId: string; quantity: number };
      }
    ) => {
      const { flightId, foodId, quantity } = action.payload;
      if (!state.foodSelection[flightId]) {
        state.foodSelection[flightId] = {};
      }
      if (quantity <= 0) {
        delete state.foodSelection[flightId]![foodId];
      } else {
        state.foodSelection[flightId]![foodId] = quantity;
      }
    },
    setSavedPassengers: (
  state,
  action: PayloadAction<PassengerFormData[]>
) => {
  state.savedPassengers = action.payload;
},
    setSavedFoodSelection: (state, action: { payload: FoodSelectionMap }) => {
  state.savedFoodSelection = action.payload;
},
    clearFoodSelection: (state) => {
      state.foodSelection = {};
    },

    clearBookingDetail: (state) => {
  state.bookingDetail = null;
  state.bookingDetailError = null;
  state.tickets = [];
  state.ticketError = null;
},
clearCancelPassengerError: (state) => {
  state.cancelPassengerError = null;
},
  },
  extraReducers: (builder) => {
    builder
      // ─── addFlightToSegment ─────────────────────────────────────────────
      .addCase(addFlightToSegment.pending, (state) => {
        state.segmentError = null;
      })
      .addCase(addFlightToSegment.fulfilled, (state, action) => {
        state.sessionId = action.payload.sessionId;
      })
      .addCase(addFlightToSegment.rejected, (state, action) => {
        state.segmentError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add flight to booking";
      })

      // ─── getBookingSegment ──────────────────────────────────────────────
      .addCase(getBookingSegment.pending, (state) => {
        state.isLoadingSegment = true;
        state.segmentError = null;
        state.segment = null;
      })
      .addCase(getBookingSegment.fulfilled, (state, action) => {
        state.isLoadingSegment = false;
        state.segment = action.payload;
        state.sessionId = action.payload.sessionId;
      })
      .addCase(getBookingSegment.rejected, (state, action) => {
        state.isLoadingSegment = false;
        state.segmentError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch booking segment";
      })

      // ─── updateBookingSegment ───────────────────────────────────────────
      .addCase(updateBookingSegment.pending, (state) => {
        state.isUpdatingSegment = true;
        state.updateSegmentError = null;
      })
      .addCase(updateBookingSegment.fulfilled, (state, action) => {
        state.isUpdatingSegment = false;
        if (action.payload === null) {
          state.segment = null;
          state.sessionId = null;
        } else {
          state.segment = action.payload;
        }
      })
      .addCase(updateBookingSegment.rejected, (state, action) => {
        state.isUpdatingSegment = false;
        state.updateSegmentError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update booking segment";
      })

      // ─── getBookingSeatsMap ─────────────────────────────────────────────
      .addCase(getBookingSeatsMap.pending, (state) => {
        state.isLoadingSeatsMap = true;
        state.seatsMapError = null;
        state.seatsMap = null;
      })
      .addCase(getBookingSeatsMap.fulfilled, (state, action) => {
        state.isLoadingSeatsMap = false;
        state.seatsMap = action.payload;
      })
      .addCase(getBookingSeatsMap.rejected, (state, action) => {
        state.isLoadingSeatsMap = false;
        state.seatsMapError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch seats map";
      })

      // ─── lockSeat ───────────────────────────────────────────────────────
      .addCase(lockSeat.pending, (state) => {
        state.isLockingSeat = true;
        state.seatLockError = null;
      })
      .addCase(lockSeat.fulfilled, (state, action) => {
        state.isLockingSeat = false;
        const { flightId, passengerId, flightSeatId, seatNumber, lockedUntil } =
          action.payload;
        const key = `${flightId}__${passengerId}`;
        // meta passed through action — cabinClass, position, baseFare, seatSurcharge
        // stored from action.meta.arg
        const arg = action.meta.arg;
        state.lockedSeats[key] = {
          flightSeatId,
          seatNumber,
          cabinClass: arg.cabinClass,
          position: arg.position,
          baseFare: arg.baseFare,
          seatSurcharge: arg.seatSurcharge,
          lockedUntil,
        };
      })
      .addCase(lockSeat.rejected, (state, action) => {
        state.isLockingSeat = false;
        state.seatLockError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to lock seat";
      })

      // ─── getFoodsByAircraft ─────────────────────────────────────────────
      .addCase(getFoodsByAircraft.pending, (state) => {
        state.isLoadingFoods = true;
        state.foodsError = null;
      })
      .addCase(getFoodsByAircraft.fulfilled, (state, action) => {
        state.isLoadingFoods = false;
        const { aircraftId, foods } = action.payload;
        state.foodsByAircraft[aircraftId] = foods;
      })
      .addCase(getFoodsByAircraft.rejected, (state, action) => {
        state.isLoadingFoods = false;
        state.foodsError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch foods";
      })

      // ─── saveBookingDetails ─────────────────────────────────────────────
      .addCase(saveBookingDetails.pending, (state) => {
        state.isSavingDetails = true;
        state.saveDetailsError = null;
      })
      .addCase(saveBookingDetails.fulfilled, (state) => {
        state.isSavingDetails = false;
      })
      .addCase(saveBookingDetails.rejected, (state, action) => {
        state.isSavingDetails = false;
        state.saveDetailsError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to save booking details";
      })
          // ─── getBookingSummary ──────────────────────────────────────────────
      .addCase(getBookingSummary.pending, (state) => {
        state.isLoadingSummary = true;
        state.summaryError = null;
        state.summary = null;
      })
      .addCase(getBookingSummary.fulfilled, (state, action) => {
        state.isLoadingSummary = false;
        state.summary = action.payload;
      })
      .addCase(getBookingSummary.rejected, (state, action) => {
        state.isLoadingSummary = false;
        state.summaryError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch booking summary";
      })

      // ─── getEligibleOffers ──────────────────────────────────────────────
      .addCase(getEligibleOffers.pending, (state) => {
        state.isLoadingOffers = true;
        state.offersError = null;
        state.eligibleOffers = [];
      })
      .addCase(getEligibleOffers.fulfilled, (state, action) => {
        state.isLoadingOffers = false;
        state.eligibleOffers = action.payload || [];
      })
      .addCase(getEligibleOffers.rejected, (state, action) => {
        state.isLoadingOffers = false;
        state.offersError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch eligible offers";
      })

      // ─── initiateBooking ────────────────────────────────────────────────
      .addCase(initiateBooking.pending, (state) => {
        state.isInitiatingBooking = true;
        state.initiateBookingError = null;
        state.initiateBookingData = null;
      })
      .addCase(initiateBooking.fulfilled, (state, action) => {
        state.isInitiatingBooking = false;
        state.initiateBookingData = action.payload;
      })
      .addCase(initiateBooking.rejected, (state, action) => {
        state.isInitiatingBooking = false;
        state.initiateBookingError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to initiate booking";
      })

      // ─── retryPayment ───────────────────────────────────────────────────
      .addCase(retryPayment.pending, (state) => {
        state.isRetryingPayment = true;
        state.retryPaymentError = null;
        state.retryPaymentData = null;
      })
      .addCase(retryPayment.fulfilled, (state, action) => {
        state.isRetryingPayment = false;
        state.retryPaymentData = action.payload;
      })
      .addCase(retryPayment.rejected, (state, action) => {
        state.isRetryingPayment = false;
        state.retryPaymentError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to retry payment";
      })
// ─── getBookingById ─────────────────────────────────────────────────────────
.addCase(getBookingById.pending, (state) => {
  state.isLoadingBookingDetail = true;
  state.bookingDetailError = null;
  state.bookingDetail = null;
})
.addCase(getBookingById.fulfilled, (state, action) => {
  state.isLoadingBookingDetail = false;
  state.bookingDetail = action.payload;
  console.log('payload is : ',state.bookingDetail )
})
.addCase(getBookingById.rejected, (state, action) => {
  state.isLoadingBookingDetail = false;
  state.bookingDetailError =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to fetch booking";
})

// ─── getUserBookings ────────────────────────────────────────────────────────
.addCase(getUserBookings.pending, (state) => {
  state.isLoadingUserBookings = true;
  state.userBookingsError = null;
})
.addCase(getUserBookings.fulfilled, (state, action) => {
  state.isLoadingUserBookings = false;
  state.userBookings = action.payload?.data || [];
  console.log('getBookingById payload:', action.payload);
  state.userBookingsPagination = action.payload?.pagination || null;
})

.addCase(getUserBookings.rejected, (state, action) => {
  state.isLoadingUserBookings = false;
  state.userBookingsError =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to fetch bookings";
})

// ─── cancelPassenger ────────────────────────────────────────────────────────
.addCase(cancelPassenger.pending, (state) => {
  state.isCancellingPassenger = true;
  state.cancelPassengerError = null;
})
.addCase(cancelPassenger.fulfilled, (state, action) => {
  state.isCancellingPassenger = false;
  const { passengerId, refundAmount } = action.payload as CancelPassengerResponse;
  if (state.bookingDetail) {
    state.bookingDetail.passengers = state.bookingDetail.passengers.map((p) =>
      p.passengerId === passengerId
        ? {
            ...p,
            status: "cancelled" as const,
            cancelledAt: new Date().toISOString(),
            refundAmount: refundAmount,
          }
        : p
    );
  }
})
.addCase(cancelPassenger.rejected, (state, action) => {
  state.isCancellingPassenger = false;
  state.cancelPassengerError =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to cancel passenger";
})

// ─── getTicket ──────────────────────────────────────────────────────────────
.addCase(getTicket.pending, (state) => {
  state.isLoadingTicket = true;
  state.ticketError = null;
  state.tickets = [];
})
.addCase(getTicket.fulfilled, (state, action) => {
  state.isLoadingTicket = false;
  state.tickets = action.payload;
})
.addCase(getTicket.rejected, (state, action) => {
  state.isLoadingTicket = false;
  state.ticketError =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to fetch ticket";
})


  },
});

export const {
  clearBookingSession,
  clearSegmentError,
  clearSeatLockError,
  clearSaveDetailsError,
    clearInitiateBookingError,
  setSelectedOffer,
  setFoodQuantity,
  clearFoodSelection,
  clearBookingDetail,
  clearCancelPassengerError,
  setSavedFoodSelection,
  setSavedPassengers,
  
} = bookingSlice.actions;

export default bookingSlice.reducer;