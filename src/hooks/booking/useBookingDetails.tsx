import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { saveBookingDetails } from "../../redux/booking/bookingThunk";
import { setSavedPassengers } from "../../redux/booking/bookingSlice"
import usePassengerForm from "./usePassengerForm";
import useSeatSelection from "./useSeatSelection";
import useFoodSelection from "./useFoodSelection";
import { showErrorToast } from "../../utils/toast";

type Step = "passengers" | "seats" | "food" | "review";

const useBookingDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();

  const { segment, isSavingDetails, saveDetailsError } = useSelector(
    (state: RootState) => state.booking
  );
  const savedPassengers = useSelector(
  (state: RootState) => state.booking.savedPassengers
);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });


  const [currentStep, setCurrentStep] = useState<Step>("passengers");

  // ─── Sub hooks ────────────────────────────────────────────────────────────
 const passengerForm = usePassengerForm(
  segment?.passengerCount ?? 1,
  savedPassengers
);

  const seatSelection = useSeatSelection(
    sessionId ?? "",
    passengerForm.passengers
  );

  const foodSelection = useFoodSelection(segment?.segments ?? []);

  // ─── Step navigation ──────────────────────────────────────────────────────
  const goToStep = useCallback(
    (step: Step) => {
      // Validate before advancing

      if (step === "seats") {
        const error = passengerForm.validateAll();
        if (error) {
          showErrorToast(error);
          return;
        }
      }

      if (step === "food") {
        const error = seatSelection.validateSeats();
        if (error) {
          showErrorToast(error);
          return;
        }
      }

      if (step === "review") {
        // food is optional — no validation needed
      }

      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [passengerForm, seatSelection]
  );

  const goBack = useCallback(() => {
    if (currentStep === "seats") return setCurrentStep("passengers");
    if (currentStep === "food") return setCurrentStep("seats");
    if (currentStep === "review") return setCurrentStep("food");
    // passengers step — back to segment page
    navigate(`/user/bookings/${sessionId}/segment`);
  }, [currentStep, sessionId, navigate]);

  // ─── Build and submit final payload ──────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!sessionId || !segment) return;

    // Final validations
    const passengerError = passengerForm.validateAll();
    if (passengerError) {
      showErrorToast(passengerError);
      setCurrentStep("passengers");
      return;
    }

    const seatError = seatSelection.validateSeats();
    if (seatError) {
      showErrorToast(seatError);
      setCurrentStep("seats");
      return;
    }

    // Build passengers payload
    const passengers = passengerForm.passengers.map((p) => ({
      passengerId: p.passengerId,
      name: p.name,
      dob: p.dob,
      gender: p.gender,
      address: p.address,
      mobile: p.mobile,
      extraLuggageKg: p.extraLuggageKg,
      seats: segment.segments.map((seg) => {
        const locked = seatSelection.getLockedSeatForPassenger(
          seg.flightId,
          p.passengerId
        );
        return {
          flightId: seg.flightId,
          flightSeatId: locked!.flightSeatId,
        };
      }),
    }));

    // Build food payload
    const flightFoods = foodSelection.buildFlightFoodsPayload();
    try {
      
      await dispatch(
  saveBookingDetails({ sessionId, passengers, flightFoods })
).unwrap();

dispatch(setSavedPassengers(passengerForm.passengers));

navigate(`/user/bookings/${sessionId}/summary`);
    } catch (err: any) {
      showErrorToast(err || "Failed to save booking details");
    }
  }, [
    sessionId,
    segment,
    passengerForm,
    seatSelection,
    foodSelection,
    dispatch,
    navigate,
  ]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h${m > 0 ? ` ${m}m` : ""}`;
  };

  return {
    sessionId,
    segment,
    currentStep,
    isSavingDetails,
    saveDetailsError,
    goToStep,
    goBack,
    handleSubmit,
    formatTime,
    formatDuration,
    formatDate,
    // passenger form
    passengers: passengerForm.passengers,
    updatePassenger: passengerForm.updatePassenger,
    syncPassengerCount: passengerForm.syncPassengerCount,
    // seat selection
    seatsMap: seatSelection.seatsMap,
    isLoadingSeatsMap: seatSelection.isLoadingSeatsMap,
    seatsMapError: seatSelection.seatsMapError,
    lockedSeats: seatSelection.lockedSeats,
    isLockingSeat: seatSelection.isLockingSeat,
    handleSelectSeat: seatSelection.handleSelectSeat,
    getLockedSeatForPassenger: seatSelection.getLockedSeatForPassenger,
    isSeatLockedByOther: seatSelection.isSeatLockedByOther,
    // food selection
    foodsByAircraft: foodSelection.foodsByAircraft,
    isLoadingFoods: foodSelection.isLoadingFoods,
    foodsError: foodSelection.foodsError,
    foodSelection: foodSelection.foodSelection,
    getFoodsForFlight: foodSelection.getFoodsForFlight,
    getQuantity: foodSelection.getQuantity,
    incrementFood: foodSelection.incrementFood,
    decrementFood: foodSelection.decrementFood,
    getFlightFoodTotal: foodSelection.getFlightFoodTotal,
  };
};

export default useBookingDetails;