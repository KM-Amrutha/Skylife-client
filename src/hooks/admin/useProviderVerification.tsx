import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getPendingProviders,
  verifyProvider,
  rejectProvider,
} from "../../redux/admin/adminThunk";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const useProviderVerification = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { pendingProviders, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [currentProviderId, setCurrentProviderId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    dispatch(getPendingProviders());
  }, [dispatch]);

  const handleVerifyProvider = async (providerId: string) => {
    try {
      const response = await dispatch(
        verifyProvider({ providerId })
      ).unwrap();

      showSuccessToast(response.message || "Provider verified successfully");

      dispatch(getPendingProviders());
    } catch (error: any) {
      showErrorToast(error || "Failed to verify provider");
    }
  };

  const openRejectModal = (providerId: string) => {
    setCurrentProviderId(providerId);
    setRejectionReason("");
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setCurrentProviderId(null);
    setRejectionReason("");
  };

  const handleConfirmReject = async () => {
    if (!currentProviderId || !rejectionReason.trim()) {
      showErrorToast("Please provide a rejection reason");
      return;
    }

    try {
      const response = await dispatch(
        rejectProvider({
          providerId: currentProviderId,
          reason: rejectionReason.trim(),
        })
      ).unwrap();

      showSuccessToast(response.message || "Provider rejected successfully");

      closeRejectModal();

      dispatch(getPendingProviders());
    } catch (error: any) {
      showErrorToast(error || "Failed to reject provider");
    }
  };

  return {
    pendingProviders,
    isLoading,
    error,
    handleVerifyProvider,
    rejectModalOpen,
    openRejectModal,
    closeRejectModal,
    rejectionReason,
    setRejectionReason,
    handleConfirmReject,
  };
};

export default useProviderVerification;