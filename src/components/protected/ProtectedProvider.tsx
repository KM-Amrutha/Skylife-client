import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { getProviderProfile } from "../../redux/auth/authThunk";

const ProtectedProvider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const provider = useSelector((state: RootState) => state.auth.provider);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if ( !provider) {
        try {
          await dispatch(getProviderProfile()).unwrap();
        } catch (error) {
          console.error('Failed to fetch provider:', error);
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

  if ( !provider || provider.role !== "provider") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedProvider;
