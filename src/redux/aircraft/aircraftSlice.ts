import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Aircraft } from "./aircraftTypes";
import {
  getProviderAircrafts,
  createAircraft,
  updateAircraft,
  deleteAircraft,
} from "./aircraftThunk";

interface AircraftState {
  aircrafts: Aircraft[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AircraftState = {
  aircrafts: [],
  isLoading: false,
  error: null,
};

const aircraftSlice = createSlice({
  name: "aircraft",
  initialState,
  reducers: {
    clearAircraftError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProviderAircrafts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProviderAircrafts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.aircrafts = action.payload.data || [];
        state.error = null;
      })
      .addCase(getProviderAircrafts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch aircrafts";
      })

      .addCase(createAircraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAircraft.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) {
          state.aircrafts.push(action.payload.data);
        }
        state.error = null;
      })
      .addCase(createAircraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create aircraft";
      })

    //   upcoming uses

      .addCase(updateAircraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAircraft.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedAircraft = action.payload.data;
        state.aircrafts = state.aircrafts.map((ac) =>
          ac._id === updatedAircraft._id ? updatedAircraft : ac
        );
        state.error = null;
      })
      .addCase(updateAircraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update aircraft";
      })

      .addCase(deleteAircraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAircraft.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg;
        state.aircrafts = state.aircrafts.filter(ac => ac._id !== deletedId);
        state.error = null;
      })
      .addCase(deleteAircraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete aircraft";
      });
  },
});

export const { clearAircraftError } = aircraftSlice.actions;
export default aircraftSlice.reducer;
