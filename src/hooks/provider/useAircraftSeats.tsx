import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAircraftSeats, toggleSeatBlock } from "../../redux/seat/seatThunk";
import { clearSeats } from "../../redux/seat/seatSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const useAircraftSeats = (aircraftId: string | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { seats, isLoading, error, isToggling, toggleError } = useSelector(
    (state: RootState) => state.seat
  );
  const [blockReasonInput, setBlockReasonInput] = useState("");
  const [pendingSeatId, setPendingSeatId] = useState<string | null>(null);

  useEffect(() => {
    if (aircraftId) {
      dispatch(getAircraftSeats(aircraftId));
    }
    return () => {
      dispatch(clearSeats());
    };
  }, [aircraftId, dispatch]);

  const handleToggleBlock = useCallback(
    async (seatId: string, currentlyBlocked: boolean) => {
      if (!aircraftId) return;

      if (!currentlyBlocked && !blockReasonInput.trim()) {
        showErrorToast("Please provide a reason for blocking this seat");
        return;
      }

      const result = await dispatch(
        toggleSeatBlock({
          aircraftId,
          seatId,
          blockReason: currentlyBlocked ? undefined : blockReasonInput.trim(),
        })
      );

      if (toggleSeatBlock.fulfilled.match(result)) {
        const data = result.payload;
        showSuccessToast(
          data.isBlocked
            ? `Seat blocked. ${data.affectedFlightSeats} flight seat(s) updated.${data.refundIssued ? ` The ₹amount refunded to passenger.` : ""}`
            : `Seat unblocked. ${data.affectedFlightSeats} flight seat(s) updated.`
        );
        setBlockReasonInput("");
        setPendingSeatId(null);
      } else {
        showErrorToast(toggleError || "Failed to toggle seat block");
      }
    },
    [aircraftId, blockReasonInput, dispatch, toggleError]
  );

  return {
    seats,
    isLoading,
    error,
    isToggling,
    blockReasonInput,
    setBlockReasonInput,
    pendingSeatId,
    setPendingSeatId,
    handleToggleBlock,
  };
};

export default useAircraftSeats;