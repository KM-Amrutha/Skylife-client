import { createSlice} from "@reduxjs/toolkit";
import { Aircraft } from "./aircraftTypes";
import {
  getProviderAircrafts,
  createAircraft,
  updateAircraft,
  deleteAircraft,
   getAvailableAircraftsForSchedule 
} from "./aircraftThunk";


interface AircraftState {
  aircrafts: Aircraft[];
  isLoading: boolean;
  error: string | null;

    availableForSchedule: Aircraft[];
  isLoadingAvailableForSchedule: boolean;
  availableForScheduleError: string | null;
}

const initialState: AircraftState = {
  aircrafts: [],
  isLoading: false,
  error: null,

   availableForSchedule: [],
  isLoadingAvailableForSchedule: false,
  availableForScheduleError: null
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
      })

      .addCase(getAvailableAircraftsForSchedule.pending, (state) => {
  state.isLoadingAvailableForSchedule = true;
  state.availableForScheduleError = null;
})
.addCase(getAvailableAircraftsForSchedule.fulfilled, (state, action) => {
  state.isLoadingAvailableForSchedule = false;
  state.availableForSchedule = action.payload.data || [];
  state.availableForScheduleError = null;
})
.addCase(getAvailableAircraftsForSchedule.rejected, (state, action) => {
  state.isLoadingAvailableForSchedule = false;
  state.availableForSchedule = [];
  state.availableForScheduleError = 
    typeof action.payload === "string" ? action.payload : "Failed to fetch available aircrafts";
})
  },

})






export const { clearAircraftError } = aircraftSlice.actions;
export default aircraftSlice.reducer;
