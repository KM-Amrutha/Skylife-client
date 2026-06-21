import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUserWallet } from "../../redux/wallet/walletThunk";

const useUserWallet = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userWallet, isLoadingUserWallet, userWalletError } = useSelector(
    (state: RootState) => state.wallet
  );

  useEffect(() => {
    dispatch(getUserWallet());
  }, [dispatch]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return {
    wallet: userWallet,
    isLoading: isLoadingUserWallet,
    error: userWalletError,
    formatDate,
  };
};

export default useUserWallet;