import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { CreateFoodDTO, UpdateFoodDTO } from "./foodType";

export const getProviderFoods = createAsyncThunk(
  "food/getProviderFoods",
  async (
    { page = 1, limit = 3 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get(`/provider/foods?page=${page}&limit=${limit}`);
    
      console.log("pagination ", res.data?.data?.pagination)
      return {
        foods: res.data?.data?.foods || [],
         pagination: {
    currentPage: res.data?.data?.currentPage || 1,
    totalPages: res.data?.data?.totalPages || 1,
    totalCount: res.data?.data?.totalCount || 0,
  },
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch foods");
    }
  }
);

export const createFood = createAsyncThunk(
  "food/createFood",
  async (data: CreateFoodDTO, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/provider/foods", data);
    
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create food");
    }
  }
);

export const updateFood = createAsyncThunk(
  "food/updateFood",
  async (
    { foodId, data }: { foodId: string; data: UpdateFoodDTO },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.put(`/provider/foods/${foodId}`, data);
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to update food");
    }
  }
);

export const deleteFood = createAsyncThunk(
  "food/deleteFood",
  async (foodId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/provider/foods/${foodId}`);
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to delete food");
    }
  }
);

export const toggleFoodStatus = createAsyncThunk(
  "food/toggleFoodStatus",
  async (foodId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/provider/foods/${foodId}/status`);
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to toggle food status");
    }
  }
);