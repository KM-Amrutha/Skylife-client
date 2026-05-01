import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./adminTypes";
import {
  getPendingProviders,
  verifyProvider,
  rejectProvider,
  getAllProviders,
  updateProviderStatus,
  updateUsersStatus,
  getAllUsers
} from "./adminThunk";

const initialState: AdminState = {
  users: [],
  providers: [],
  pendingProviders: [],
  isLoading: false,
  error: null,
  pagination  : null,
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
  state.error = null;
  state.providers = Array.isArray(action.payload?.providers) 
    ? action.payload.providers 
    : [];
  state.pagination = action.payload?.pagination || null;
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
  .addCase(updateUsersStatus.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(updateUsersStatus.fulfilled, (state, action) => {
    state.isLoading = false;
    // Optimistically update the user in the list
    const { userId, isActive } = action.meta.arg;
    state.users = state.users.map((user) =>
      user._id === userId
        ? { ...user, isActive }
        : user
    );
    state.error = null;
  })
  .addCase( updateUsersStatus.rejected, (state, action) => {
    state.isLoading = false;
    state.error =
      typeof action.payload === "string"
        ? action.payload
        : "Failed to update user status";
  })
  
  .addCase(getAllUsers.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(getAllUsers.fulfilled, (state, action) => {
  state.isLoading = false;
  state.users = action.payload.users;
  state.pagination = action.payload.pagination;
  state.error = null;
})
.addCase(getAllUsers.rejected, (state, action) => {
  state.isLoading = false;
  state.error =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to fetch all users";
})
  
  


}

});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
