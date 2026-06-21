import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getProviderWallet } from "../../redux/wallet/walletThunk";

const useProviderWallet = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { providerWallet, isLoadingProviderWallet, providerWalletError } =
    useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    dispatch(getProviderWallet());
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
    wallet: providerWallet,
    isLoading: isLoadingProviderWallet,
    error: providerWalletError,
    formatDate,
  };
};

export default useProviderWallet;