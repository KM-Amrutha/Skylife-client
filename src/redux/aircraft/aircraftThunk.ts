
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {  CreateAircraftDTO } from "./aircraftTypes";

// Get all aircrafts for the provider
export const getProviderAircrafts = createAsyncThunk(
  "aircraft/getProviderAircrafts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/provider/aircrafts");
      return response.data;
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
      console.log(response.data)
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
);
