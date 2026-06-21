import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

export const getUserWallet = createAsyncThunk(
  "wallet/getUserWallet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/wallet");
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wallet"
      );
    }
  }
);

export const getProviderWallet = createAsyncThunk(
  "wallet/getProviderWallet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/provider/wallet");
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wallet"
      );
    }
  }
);