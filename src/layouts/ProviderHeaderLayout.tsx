import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../redux/auth/authThunk';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const ProviderHeaderLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { provider } = useSelector((state: RootState) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      localStorage.removeItem('accessToken');
      showSuccessToast('Signed out successfully');
      navigate('/sign-in');
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to sign out');
    }
  };

  return (
    <header className="bg-[#00001F] text-white py-3 px-4 md:px-6 flex justify-between items-center border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/image/gemlogo.png" 
          alt="Logo" 
          className="h-6 w-6 md:h-8 md:w-8"
        />
        <span className="text-lg md:text-xl font-semibold">skylife</span>
      </div>

      {/* User Info & Dropdown */}
      <div className="flex items-center gap-2 md:gap-3 relative">
        <span className="text-xs md:text-sm hidden sm:inline">Hello</span>
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 md:gap-2 bg-white text-[#00001F] px-2 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <span className="max-w-[80px] md:max-w-none truncate">
              {provider?.companyName || 'Provider'}
            </span>
            <svg 
              className="w-3 h-3 md:w-4 md:h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white text-gray-800 rounded-lg shadow-xl z-50">
              <button
                onClick={() => {
                  navigate('/provider/dashboard');
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3 md:px-4 py-2 hover:bg-gray-100 text-xs md:text-sm font-medium rounded-t-lg"
              >
                Dashboard
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 md:px-4 py-2 hover:bg-gray-100 text-xs md:text-sm font-medium text-red-600 rounded-b-lg"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProviderHeaderLayout;
