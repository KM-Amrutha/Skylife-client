import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getBookingSeatsMap, lockSeat } from "../../redux/booking/bookingThunk";
import { clearSeatLockError } from "../../redux/booking/bookingSlice";
import { PassengerFormData } from "../../redux/booking/bookingType";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const useSeatSelection = (
  sessionId: string,
  passengers: PassengerFormData[]
) => {
  const dispatch = useDispatch<AppDispatch>();

  const { seatsMap, isLoadingSeatsMap, seatsMapError, lockedSeats, isLockingSeat, seatLockError } =
    useSelector((state: RootState) => state.booking);

  // ─── Load seat map on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (!sessionId) return;
    dispatch(getBookingSeatsMap(sessionId));
  }, [sessionId, dispatch]);

  // ─── Show seat lock error as toast ────────────────────────────────────────
  useEffect(() => {
    if (seatLockError) {
      showErrorToast(seatLockError);
      dispatch(clearSeatLockError());
    }
  }, [seatLockError, dispatch]);

  // ─── Check if a seat is locked by current passenger ───────────────────────
  const getLockedSeatForPassenger = useCallback(
    (flightId: string, passengerId: string) => {
      const key = `${flightId}__${passengerId}`;
      return lockedSeats[key] ?? null;
    },
    [lockedSeats]
  );

  // ─── Check if a seat is locked by any other passenger ────────────────────
  const isSeatLockedByOther = useCallback(
    (flightId: string, flightSeatId: string, currentPassengerId: string) => {
      return Object.entries(lockedSeats).some(([key, entry]) => {
        const [keyFlightId, keyPassengerId] = key.split("__");
        return (
          keyFlightId === flightId &&
          keyPassengerId !== currentPassengerId &&
          entry.flightSeatId === flightSeatId
        );
      });
    },
    [lockedSeats]
  );

  // ─── Handle seat selection ────────────────────────────────────────────────
  const handleSelectSeat = useCallback(
    async (
      flightId: string,
      passengerId: string,
      seat: {
        flightSeatId: string;
        seatNumber: string;
        cabinClass: string;
        position: string;
        baseFare: number;
        seatSurcharge: number;
      }
    ) => {
      // Prevent selecting a seat locked by another passenger
      if (isSeatLockedByOther(flightId, seat.flightSeatId, passengerId)) {
        showErrorToast("This seat is selected by another passenger");
        return;
      }

      // Prevent re-locking the same seat
      const existing = getLockedSeatForPassenger(flightId, passengerId);
      if (existing?.flightSeatId === seat.flightSeatId) return;

      try {
        await dispatch(
          lockSeat({
            sessionId,
            flightId,
            flightSeatId: seat.flightSeatId,
            passengerId,
            cabinClass: seat.cabinClass,
            position: seat.position,
            baseFare: seat.baseFare,
            seatSurcharge: seat.seatSurcharge,
          })
        ).unwrap();
        showSuccessToast(`Seat ${seat.seatNumber} locked`);
      } catch (err: any) {
        showErrorToast(err || "Failed to lock seat");
      }
    },
    [sessionId, dispatch, getLockedSeatForPassenger, isSeatLockedByOther]
  );

  // ─── Validate all seats are selected ─────────────────────────────────────
  const validateSeats = useCallback((): string | null => {
    if (!seatsMap) return "Seat map not loaded";
    for (const flight of seatsMap.flights) {
      for (const passenger of passengers) {
        const key = `${flight.flightId}__${passenger.passengerId}`;
        if (!lockedSeats[key]) {
          return `Please select a seat for ${passenger.name || "passenger"} on flight ${flight.flightNumber}`;
        }
      }
    }
    return null;
  }, [seatsMap, passengers, lockedSeats]);

  return {
    seatsMap,
    isLoadingSeatsMap,
    seatsMapError,
    lockedSeats,
    isLockingSeat,
    handleSelectSeat,
    getLockedSeatForPassenger,
    isSeatLockedByOther,
    validateSeats,
  };
};

export default useSeatSelection;