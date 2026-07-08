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
  RequestGoogleAuth,
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
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otpSessionId, otp }: verifyOtpRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/otp/verify", { otpSessionId, otp });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to verify OTP");
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ otpSessionId }: ResendOtpRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/otp/resend", { otpSessionId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to resend OTP");
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


export const updateProviderProfile = createAsyncThunk(
  "auth/updateProviderProfile",
  async ({ ProviderData }: { ProviderData: Provider }, { rejectWithValue }) => {
  
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

export const googleAuth = createAsyncThunk(
  "auth/google",
  async ({ token }: RequestGoogleAuth, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`auth/google/`, { token });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to verify google user");
      }
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("user/profile");
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch user profile");
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