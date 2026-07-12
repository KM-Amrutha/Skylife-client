import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getProviderOffers,
  deleteOffer,
  toggleOfferStatus,
} from "../../redux/offer/offerThunk";
import { clearOfferError, clearOfferSubmitError } from "../../redux/offer/offerSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const useProviderOffer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { offers, pagination, isLoading, error, isSubmitting, submitError } =
    useSelector((state: RootState) => state.offer);

  const [currentPage, setCurrentPage] = useState(1);
  const [deletingOfferId, setDeletingOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProviderOffers({ page: currentPage, limit: 4 }));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
      dispatch(clearOfferError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (submitError) {
      showErrorToast(submitError);
      dispatch(clearOfferSubmitError());
    }
  }, [submitError, dispatch]);

  const handleDeleteClick = useCallback((offerId: string) => {
    setDeletingOfferId(offerId);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingOfferId) return;
    try {
      await dispatch(deleteOffer(deletingOfferId)).unwrap();
      showSuccessToast("Offer deleted successfully");
      setDeletingOfferId(null);
    } catch (err: any) {
      showErrorToast(err || "Failed to delete offer");
    }
  }, [deletingOfferId, dispatch]);

  const handleDeleteCancel = useCallback(() => {
    setDeletingOfferId(null);
  }, []);

  const handleToggleStatus = useCallback(
    async (offerId: string) => {
      try {
        await dispatch(toggleOfferStatus(offerId)).unwrap();
        console.log("toggle offerId", offerId);
        showSuccessToast("Offer status updated");
      } catch (err: any) {
        showErrorToast(err || "Failed to toggle offer status");
      }
    },
    [dispatch]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  console.log(" useproviders offers", offers);
  return {
    offers,
    pagination,
    isLoading,
    isSubmitting,
    currentPage,
    deletingOfferId,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleToggleStatus,
    handlePageChange,
  };
};

export default useProviderOffer;