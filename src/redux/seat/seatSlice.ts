import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllSeatTypes,
  createSeatLayout,
  generateSeats,
  getSeatLayoutsByAircraft,
  deleteSeatLayout,
  getAircraftSeats,
  toggleSeatBlock
} from "./seatThunk";
import {
  SeatType,
  SeatLayout,
  AircraftSeatDTO
} from "./seatType";

interface SeatState {
  seatTypes: SeatType[];
  seatLayouts: SeatLayout[];
    seats: AircraftSeatDTO[];
  isLoading: boolean;
  error: string | null;
  generatedSeatsCount: number;
   isToggling: boolean,
  toggleError: string|null,
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const initialState: SeatState = {
  seatTypes: [],
  seatLayouts: [],
  seats: [],
  isLoading: false,
  error: null,
  generatedSeatsCount: 0,
  isToggling: false,
  toggleError: null
};

const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    clearSeatError: (state) => {
      state.error = null;
    },
    clearGeneratedSeatsCount: (state) => {
      state.generatedSeatsCount = 0;
    },
    resetSeatState: (state) => {
  state.seatLayouts = [];
  state.generatedSeatsCount = 0;
  state.error = null;
},
clearSeats: (state) => {
      state.seats = [];
      state.error = null;
      state.toggleError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all seat types
      .addCase(getAllSeatTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSeatTypes.fulfilled, (state, action: PayloadAction<ApiResponse<SeatType[]>>) => {
        state.isLoading = false;
        state.seatTypes = action.payload.data || [];
        state.error = null;
      })
      .addCase(getAllSeatTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch seat types";
      })
      
      // Create seat layout
      .addCase(createSeatLayout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSeatLayout.fulfilled, (state, action: PayloadAction<ApiResponse<SeatLayout>>) => {
        state.isLoading = false;
          console.log("createSeatLayout fulfilled:", action.payload);
        state.seatLayouts.push(action.payload.data);
         console.log("seatLayouts after push:", state.seatLayouts);
        state.error = null;
      })
      .addCase(createSeatLayout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to create seat layout";
      })

      // Get seat layouts by aircraft
      .addCase(getSeatLayoutsByAircraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSeatLayoutsByAircraft.fulfilled, (state, action: PayloadAction<ApiResponse<SeatLayout[]>>) => {
        state.isLoading = false;
        state.seatLayouts = action.payload.data || [];
        state.error = null;
      })
      .addCase(getSeatLayoutsByAircraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch seat layouts";
      })

      // Generate seats
      .addCase(generateSeats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.generatedSeatsCount = 0;
      })
      .addCase(generateSeats.fulfilled, (state, action: PayloadAction<ApiResponse<{totalSeats: number}>>) => {
        state.isLoading = false;
        state.generatedSeatsCount = action.payload.data.totalSeats || 0;
        state.error = null;
      })
      .addCase(generateSeats.rejected, (state, action) => {
        state.isLoading = false;
        state.generatedSeatsCount = 0;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to generate seats";
      })

      // Delete seat layout
.addCase(deleteSeatLayout.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(deleteSeatLayout.fulfilled, (state, action: PayloadAction<{ layoutId: string }>) => {
  state.isLoading = false;
  // Remove the deleted layout from the array
  state.seatLayouts = state.seatLayouts.filter(
    layout => layout.id !== action.payload.layoutId
  );
  state.error = null;
})
.addCase(deleteSeatLayout.rejected, (state, action) => {
  state.isLoading = false;
  state.error = typeof action.payload === "string" ? action.payload : "Failed to delete seat layout";
})
 .addCase(getAircraftSeats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAircraftSeats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seats = action.payload;
      })
      .addCase(getAircraftSeats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch seats";
      })
      .addCase(toggleSeatBlock.pending, (state) => {
        state.isToggling = true;
        state.toggleError = null;
      })
      .addCase(toggleSeatBlock.fulfilled, (state, action) => {
        state.isToggling = false;
        const { seatId, isBlocked } = action.payload;
        const seat = state.seats.find((s) => s.id === seatId);
        if (seat) seat.isBlocked = isBlocked;
      })
      .addCase(toggleSeatBlock.rejected, (state, action) => {
        state.isToggling = false;
        state.toggleError = typeof action.payload === "string" ? action.payload : "Failed to toggle block";
      });

      
  }
});

export const { clearSeatError, clearGeneratedSeatsCount, resetSeatState,clearSeats } = seatSlice.actions;
export default seatSlice.reducer;