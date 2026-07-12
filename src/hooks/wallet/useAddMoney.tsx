import { useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addMoneyToWallet, getUserWallet } from "../../redux/wallet/walletThunk";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

interface UseAddMoneyReturn {
  isModalOpen: boolean;
  isAdding: boolean;
  error: string | null;
  openModal: () => void;
  closeModal: () => void;
  handleAddMoney: (amount: number) => Promise<void>;
}

const useAddMoney = (): UseAddMoneyReturn => {
  const dispatch = useDispatch<AppDispatch>();


  const { isLoadingUserWallet } = useSelector((state: RootState) => state.wallet);

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
        await dispatch(addMoneyToWallet(amount)).unwrap();
        await dispatch(getUserWallet());
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
    isAdding: isLoadingUserWallet,
    error,
    openModal,
    closeModal,
    handleAddMoney,
  };
};

export default useAddMoney;