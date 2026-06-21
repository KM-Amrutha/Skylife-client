import { createSlice } from "@reduxjs/toolkit";
import { FlightDetails, SearchFlightsRequest,SearchFlightResult,SearchFlightResponse,
   FlightSeatMapDTO, RecurringFlightResultDTO } from "./flightTypes";
import {
  getProviderFlights,
  createFlight,
  getPendingFlights,
  approveFlight,
  updateFlight,
  searchFlights,
  deleteFlight,
   getFlightSeats,
   createRecurringFlight,
   getFlightById,
  getAdminFlights,
  rejectSingleFlight,
  
} from "./flightThunk";

interface FlightState {
  providerFlights: FlightDetails[];
  pendingFlights: FlightDetails[];
   searchResults: SearchFlightResponse | null;
  searchParams: SearchFlightsRequest | null;
  isSearching: boolean;
  searchError: string | null;
  isLoading: boolean;
  error: string | null;
   pagination: { totalPages: number; currentPage: number } | null;
   flightSeats: FlightSeatMapDTO[];
  isLoadingSeats: boolean;
  seatsError: string | null;

  recurringResult: RecurringFlightResultDTO | null;
isCreatingRecurring: boolean;
recurringError: string | null;

selectedFlight: FlightDetails | null;
isLoadingSelectedFlight: boolean;
selectedFlightError: string | null;

adminFlights: FlightDetails[];
isLoadingAdminFlights: boolean;
adminFlightsError: string | null;
adminFlightsPagination: { totalPages: number; currentPage: number } | null;
searchPagination: {
  outbound: { currentPage: number; totalPages: number; totalCount: number };
  return?: { currentPage: number; totalPages: number; totalCount: number };
} | null;
}

const initialState: FlightState = {
  providerFlights: [],
  pendingFlights: [],
    searchResults: null,
  searchParams: null,
  isSearching: false,
  searchError: null,
  isLoading: false,
  error: null,
  pagination: null,
  flightSeats: [],
  isLoadingSeats: false,
  seatsError: null,
  recurringResult: null,
isCreatingRecurring: false,
recurringError: null,
selectedFlight: null,
isLoadingSelectedFlight: false,
selectedFlightError: null,
adminFlights: [],
isLoadingAdminFlights: false,
adminFlightsError: null,
adminFlightsPagination: null,
searchPagination: null,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    clearFlightError: (state) => {
      state.error = null;
    },
   clearSearchResults: (state) => {
  state.searchResults = null;
  state.searchParams = null;
  state.searchError = null;
  state.searchPagination = null;
},
  clearFlightSeats: (state) => {
  state.flightSeats = [];
  state.seatsError = null;
},
clearRecurringResult: (state) => {
  state.recurringResult = null;
  state.recurringError = null;
},
clearSelectedFlight: (state) => {
  state.selectedFlight = null;
  state.selectedFlightError = null;
},

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
  state.providerFlights = action.payload.flights||[];
  state.pagination = action.payload.pagination|| null;
  state.error = null;
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
      .addCase(createFlight.fulfilled, (state) => {
        state.isLoading = false;
        // if (action.payload.data) {
          // state.providerFlights.push(action.payload.data);
        // }
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
          (f) => f.id !== updated.id
        );
        // Update in providerFlights if present
        state.providerFlights = state.providerFlights.map((f) =>
          f.id === updated.id ? updated : f
        );
      })
      .addCase(approveFlight.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update flight approval";
      })

      .addCase(getAdminFlights.pending, (state) => {
  state.isLoadingAdminFlights = true;
  state.adminFlightsError = null;
})
.addCase(getAdminFlights.fulfilled, (state, action) => {
  state.isLoadingAdminFlights = false;
  state.adminFlights = action.payload.flights || [];
  state.adminFlightsPagination = action.payload.pagination || null;
})
.addCase(getAdminFlights.rejected, (state, action) => {
  state.isLoadingAdminFlights = false;
  state.adminFlightsError =
    typeof action.payload === "string" ? action.payload : "Failed to fetch flights";
})

.addCase(rejectSingleFlight.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(rejectSingleFlight.fulfilled, (state, action) => {
  state.isLoading = false;
  const rejected = action.payload.data as FlightDetails;
  state.adminFlights = state.adminFlights.filter(
    (f) => f.id !== rejected.id
  );
})
.addCase(rejectSingleFlight.rejected, (state, action) => {
  state.isLoading = false;
  state.error =
    typeof action.payload === "string" ? action.payload : "Failed to reject flight";
})

            // Update Flight (edit or reschedule)
      .addCase(updateFlight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFlight.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedFlight = action.payload.data as FlightDetails;

        // Replace in providerFlights array
        state.providerFlights = state.providerFlights.map((flight) =>
          flight.id === updatedFlight.id ? updatedFlight : flight
        );
      })
      .addCase(updateFlight.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update flight";
      })
.addCase(getFlightById.pending, (state) => {
  state.isLoadingSelectedFlight = true;
  state.selectedFlightError = null;
  state.selectedFlight = null;
})
.addCase(getFlightById.fulfilled, (state, action) => {
  state.isLoadingSelectedFlight = false;
  state.selectedFlight = action.payload.data || null;
})
.addCase(getFlightById.rejected, (state, action) => {
  state.isLoadingSelectedFlight = false;
  state.selectedFlightError =
    typeof action.payload === "string" ? action.payload : "Failed to fetch flight";
})

      // Search flights
.addCase(searchFlights.pending, (state) => {
  state.isSearching = true;
  state.searchError = null;
  state.searchResults = null;
})
.addCase(searchFlights.fulfilled, (state, action) => {
  state.isSearching = false;
  state.searchResults = action.payload.data || null;
  state.searchPagination = action.payload.data?.pagination || null;
})
.addCase(searchFlights.rejected, (state, action) => {
  state.isSearching = false;
  state.searchError =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to search flights";
})

.addCase(deleteFlight.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(deleteFlight.fulfilled, (state, action) => {
  state.isLoading = false;
  const deletedFlight = action.payload.data as FlightDetails;
  state.providerFlights = state.providerFlights.filter(
    (f) => f.id !== deletedFlight.id
  );
})
.addCase(deleteFlight.rejected, (state, action) => {
  state.isLoading = false;
  state.error =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to delete flight";
})
    
.addCase(getFlightSeats.pending, (state) => {
  state.isLoadingSeats = true;
  state.seatsError = null;
  state.flightSeats = [];
})
.addCase(getFlightSeats.fulfilled, (state, action) => {
  state.isLoadingSeats = false;
  state.flightSeats = action.payload;
  
})
.addCase(getFlightSeats.rejected, (state, action) => {
  state.isLoadingSeats = false;
  state.seatsError =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to fetch flight seats";
})
.addCase(createRecurringFlight.pending, (state) => {
  state.isCreatingRecurring = true;
  state.recurringError = null;
  state.recurringResult = null;
})
.addCase(createRecurringFlight.fulfilled, (state, action) => {
  state.isCreatingRecurring = false;
  state.recurringResult = action.payload.data || null;
})
.addCase(createRecurringFlight.rejected, (state, action) => {
  state.isCreatingRecurring = false;
  state.recurringError =
    typeof action.payload === "string"
      ? action.payload
      : "Failed to create recurring flights";
})



  }
});

export const { clearFlightError, clearSearchResults,
  clearFlightSeats,clearRecurringResult,clearSelectedFlight } = flightSlice.actions;
export default flightSlice.reducer;
