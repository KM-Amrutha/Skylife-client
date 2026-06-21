import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getAdminDashboard,
} from "../../redux/admin/adminThunk";


const useAdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {dashboardStats, isLoadingDashboard } = useSelector(
    (state: RootState) => state.admin
  );

   useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);


  return {
   
     dashboardStats,
    isLoadingDashboard,
    
  };
};
export default useAdminDashboard;