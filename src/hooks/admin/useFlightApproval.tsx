import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getPendingFlights,
  approveFlight,
} from "../../redux/flight/flightThunk";
import { clearFlightError } from "../../redux/flight/flightSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const useFlightApproval = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pendingFlights, isLoading, error } = useSelector(
    (state: RootState) => state.flight
  );

  useEffect(() => {
    dispatch(getPendingFlights());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
      dispatch(clearFlightError());
    }
  }, [error, dispatch]);

  const handleApproveFlight = async (flightId: string) => {
    try {
      await dispatch(approveFlight({ flightId, status: "approved" })).unwrap();
      showSuccessToast("Flight approved successfully");
    } catch (err) {
      showErrorToast("Failed to approve flight");
    }
  };

  const handleRejectFlight = async (flightId: string, reason: string) => {
    try {
      await dispatch(
        approveFlight({ flightId, status: "rejected", reason })
      ).unwrap();
      showSuccessToast("Flight rejected");
    } catch (err) {
      showErrorToast("Failed to reject flight");
    }
  };

  return {
    pendingFlights,
    isLoading,
    handleApproveFlight,
    handleRejectFlight,
  };
};

export default useFlightApproval;