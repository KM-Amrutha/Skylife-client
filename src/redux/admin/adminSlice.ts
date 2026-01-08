import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./adminTypes";
import {
  getPendingProviders,
  verifyProvider,
  rejectProvider,
  getAllProviders,
  updateProviderStatus,
} from "./adminThunk";

const initialState: AdminState = {
  users: [],
  providers: [],
  pendingProviders: [],
  isLoading: false,
  error: null,
  userDetails: {},
  providerDetails: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getPendingProviders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPendingProviders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingProviders = action.payload.data;
        state.error = null;
      })
      .addCase(getPendingProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch pending providers";
      })

      
      .addCase(verifyProvider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyProvider.fulfilled, (state, action) => {
        state.isLoading = false;
        const verifiedProviderId = action.payload.data?._id;
        
        state.pendingProviders = state.pendingProviders.filter(
          (provider) => provider._id !== verifiedProviderId
        );
        state.error = null;
      })
      .addCase(verifyProvider.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to verify provider";
      })

      
      .addCase(rejectProvider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectProvider.fulfilled, (state, action) => {
        state.isLoading = false;
        const rejectedProviderId = action.payload.data?._id;
    
        state.pendingProviders = state.pendingProviders.filter(
          (provider) => provider._id !== rejectedProviderId
        );
        state.error = null;
      })
      .addCase(rejectProvider.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to reject provider";
      })

      .addCase(getAllProviders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      })
     .addCase(getAllProviders.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("Redux recieved Providers:", action.payload.data);
      state.providers = action.payload.data || [];
      state.error = null;
      })
     .addCase(getAllProviders.rejected, (state, action) => {
      state.isLoading = false;
       state.error =
       typeof action.payload === "string"
      ? action.payload
      : "Failed to fetch all providers";
      })

    
.addCase(updateProviderStatus.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(updateProviderStatus.fulfilled, (state, action) => {
  state.isLoading = false;
  // Optimistically update the provider in the list
  const { providerId, isActive } = action.meta.arg;
  state.providers = state.providers.map((provider) =>
    provider._id === providerId
      ? { ...provider, isActive }
      : provider
  );
  state.error = null;
})
.addCase(updateProviderStatus.rejected, (state, action) => {
  state.isLoading = false;
  state.error =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to update provider status";
})
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
