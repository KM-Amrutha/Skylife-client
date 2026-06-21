import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  CreateSeatLayoutDTO,
} from "./seatType";

// Get all seat types
export const getAllSeatTypes = createAsyncThunk(
  "seat/getAllSeatTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/provider/seat-types");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch seat types");
    }
  }
);

// Create seat layout
export const createSeatLayout = createAsyncThunk(
  "seat/createSeatLayout",
  async (seatLayoutData: CreateSeatLayoutDTO, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/provider/seat-layouts", seatLayoutData);
      console.log("createSeatLayout response:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create seat layout");
    }
  }
);


// Generate seats for aircraft
export const generateSeats = createAsyncThunk(
  "seat/generateSeats",
  async (aircraftId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/provider/aircraft/${aircraftId}/generate-seats`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to generate seats");
    }
  }
);

// Get seat layouts by aircraft
export const getSeatLayoutsByAircraft = createAsyncThunk(
  "seat/getSeatLayoutsByAircraft",
  async (aircraftId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/provider/aircraft/${aircraftId}/seat-layouts`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch seat layouts");
    }
  }
);

// Delete seat layout
export const deleteSeatLayout = createAsyncThunk(
  "seat/deleteSeatLayout",
  async (layoutId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/provider/seat-layouts/${layoutId}`);
      console.log("layoutId to delete:", layoutId);
      return { layoutId, ...response.data };
      
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to delete seat layout");
    }
  }
);