import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getFoodsByAircraft } from "../../redux/booking/bookingThunk";
import { setFoodQuantity, clearFoodSelection } from "../../redux/booking/bookingSlice";
import { BookingSegmentFlight } from "../../redux/booking/bookingType";

const useFoodSelection = (segments: BookingSegmentFlight[]) => {
  const dispatch = useDispatch<AppDispatch>();

  const { foodsByAircraft, isLoadingFoods, foodsError, foodSelection } =
    useSelector((state: RootState) => state.booking);
  // ─── Load foods for each unique aircraft on mount ─────────────────────────
  useEffect(() => {
    if (!segments.length) return;

    const uniqueAircraftIds = [
      ...new Set(segments.map((s) => s.aircraftId)),
    ];

    uniqueAircraftIds.forEach((aircraftId) => {
      // Only fetch if not already loaded
      if (!foodsByAircraft[aircraftId]) {
        dispatch(getFoodsByAircraft(aircraftId));
      }
    });
  }, [segments, dispatch, foodsByAircraft]);

  // ─── Get foods for a specific flight (via aircraftId) ────────────────────
  const getFoodsForFlight = useCallback(
    (aircraftId: string) => {
      return foodsByAircraft[aircraftId] ?? [];
    },
    [foodsByAircraft]
  );
  

  // ─── Get quantity for a specific food item on a flight ───────────────────
  const getQuantity = useCallback(
    (flightId: string, foodId: string): number => {
      return foodSelection[flightId]?.[foodId] ?? 0;
    },
    [foodSelection]
  );

  // ─── Increment quantity ───────────────────────────────────────────────────
  const incrementFood = useCallback(
    (flightId: string, foodId: string) => {
      const current = foodSelection[flightId]?.[foodId] ?? 0;
      dispatch(setFoodQuantity({ flightId, foodId, quantity: current + 1 }));
    },
    [dispatch, foodSelection]
  );

  // ─── Decrement quantity ───────────────────────────────────────────────────
  const decrementFood = useCallback(
    (flightId: string, foodId: string) => {
      const current = foodSelection[flightId]?.[foodId] ?? 0;
      if (current <= 0) return;
      dispatch(setFoodQuantity({ flightId, foodId, quantity: current - 1 }));
    },
    [dispatch, foodSelection]
  );

  // ─── Get total food items count for a flight ──────────────────────────────
  const getFlightFoodTotal = useCallback(
    (flightId: string, aircraftId: string): number => {
      const flightFoods = foodSelection[flightId] ?? {};
      const foods = foodsByAircraft[aircraftId] ?? [];
      return Object.entries(flightFoods).reduce((total, [foodId, qty]) => {
        const food = foods.find((f) => f.id === foodId);
        return total + (food ? food.foodPrice * qty : 0);
      }, 0);
    },
    [foodSelection, foodsByAircraft]
  );

  // ─── Build flightFoods payload for saveBookingDetails ────────────────────
  const buildFlightFoodsPayload = useCallback((): {
    flightId: string;
    items: { foodId: string; quantity: number }[];
  }[] => {
    return segments
      .map((segment) => {
        const flightFoods = foodSelection[segment.flightId] ?? {};
        const items = Object.entries(flightFoods)
          .filter(([, qty]) => qty > 0)
          .map(([foodId, quantity]) => ({ foodId, quantity }));
        return { flightId: segment.flightId, items };
      })
      .filter((f) => f.items.length > 0);
  }, [segments, foodSelection]);

  // ─── Clear all food selections ────────────────────────────────────────────
  const handleClearFoodSelection = useCallback(() => {
    dispatch(clearFoodSelection());
  }, [dispatch]);

  return {
    foodsByAircraft,
    isLoadingFoods,
    foodsError,
    foodSelection,
    getFoodsForFlight,
    getQuantity,
    incrementFood,
    decrementFood,
    getFlightFoodTotal,
    buildFlightFoodsPayload,
    handleClearFoodSelection,
  };
};

export default useFoodSelection;