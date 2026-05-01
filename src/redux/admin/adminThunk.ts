import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { RequestVerifyProvider,
   RequestRejectProvider,
   UpdateProviderStatusRequest,
  UpdateUserStatusRequest
  } from "./adminTypes";

export const getPendingProviders = createAsyncThunk(
  "admin/getPendingProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/providers/pending");
      console.log("Fetched pending providers:", response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch pending providers");
      }
    }
  }
);

export const verifyProvider = createAsyncThunk(
  "admin/verifyProvider",
  async ({ providerId }: RequestVerifyProvider, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/providers/${providerId}/verify`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to verify provider");
      }
    }
  }
);

export const rejectProvider = createAsyncThunk(
  "admin/rejectProvider",
  async ({ providerId ,reason}: RequestRejectProvider, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/providers/${providerId}/reject`,
        { reason }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to reject provider");
      }
    }
  }
);

export const getAllProviders = createAsyncThunk(
  "admin/getAllProviders",
  async (
    { page = 1, limit = 9 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/admin/providers?page=${page}&limit=${limit}`
      );
      return {
        providers: response.data?.data?.data || [],
        pagination: response.data?.data?.pagination || null,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all providers"
      );
    }
  }
);

export const updateProviderStatus = createAsyncThunk(
  "admin/updateProviderStatus",
  async ({ providerId, isActive }: UpdateProviderStatusRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(  
        `/admin/providers/${providerId}/status`,         
        { isActive }
      );
      return response.data;
    } catch (error: any) {
      console.log("Update provider status error:", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update provider status");
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (
    { page = 1, limit = 9 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/admin/users?page=${page}&limit=${limit}`
      );
      console.log("Fetched users:", response.data);
      return {
        users: response.data?.data?.data || [],
        
        pagination: response.data?.data?.pagination || null,
      };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch all users");
    }
  }
);


export const updateUsersStatus = createAsyncThunk(
  "admin/updateUsersStatus",
  async({userId, isActive}: UpdateUserStatusRequest, {rejectWithValue})=>{
    try{
      const response = await axiosInstance.patch(
        `/admin/users/${userId}/status`,
        {isActive}
      );
      return response.data;
    } catch(error:any){
      console.log("Update user status error:", error);
      if(error.response && error.response.data.message){
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update user status");
      }
    }
  }
);