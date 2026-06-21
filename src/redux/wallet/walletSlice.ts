import { createSlice } from "@reduxjs/toolkit";
import { UserWallet, ProviderWallet } from "./walletType";
import { getUserWallet, getProviderWallet } from "./walletThunk";

interface WalletState {
  userWallet: UserWallet | null;
  isLoadingUserWallet: boolean;
  userWalletError: string | null;

  providerWallet: ProviderWallet | null;
  isLoadingProviderWallet: boolean;
  providerWalletError: string | null;
}

const initialState: WalletState = {
  userWallet: null,
  isLoadingUserWallet: false,
  userWalletError: null,

  providerWallet: null,
  isLoadingProviderWallet: false,
  providerWalletError: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearWalletErrors: (state) => {
      state.userWalletError = null;
      state.providerWalletError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserWallet.pending, (state) => {
        state.isLoadingUserWallet = true;
        state.userWalletError = null;
      })
      .addCase(getUserWallet.fulfilled, (state, action) => {
        state.isLoadingUserWallet = false;
        state.userWallet = action.payload;
      })
      .addCase(getUserWallet.rejected, (state, action) => {
        state.isLoadingUserWallet = false;
        state.userWalletError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch wallet";
      })

      .addCase(getProviderWallet.pending, (state) => {
        state.isLoadingProviderWallet = true;
        state.providerWalletError = null;
      })
      .addCase(getProviderWallet.fulfilled, (state, action) => {
        state.isLoadingProviderWallet = false;
        state.providerWallet = action.payload;
      })
      .addCase(getProviderWallet.rejected, (state, action) => {
        state.isLoadingProviderWallet = false;
        state.providerWalletError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch wallet";
      });
  },
});

export const { clearWalletErrors } = walletSlice.actions;
export default walletSlice.reducer;