import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

export const searchDestinations = createAsyncThunk(
  "destinations/searchDestinations",
  async (query: { q?: string } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (query.q) params.append("q", query.q);
      const response = await axiosInstance.get(`/provider/destinations/search?${params}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to search destinations");
    }
  }
);

// Get all destinations (empty search)
export const getDestinations = () => searchDestinations({ q: "" });
