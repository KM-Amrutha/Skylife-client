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
      if (!user) {
        try {
          await dispatch(getUserProfile()).unwrap();
        } catch (error) {
          console.error("Failed to fetch user:", error);
        
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [dispatch]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }


  if (!user || user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedUser;