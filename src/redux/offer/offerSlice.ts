import { createSlice } from "@reduxjs/toolkit";
import { OfferResponseDTO } from "./offerType";
import {
  getProviderOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
} from "./offerThunk";

interface OfferState {
  offers: OfferResponseDTO[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  submitError: string | null;
}

const initialState: OfferState = {
  offers: [],
  pagination: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
  submitError: null,
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    clearOfferError: (state) => {
      state.error = null;
    },
    clearOfferSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProviderOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProviderOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload.offers || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getProviderOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch offers";
      })

      .addCase(createOffer.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.offers.unshift(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create offer";
      })

      .addCase(updateOffer.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.offers = state.offers.map((o) =>
          o.id === action.payload.id ? action.payload : o
        );
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update offer";
      })

      .addCase(deleteOffer.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.offers = state.offers.filter(
          (o) => o.id !== action.payload.id
        );
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete offer";
      })

      .addCase(toggleOfferStatus.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(toggleOfferStatus.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.offers = state.offers.map((o) =>
          o.id === action.payload.id ? action.payload : o
        );
      })
      .addCase(toggleOfferStatus.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to toggle offer status";
      });
  },
});

export const { clearOfferError, clearOfferSubmitError } = offerSlice.actions;
export default offerSlice.reducer;