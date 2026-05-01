import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllUsers, updateUsersStatus } from "../../redux/admin/adminThunk";
import { UpdateUserStatusRequest } from "../../redux/admin/adminTypes";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { clearError } from "../../redux/admin/adminSlice";
import usePagination from "../sharedHooks/usePagination";

const LIMIT = 3;

const useAdminUsers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.admin
  );

  const { currentPage, handlePageChange } = usePagination();

  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage, limit: LIMIT }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleUpdateUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const payload: UpdateUserStatusRequest = { userId, isActive };
      await dispatch(updateUsersStatus(payload)).unwrap();
      showSuccessToast(
        `User has been ${isActive ? "activated" : "blocked"} successfully`
      );
      dispatch(getAllUsers({ page: currentPage, limit: LIMIT }));
    } catch (err: any) {
      showErrorToast(err || "Failed to update user status");
    }
  };

  return {
    users,
    isLoading,
    error,
    pagination,
    currentPage,
    handlePageChange,
    handleUpdateUserStatus,
  };
};

export default useAdminUsers;