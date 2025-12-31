import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Auth,Otp } from "./authTypes";


import {
    signupUser,
    signinUser,
    resendOtp,
    verifyOtp,
    forgotPassword,
    updatePassword,
    signupProvider,
    updateUserProfile,
    updateProviderProfile,
    signOutUser,
    getProviderProfile,
    completeProviderProfile,
    getAdminProfile,
    googleAuth

} from "./authThunk";

const initialState: Auth = {
    otp: null,
    user: null,
    provider: null,
    admin: null,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setOtp:(state, action: PayloadAction<Otp | null>) => {
            state.otp = action.payload;
        },
        updateCountDown:(state, action: PayloadAction<number>) => {
            if(state.otp){
                state.otp.countDown = action.payload;
            }
        },
        clearOtpDetails:(state) => {
            state.otp = null;
    },
    setUser:(state,action)=>{
        state.user = action.payload;
    },
    setProvider:(state,action)=>{
        state.provider = action.payload;
    },
    setAdmin:(state,action)=>{
        state.admin = action.payload;
    },
    clearAuthPerson:(state)=>{
        state.user = null;
        state.provider = null;
        state.admin = null;
        state.otp = null;

    }
    },
    extraReducers: (builder) => {
        builder
        // signup user
        .addCase(signupUser.pending,(state)=>{
            state.isLoading = true;
            state.error = null;

        })
        .addCase(signupUser.fulfilled,(state)=>{
            state.isLoading = false;
            
            state.error = null;})

        .addCase(signupUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload === "string"
            ? action.payload: "Failed to create user";
        })
// signin user
        .addCase(signinUser.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
    .addCase(signinUser.fulfilled, (state, action) => {
  state.isLoading = false;
  state.error = null;
  const loggedInUser = action.payload.data?.user;
  if (!loggedInUser) return;

  if (loggedInUser.role === "admin") {
    state.admin = loggedInUser;
    state.user = null;
    state.provider = null;
  } else if (loggedInUser.role === "user") {
    state.user = loggedInUser;
    state.admin = null;
    state.provider = null;
  } else if (loggedInUser.role === "provider") {
    state.provider = loggedInUser;
    state.admin = null;
    state.user = null;
  }
})



builder
  .addCase(getAdminProfile.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(getAdminProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.admin = action.payload.data;
    state.error = null;
  })
  .addCase(getAdminProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.admin = null;
    state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch admin profile";
  })


        .addCase(signinUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload === "string"
            ? action.payload: "Failed to signin";

        })
    
      .addCase(signupProvider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupProvider.fulfilled, (state) => {
        state.isLoading = false;
         state.error = null;
      })
      .addCase(signupProvider.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create user";
      })

        .addCase(resendOtp.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(resendOtp.fulfilled,(state)=>{
            state.isLoading = false;
            state.error = null; 
        })
        .addCase(resendOtp.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload === "string"
            ? action.payload: "Failed to resend otp";   
        })

      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = true;
        state.otp = null;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to verify otp";
      })

    
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to reset password ";
      })
    
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update password of the user";
      })

    
        .addCase(updateUserProfile.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled,(state)=>{
            state.isLoading = false;
            state.error = null; 
        })
        .addCase(updateUserProfile.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload === "string"
            ? action.payload: "Failed to update user profile";   
        })

      
          .addCase(updateProviderProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProviderProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateProviderProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update provider profile";
      })
    
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to sign out user";
      })
      // Get provider profile
.addCase(getProviderProfile.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(getProviderProfile.fulfilled, (state, action) => {
  state.isLoading = false;
  state.provider = action.payload.data;
  state.error = null;
})
.addCase(getProviderProfile.rejected, (state, action) => {
  state.isLoading = false;
  state.error =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to fetch provider profile";
})

// Complete provider profile
.addCase(completeProviderProfile.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(completeProviderProfile.fulfilled, (state) => {
  state.isLoading = false;
  if (state.provider) {
    state.provider.isProfileComplete = true;
  }
  state.error = null;
})
.addCase(completeProviderProfile.rejected, (state, action) => {
  state.isLoading = false;
  state.error =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to complete provider profile";
})
// google auth
 .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const loggedInUser = action.payload. data?.user;
        if (!loggedInUser) return;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to signin with google";
      });
    }

})

export const {
    setOtp,
    updateCountDown,
    clearOtpDetails,
    setUser,
    setProvider,
    setAdmin,
    clearAuthPerson,
    
} = authSlice.actions;
export default authSlice.reducer;


