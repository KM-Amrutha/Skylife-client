import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { CreateFlightDTO ,
  CreateRecurringFlightDTO,
  SearchFlightsRequest } from "./flightTypes";


// Provider: get all flights
export const getProviderFlights = createAsyncThunk(
  "flight/getProviderFlights",
  async (
    { page = 1, limit = 4 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/provider/flights?page=${page}&limit=${limit}`);
    
      return {
         flights: response.data?.data?.data || [],
        pagination: response.data?.data?.pagination || null,
      }
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
      console.log("createFlight payload:", res.data);
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create flight");
    }
  }
);

export const createRecurringFlight = createAsyncThunk(
  "flight/createRecurringFlight",
  async (flightData: CreateRecurringFlightDTO, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/provider/flights/recurring", flightData);
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create recurring flights");
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

// admin get flight details for approval
export const getAdminFlights = createAsyncThunk(
  "flight/getAdminFlights",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get(`/admin/flights?page=${page}&limit=${limit}`);
      console.log("Admin Flights Response:", res.data);
      return {
        flights: res.data?.data?.data || [],
        pagination: res.data?.data?.pagination || null,
      };

    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch flights");
    }
  }
);

export const rejectSingleFlight = createAsyncThunk(
  "flight/rejectSingleFlight",
  async (
    { flightId, reason }: { flightId: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/flights/${flightId}/reject`,
        { reason }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to reject flight");
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
    console.log("updateFlight thunk flightId:", flightId);
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

export const getFlightById = createAsyncThunk(
  "flight/getFlightById",
  async (flightId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/provider/flights/${flightId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch flight");
    }
  }
);


export const searchFlights = createAsyncThunk(
  "flight/searchFlights",
  async (searchData: SearchFlightsRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/flights/search", {
        params: {
          from: searchData.from,
          to: searchData.to,
          departureDate: searchData.departureDate,
          passengers: searchData.passengers,
          tripType: searchData.tripType,
          ...(searchData.returnDate && { returnDate: searchData.returnDate }),
          page: searchData.page ?? 1,
          limit: searchData.limit ?? 6,
        },
        
      });
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to search flights");
    }
  }
);

export const searchDestinationsUser = createAsyncThunk(
  "destinations/searchDestinationsUser",
  async (query: { q?: string } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (query.q) params.append("q", query.q);
      
      const response = await axiosInstance.get(`/user/destinations/search?${params}`);
    
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to search destinations");
    }
  }
);

export const deleteFlight = createAsyncThunk(
  "flight/deleteFlight",
  async (flightId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/provider/flights/${flightId}`);
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to delete flight");
    }
  }
);

export const getFlightSeats = createAsyncThunk(
  "flight/getFlightSeats",
  async (flightId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/provider/flights/${flightId}/seats`);
      return res.data?.data || [];
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch flight seats");
    }
  }
);
// Get all destinations (empty search)
export const getDestinations = () => searchDestinationsUser({ q: "" });
