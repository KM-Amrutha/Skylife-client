import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { CreateOfferDTO, UpdateOfferDTO } from "./offerType";

export const getProviderOffers = createAsyncThunk(
  "offer/getProviderOffers",
  async (
    { page = 1, limit = 8 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get(
        `/provider/offers?page=${page}&limit=${limit}`
      );
      console.log('offer details is: ', res.data?.data?.offers)
      return {
        offers: res.data?.data?.offers || [],
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
      return rejectWithValue("Failed to fetch offers");
    }
  }
);

export const createOffer = createAsyncThunk(
  "offer/createOffer",
  async (data: CreateOfferDTO, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/provider/offers", data);
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create offer");
    }
  }
);

export const updateOffer = createAsyncThunk(
  "offer/updateOffer",
  async (
    { offerId, data }: { offerId: string; data: UpdateOfferDTO },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.put(`/provider/offers/${offerId}`, data);
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to update offer");
    }
  }
);

export const deleteOffer = createAsyncThunk(
  "offer/deleteOffer",
  async (offerId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/provider/offers/${offerId}`);
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to delete offer");
    }
  }
);

export const toggleOfferStatus = createAsyncThunk(
  "offer/toggleOfferStatus",
  async (offerId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/provider/offers/${offerId}/status`);
      return res.data?.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to toggle offer status");
    }
  }
);