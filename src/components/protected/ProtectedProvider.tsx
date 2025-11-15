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
      const token = localStorage.getItem('accessToken');
      
      if (token && !provider) {
        try {
          await dispatch(getProviderProfile()).unwrap();
        } catch (error) {
          console.error('Failed to fetch provider:', error);
          localStorage.removeItem('accessToken');
        }
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [dispatch, provider]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const token = localStorage.getItem('accessToken');

  if (!token || !provider) {
    return <Navigate to="/" replace />;
  }

  console.log('Provider role:', provider.role);
  console.log('Full provider:', provider);

  if (provider.role !== "provider") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedProvider;
