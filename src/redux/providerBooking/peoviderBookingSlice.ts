import { createSlice } from "@reduxjs/toolkit";
import {
  ProviderBookingDetail,
  ProviderBookingListItem,
  ProviderBookingPagination,
} from "./providerBookingType";
import { getProviderBookings,
   getProviderBookingById,
} from "./providerBookingThunk";

interface ProviderBookingState {
  providerBookings: ProviderBookingListItem[];
  isLoading: boolean;
  error: string | null;
  pagination: ProviderBookingPagination | null;

  // ─── Provider Booking Detail ─────────────────────────────────────────────────
providerBookingDetail: ProviderBookingDetail | null;
isLoadingProviderBookingDetail: boolean;
providerBookingDetailError: string | null;
}

const initialState: ProviderBookingState = {
  providerBookings: [],
  isLoading: false,
  error: null,
  pagination: null,

  
providerBookingDetail: null,
isLoadingProviderBookingDetail: false,
providerBookingDetailError: null,
};

const providerBookingSlice = createSlice({
  name: "providerBooking",
  initialState,
  reducers: {
    clearProviderBookingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProviderBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProviderBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.providerBookings = action.payload?.data || [];
        state.pagination = action.payload?.pagination || null;
      })
      .addCase(getProviderBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch bookings";
      })

      .addCase(getProviderBookingById.pending, (state) => {
  state.isLoadingProviderBookingDetail = true;
  state.providerBookingDetailError = null;
})
.addCase(getProviderBookingById.fulfilled, (state, action) => {
  state.isLoadingProviderBookingDetail = false;
  state.providerBookingDetail = action.payload;
})
.addCase(getProviderBookingById.rejected, (state, action) => {
  state.isLoadingProviderBookingDetail = false;
  state.providerBookingDetailError =
    typeof action.payload === "string" ? action.payload : "Failed to fetch booking";
})
  },
});

export const { clearProviderBookingError } = providerBookingSlice.actions;
export default providerBookingSlice.reducer;