import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { getAdminProfile } from "../../redux/auth/authThunk"; // you may need to create this thunk

const ProtectedAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const admin = useSelector((state: RootState) => state.auth.admin);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (token && !admin) {
        try {
          await dispatch(getAdminProfile()).unwrap(); // fetch admin profile on refresh if missing
        } catch (error) {
          console.error('Failed to fetch admin:', error);
          localStorage.removeItem('accessToken');
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [dispatch, admin]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const token = localStorage.getItem('accessToken');

  if (!token || !admin) {
    return <Navigate to="/" replace />;
  }

  if (admin.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdmin;
