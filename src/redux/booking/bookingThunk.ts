import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  AddFlightToSegmentRequest,
  UpdateSegmentRequest,
  SeatLockRequest,
  SaveBookingDetailsRequest,
  InitiateBookingRequest,
 
  
} from "./bookingType";

// ─── Page 2 ───────────────────────────────────────────────────────────────────

export const addFlightToSegment = createAsyncThunk(
  "booking/addFlightToSegment",
  async (data: AddFlightToSegmentRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/bookings/segment", data);
    
      return res.data?.data as { sessionId: string; message: string };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add flight to booking"
      );
    }
  }
);

export const getBookingSegment = createAsyncThunk(
  "booking/getBookingSegment",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/user/bookings/${sessionId}/segment`);
      
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch booking segment"
      );
    }
  }
);

export const updateBookingSegment = createAsyncThunk(
  "booking/updateBookingSegment",
  async ({ sessionId, ...body }: UpdateSegmentRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/user/bookings/${sessionId}/segment`,
        body
      );
      return res.data?.data ?? null;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update booking segment"
      );
    }
  }
);

// ─── Page 3 — Seat Map ────────────────────────────────────────────────────────

export const getBookingSeatsMap = createAsyncThunk(
  "booking/getBookingSeatsMap",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/user/bookings/${sessionId}/seats-map`
      );
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seats map"
      );
    }
  }
);

// ─── Page 3 — Seat Lock ───────────────────────────────────────────────────────
export const lockSeat = createAsyncThunk(
  "booking/lockSeat",
  async (
    arg: SeatLockRequest & { sessionId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post(
        `/user/bookings/${arg.sessionId}/seat-lock`,
        {
          flightId: arg.flightId,
          flightSeatId: arg.flightSeatId,
          passengerId: arg.passengerId,
        }
      );
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to lock seat"
      );
    }
  }
);

// ─── Page 3 — Food ────────────────────────────────────────────────────────────

export const getFoodsByAircraft = createAsyncThunk(
  "booking/getFoodsByAircraft",
  async (aircraftId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/user/aircrafts/${aircraftId}/foods`
      );
      return {
        aircraftId,
        foods: res.data?.data?.foods || [],
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch foods"
      );
    }
  }
);

// ─── Page 3 — Save Booking Details ───────────────────────────────────────────

export const saveBookingDetails = createAsyncThunk(
  "booking/saveBookingDetails",
  async (
    {
      sessionId,
      ...body
    }: SaveBookingDetailsRequest & { sessionId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post(
        `/user/bookings/${sessionId}/details`,
        body
      );
      
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save booking details"
      );
    }
  }
);
// ─── Page 4 — Summary ────────────────────────────────────────────────────────

export const getBookingSummary = createAsyncThunk(
  "booking/getBookingSummary",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/user/bookings/${sessionId}/summary`);
      console.log("Booking Summary Response:", res.data);
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch booking summary"
      );
    }
  }
);

// ─── Page 4 — Eligible Offers ─────────────────────────────────────────────────

export const getEligibleOffers = createAsyncThunk(
  "booking/getEligibleOffers",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/user/bookings/${sessionId}/offers`);
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch eligible offers"
      );
    }
  }
);

// ─── Page 4 — Initiate Booking ────────────────────────────────────────────────

export const initiateBooking = createAsyncThunk(
  "booking/initiateBooking",
  async (data: InitiateBookingRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/bookings/initiate", data);
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to initiate booking"
      );
    }
  }
);

// ─── Retry Payment ────────────────────────────────────────────────────────────

export const retryPayment = createAsyncThunk(
  "booking/retryPayment",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/user/bookings/${bookingId}/retry`
      );
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to retry payment"
      );
    }
  }
);

// ─── Post Payment — Booking Detail ───────────────────────────────────────────

export const getBookingById = createAsyncThunk(
  "booking/getBookingById",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/user/bookings/${bookingId}`);
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch booking"
      );
    }
  }
);

export const getUserBookings = createAsyncThunk(
  "booking/getUserBookings",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get(
        `/user/bookings?page=${page}&limit=${limit}`
      );
      console.log('user bookings details: ', res.data?.data)
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

export const cancelPassenger = createAsyncThunk(
  "booking/cancelPassenger",
  async (
    { bookingId, passengerId }: { bookingId: string; passengerId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.delete(
        `/user/bookings/${bookingId}/passengers/${passengerId}`
      );
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel passenger"
      );
    }
  }
);

export const getTicket = createAsyncThunk(
  "booking/getTicket",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/user/bookings/${bookingId}/ticket`
      );
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch ticket"
      );
    }
  }
);

export const payWithWallet = createAsyncThunk(
  "booking/payWithWallet",
  async ({ sessionId, offerId }: { sessionId: string; offerId?: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/wallet/pay", { sessionId, offerId });
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to pay with wallet");
    }
  }
);


