import { createSlice } from "@reduxjs/toolkit";
import { FlightDetails } from "./flightTypes";
import {
  getProviderFlights,
  createFlight,
  getPendingFlights,
  approveFlight
} from "./flightThunk";

interface FlightState {
  providerFlights: FlightDetails[];
  pendingFlights: FlightDetails[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  providerFlights: [],
  pendingFlights: [],
  isLoading: false,
  error: null
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    clearFlightError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Provider flights
      .addCase(getProviderFlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProviderFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.providerFlights = action.payload.data || [];
      })
      .addCase(getProviderFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch flights";
      })

      // Create flight
      .addCase(createFlight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFlight.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) {
          state.providerFlights.push(action.payload.data);
        }
      })
      .addCase(createFlight.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create flight";
      })

      // Pending flights (admin)
      .addCase(getPendingFlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPendingFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingFlights = action.payload.data || [];
      })
      .addCase(getPendingFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch pending flights";
      })

      // Approve / reject
      .addCase(approveFlight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveFlight.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload.data as FlightDetails;
        // Remove from pending list
        state.pendingFlights = state.pendingFlights.filter(
          (f) => f._id !== updated._id
        );
        // Update in providerFlights if present
        state.providerFlights = state.providerFlights.map((f) =>
          f._id === updated._id ? updated : f
        );
      })
      .addCase(approveFlight.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update flight approval";
      });
  }
});

export const { clearFlightError } = flightSlice.actions;
export default flightSlice.reducer;
