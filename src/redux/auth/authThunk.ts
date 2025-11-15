import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
 User,
    Provider,
    SignupUser,
    SignupProvider,
    ResendOtpRequest,
  verifyOtpRequest,
  RequestSignin,
  RequestPasswordChange,
  RequestUpdatePassword,
} from "./authTypes"

export const signupUser = createAsyncThunk(
    "auth/signupUser",
     async ({ userData }: { userData: SignupUser }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/user/sign-up", userData);
      return response.data;
    } catch (error:any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to create user");
      }
    }
  }

);

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async ({ email, password }: RequestSignin, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/sign-in", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to signin");
      }
    }
  }
);
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }: ResendOtpRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/otp/resend", { email });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to resend otp");
      }
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }: verifyOtpRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/otp/verify", {
        email,
        otp,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to verify otp");
      }
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ password, token }: RequestPasswordChange, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `auth/password-reset/${token}`,
        { password }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to reset forgotpassword");
      }
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (
    { password, newPassword }: RequestUpdatePassword,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`auth/password/change`, {
        password,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update password");
      }
    }
  }
);
export const signupProvider = createAsyncThunk(
  "auth/signupProvider",
  async (providerData: SignupProvider, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `auth/provider/sign-up/`,
        providerData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to create provider");
      }
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userData }: { userData: User }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `user/profile/`,
        userData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update user profile ");
      }
    }
  }
);

export const updateProviderProfile = createAsyncThunk(
  "auth/updateProviderProfile",
  async ({ ProviderData }: { ProviderData: Provider }, { rejectWithValue }) => {
    console.log("provider data for updating the profile", ProviderData);
    try {
      const response = await axiosInstance.put(
        `provider/profile/`,
        ProviderData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update Provider profile ");
      }
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`auth/sign-out/`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to signout");
      }
    }
  }
);

export const getProviderProfile = createAsyncThunk(
  "auth/getProviderProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("provider/profile");
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch provider profile");
      }
    }
  }
);

export const completeProviderProfile = createAsyncThunk(
  "auth/completeProviderProfile",
  async (profileData: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "provider/complete-profile",
        profileData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to complete provider profile");
      }
    }
  }
);
