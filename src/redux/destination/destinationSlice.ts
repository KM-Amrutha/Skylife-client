import { createSlice } from "@reduxjs/toolkit";
import { Destination } from "./destinationType";
import { searchDestinations } from "./destinationThunk";

interface DestinationsState {
  destinations: Destination[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DestinationsState = {
  destinations: [],
  isLoading: false,
  error: null,
};

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    clearDestinationsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDestinations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchDestinations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.destinations = action.payload.data || [];
        state.error = null;
      })
      .addCase(searchDestinations.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch destinations";
      });
  },
});

export const { clearDestinationsError } = destinationsSlice.actions;
export default destinationsSlice.reducer;
