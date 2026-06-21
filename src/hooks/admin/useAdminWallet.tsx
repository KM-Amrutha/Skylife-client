import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAdminWallet } from "../../redux/admin/adminThunk";

const useAdminWallet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { adminWallet, isLoadingAdminWallet, adminWalletError } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    dispatch(getAdminWallet());
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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  return {
    wallet: adminWallet,
    isLoading: isLoadingAdminWallet,
    error: adminWalletError,
    formatDate,
    formatCurrency,
  };
};

export default useAdminWallet;