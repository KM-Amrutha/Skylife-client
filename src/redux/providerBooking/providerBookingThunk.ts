import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {  ProviderBookingDetail} from "./providerBookingType";

export const getProviderBookings = createAsyncThunk(
  "providerBooking/getProviderBookings",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get(
        `/provider/bookings?page=${page}&limit=${limit}`
      );
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);
export const getProviderBookingById = createAsyncThunk(
  "providerBooking/getProviderBookingById",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/provider/bookings/${bookingId}`);
      return res.data?.data as ProviderBookingDetail;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch booking"
      );
    }
  }
);
