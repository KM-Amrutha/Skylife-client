import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getProviderFoods,
  createFood,
  updateFood,
  deleteFood,
  toggleFoodStatus,
} from "../../redux/food/foodThunk";
import { clearFoodError, clearSubmitError } from "../../redux/food/foodSlice";
import { CreateFoodDTO, UpdateFoodDTO, FoodResponseDTO } from "../../redux/food/foodType";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const useProviderFood = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { foods, pagination, isLoading, error, isSubmitting, submitError } =
    useSelector((state: RootState) => state.food);



  const [currentPage, setCurrentPage] = useState(1);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodResponseDTO | null>(null);
  const [deletingFoodId, setDeletingFoodId] = useState<string | null>(null);

  // ─── Load foods on mount and page change ─────────────────────────────────
  useEffect(() => {
    dispatch(getProviderFoods({ page: currentPage, limit: 3 }));
  }, [currentPage, dispatch]);

  // ─── Show errors as toasts ────────────────────────────────────────────────
  useEffect(() => {
    if (error) {
      showErrorToast(error);
      dispatch(clearFoodError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (submitError) {
      showErrorToast(submitError);
      dispatch(clearSubmitError());
    }
  }, [submitError, dispatch]);

  // ─── Open create modal ────────────────────────────────────────────────────
  const handleOpenCreate = useCallback(() => {
    setEditingFood(null);
    setIsFormModalOpen(true);
  }, []);

  // ─── Open edit modal ──────────────────────────────────────────────────────
  const handleOpenEdit = useCallback((food: FoodResponseDTO) => {
    setEditingFood(food);
    setIsFormModalOpen(true);
  }, []);

  // ─── Close modal ──────────────────────────────────────────────────────────
  const handleCloseModal = useCallback(() => {
    setIsFormModalOpen(false);
    setEditingFood(null);
  }, []);

  // ─── Create food ──────────────────────────────────────────────────────────
  const handleCreate = useCallback(
    async (data: CreateFoodDTO) => {
      try {
        await dispatch(createFood(data)).unwrap();
        showSuccessToast("Food item created successfully");
        handleCloseModal();
      } catch (err: any) {
        showErrorToast(err || "Failed to create food");
      }
    },
    [dispatch, handleCloseModal]
  );

  // ─── Update food ──────────────────────────────────────────────────────────
  const handleUpdate = useCallback(
    async (foodId: string, data: UpdateFoodDTO) => {
      try {
        await dispatch(updateFood({ foodId, data })).unwrap();
        showSuccessToast("Food item updated successfully");
        handleCloseModal();
      } catch (err: any) {
        showErrorToast(err || "Failed to update food");
      }
    },
    [dispatch, handleCloseModal]
  );

  // ─── Delete food ──────────────────────────────────────────────────────────
  const handleDeleteClick = useCallback((foodId: string) => {
    setDeletingFoodId(foodId);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingFoodId) return;
    try {
      await dispatch(deleteFood(deletingFoodId)).unwrap();
      showSuccessToast("Food item deleted successfully");
      setDeletingFoodId(null);
    } catch (err: any) {
      showErrorToast(err || "Failed to delete food");
    }
  }, [deletingFoodId, dispatch]);

  const handleDeleteCancel = useCallback(() => {
    setDeletingFoodId(null);
  }, []);

  // ─── Toggle status ────────────────────────────────────────────────────────
  const handleToggleStatus = useCallback(
    async (foodId: string) => {
      try {
        await dispatch(toggleFoodStatus(foodId)).unwrap();
        showSuccessToast("Food status updated");
      } catch (err: any) {
        showErrorToast(err || "Failed to toggle food status");
      }
    },
    [dispatch]
  );
 

  // ─── Pagination ───────────────────────────────────────────────────────────
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    foods,
    pagination,
    isLoading,
    isSubmitting,
    currentPage,
    isFormModalOpen,
    editingFood,
    deletingFoodId,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleCreate,
    handleUpdate,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleToggleStatus,
    handlePageChange,
  };
};

export default useProviderFood;