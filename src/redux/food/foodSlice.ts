import { createSlice } from "@reduxjs/toolkit";
import { FoodResponseDTO } from "./foodType";
import {
  getProviderFoods,
  createFood,
  updateFood,
  deleteFood,
  toggleFoodStatus,
} from "./foodThunk";

interface FoodState {
  foods: FoodResponseDTO[];
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

const initialState: FoodState = {
  foods: [],
  pagination: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
  submitError: null,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    clearFoodError: (state) => {
      state.error = null;
    },
    clearSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProviderFoods.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProviderFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foods = action.payload.foods || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getProviderFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch foods";
      })

      .addCase(createFood.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.foods.unshift(action.payload);
      })
      .addCase(createFood.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create food";
      })

      .addCase(updateFood.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.foods = state.foods.map((f) =>
          f.id === action.payload.id ? action.payload : f
        );
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update food";
      })

      .addCase(deleteFood.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.foods = state.foods.filter(
          (f) => f.id !== action.payload.id
        );
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete food";
      })

      .addCase(toggleFoodStatus.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(toggleFoodStatus.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.foods = state.foods.map((f) =>
          f.id === action.payload.id ? action.payload : f
        );
      })
      .addCase(toggleFoodStatus.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to toggle food status";
      });
  },
});

export const { clearFoodError, clearSubmitError } = foodSlice.actions;
export default foodSlice.reducer;