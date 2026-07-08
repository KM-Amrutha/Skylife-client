import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addMoneyToProviderWallet, getProviderWallet } from "../../redux/wallet/walletThunk";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

interface UseAddMoneyProviderReturn {
  isModalOpen: boolean;
  isAdding: boolean;
  error: string | null;
  openModal: () => void;
  closeModal: () => void;
  handleAddMoney: (amount: number) => Promise<void>;
}

const useAddMoneyProvider = (): UseAddMoneyProviderReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoadingProviderWallet } = useSelector((state: RootState) => state.wallet);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setError(null);
  }, []);

  const handleAddMoney = useCallback(
    async (amount: number) => {
      if (!amount || amount < 1) {
        setError("Enter a valid amount");
        return;
      }
      if (amount > 500000) {
        setError("Maximum top-up is ₹5,00,000");
        return;
      }

      try {
        await dispatch(addMoneyToProviderWallet(amount)).unwrap();
        await dispatch(getProviderWallet());
        showSuccessToast(`₹${amount.toLocaleString("en-IN")} added to wallet`);
        closeModal();
      } catch (err: any) {
        showErrorToast(err || "Failed to add money");
      }
    },
    [dispatch, closeModal]
  );

  return {
    isModalOpen,
    isAdding: isLoadingProviderWallet,
    error,
    openModal,
    closeModal,
    handleAddMoney,
  };
};

export default useAddMoneyProvider;