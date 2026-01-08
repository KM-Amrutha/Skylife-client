import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { CreateFlightDTO } from "./flightTypes";

// Provider: get all flights
export const getProviderFlights = createAsyncThunk(
  "flight/getProviderFlights",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/provider/flights");
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch flights");
    }
  }
);

// Provider: create flight
export const createFlight = createAsyncThunk(
  "flight/createFlight",
  async (flightData: CreateFlightDTO, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/provider/flights", flightData);
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create flight");
    }
  }
);

export const getAvailableAircraftsForSchedule = createAsyncThunk(
  "aircraft/getAvailableAircraftsForSchedule",
  async ({ departureDestinationId, departureTime }: { departureDestinationId: string; departureTime: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/provider/aircrafts/available`, {
        params: { departureDestinationId, departureTime }
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch available aircrafts");
    }
  }
);


// Admin: get pending flights
export const getPendingFlights = createAsyncThunk(
  "flight/getPendingFlights",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/flights/pending-approval");
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch pending flights");
    }
  }
);

// Admin: approve / reject flight
export const approveFlight = createAsyncThunk(
  "flight/approveFlight",
  async (
    {
      flightId,
      status,
      reason
    }: { flightId: string; status: "approved" | "rejected"; reason?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/flights/${flightId}/approval`,
        { status, reason }
      );
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to update flight approval");
    }
  }
);

// Provider: Update / Edit / Reschedule a flight
export const updateFlight = createAsyncThunk(
  "flight/updateFlight",
  async (
    { flightId, data }: { flightId: string; data: Partial<CreateFlightDTO> },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.put(
        `/provider/update-flights/${flightId}`,
        data
      );
      return res.data; // { message, data: FlightDetails }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update flight";
      return rejectWithValue(message);
    }
  }
);