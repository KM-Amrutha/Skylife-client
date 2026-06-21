import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { getUserProfile } from "../../redux/auth/authThunk";

const ProtectedUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token && !user) {
        try {
          await dispatch(getUserProfile()).unwrap();
        } catch (error) {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem("accessToken");
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [dispatch, user]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  const token = localStorage.getItem("accessToken");

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedUser;