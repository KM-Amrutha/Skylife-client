import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { getAdminDashboard } from "../../redux/admin/adminThunk";

const ProtectedAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dashboardStats = useSelector((state: RootState) => state.admin.dashboardStats);
  const dashboardError = useSelector((state: RootState) => state.admin.dashboardError);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!dashboardStats) {
        try {
          await dispatch(getAdminDashboard()).unwrap();
        } catch (error) {
          console.error('Failed to fetch admin dashboard:', error);
        }
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [dispatch]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // success of getAdminDashboard already proves: valid cookie + admin role
  // (authenticateAdmin middleware enforces this server-side)
  if (!dashboardStats && dashboardError) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdmin;