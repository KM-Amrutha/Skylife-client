import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getAllProviders,
  updateProviderStatus,
} from "../redux/admin/adminThunk";
import { UpdateProviderStatusRequest } from "../redux/admin/adminTypes";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { clearError } from "../redux/admin/adminSlice"; // assuming you have this

const useAdminProviders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { providers, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  // Fetch all providers on mount
  useEffect(() => {
    dispatch(getAllProviders());
  }, [dispatch]);

  // Show error toast when error changes
  useEffect(() => {
    if (error) {
      showErrorToast(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Handler to update provider status (activate/block)
  const handleUpdateProviderStatus = async (
    providerId: string,
    isActive: boolean
  ) => {
    try {
      const payload: UpdateProviderStatusRequest = { providerId, isActive };
      await dispatch(updateProviderStatus(payload)).unwrap();
      showSuccessToast(
        `Provider has been ${isActive ? "activated" : "blocked"} successfully`
      );
    } catch (err: any) {
      showErrorToast(err || "Failed to update provider status");
    }
  };

  return {
    providers,
    isLoading,
    error,
    handleUpdateProviderStatus,
  };
};

export default useAdminProviders;