import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllProviders, updateProviderStatus,setProviderCommission } from "../../redux/admin/adminThunk";
import { UpdateProviderStatusRequest } from "../../redux/admin/adminTypes";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { clearError } from "../../redux/admin/adminSlice";
import usePagination from "../sharedHooks/usePagination";

const LIMIT = 3;

const useAdminProviders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { providers, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.admin
  );

  const { currentPage, handlePageChange } = usePagination();

  useEffect(() => {
    dispatch(getAllProviders({ page: currentPage, limit: LIMIT }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  
  const handleSetCommission = async (providerId: string, commissionRate: number) => {
  try {
    await dispatch(setProviderCommission({ providerId, commissionRate })).unwrap();
    showSuccessToast("Commission rate updated successfully");
    dispatch(getAllProviders({ page: currentPage, limit: LIMIT }));
  } catch (err: any) {
    showErrorToast(err || "Failed to update commission");
  }
};

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
      dispatch(getAllProviders({ page: currentPage, limit: LIMIT }));
    } catch (err: any) {
      showErrorToast(err || "Failed to update provider status");
    }
  };

  return {
    providers,
    isLoading,
    error,
    pagination,
    currentPage,
    handlePageChange,
    handleUpdateProviderStatus,
    handleSetCommission,
  };
};

export default useAdminProviders;