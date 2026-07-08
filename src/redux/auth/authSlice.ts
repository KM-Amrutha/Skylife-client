import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "./authTypes";


import {
    signupUser,
    signinUser,
    forgotPassword,
    updatePassword,
    signupProvider,
    updateProviderProfile,
    getProviderProfile,
    completeProviderProfile,
    googleAuth,
    getUserProfile,
    updateUserProfile,
     signOutUser,

} from "./authThunk";

const initialState: Auth = {
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
  const data = action.payload.data;
  const loggedInData = data?.userData ?? data?.providerData ?? null;

  if (!loggedInData) return;

  if (loggedInData.role === "admin") {
    state.admin = loggedInData;
    state.user = null;
    state.provider = null;
  } else if (loggedInData.role === "user") {
    state.user = loggedInData;
    state.admin = null;
    state.provider = null;
  } else if (loggedInData.role === "provider") {
    state.provider = loggedInData;
    state.admin = null;
    state.user = null;
  }
})
    .addCase(signinUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload === "string"
            ? action.payload: "Failed to signin";

        })



builder
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
        const loggedInUser = action.payload. data?.userData;
        if (!loggedInUser) return;
        state.user = loggedInUser;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to signin with google";
      })

        .addCase(updateUserProfile.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload.data
            state.error = null; 
        })
        .addCase(updateUserProfile.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload === "string"
            ? action.payload: "Failed to update user profile";   
        })

        .addCase(getUserProfile.pending, (state) => {
             state.isLoading = true;
            state.error = null;
               })
       .addCase(getUserProfile.fulfilled, (state, action) => {
           state.isLoading = false;
             state.user = action.payload.data;
          state.error = null;
              })

                .addCase(getUserProfile.rejected, (state, action) => {
                   state.isLoading = false;
                      state.error = typeof action.payload === "string"
                      ? action.payload
                       : "Failed to fetch user profile";
                    })
        
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.provider = null;
        state.admin = null; 
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to sign out user";
      })

    }

})

export const {
    setUser,
    setProvider,
    setAdmin,
    clearAuthPerson,
    
} = authSlice.actions;
export default authSlice.reducer;


