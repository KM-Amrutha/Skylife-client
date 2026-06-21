
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {  CreateAircraftDTO } from "./aircraftTypes";

// Get all aircrafts for the provider
export const getProviderAircrafts = createAsyncThunk(
  "aircraft/getProviderAircrafts",
  async (
    { page = 1, limit = 4 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/provider/aircrafts?page=${page}&limit=${limit}`
      );
      return {
        aircrafts: response.data?.data?.data || [],
        pagination: response.data?.data?.pagination || null,
      };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch aircrafts");
    }
  }
);

// Create aircraft for provider
export const createAircraft = createAsyncThunk(
  "aircraft/createAircraft",
  async (aircraftData: CreateAircraftDTO, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/provider/aircrafts", aircraftData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create aircraft");
    }
  }
);

// Update aircraft (PUT /provider/aircraft/:aircraftId)
export const updateAircraft = createAsyncThunk(
  "aircraft/updateAircraft",
  async (
    { aircraftId, update }: { aircraftId: string; update: Partial<CreateAircraftDTO> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/provider/aircraft/${aircraftId}`,
        update
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to update aircraft");
    }
  }
);

// Delete aircraft
export const deleteAircraft = createAsyncThunk(
  "aircraft/deleteAircraft",
  async (aircraftId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/provider/aircraft/${aircraftId}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to delete aircraft");
    }
  }
)
export const getAvailableAircraftsForSchedule = createAsyncThunk(
  "aircraft/getAvailableAircraftsForSchedule",
  async (
    {
      departureDestinationId,
      departureTime,
      durationMinutes,
      bufferMinutes,
    }: {
      departureDestinationId: string;
      departureTime: string;
      durationMinutes: number;
      bufferMinutes: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/provider/aircraft/available", {
        params: { departureDestinationId, departureTime, durationMinutes, bufferMinutes },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch available aircrafts");
    }
  }
);
