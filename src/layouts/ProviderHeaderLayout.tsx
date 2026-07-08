import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../redux/auth/authThunk';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import { ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';

const ProviderHeaderLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { provider } = useSelector((state: RootState) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      showSuccessToast('Signed out successfully');
      navigate('/sign-in');
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to sign out');
    }
  };

  return (
    <header className="bg-white text-gray-900 py-3.5 px-4 md:px-8 grid grid-cols-3 items-center border-b border-gray-200 sticky top-0 z-30">
      
      {/* Left Slot: Maintained for mobile layout spacing balance */}
      <div className="flex items-center">
        {/* Keeps layout space empty on desktop, leaves room for mobile hamburger button position */}
      </div>

      {/* Center Slot: Logo and Stylized Typography */}
      <div className="flex items-center justify-center gap-3">
        <img 
          src="/image/gemlogo.png" 
          alt="Logo" 
          className="h-8 w-8 object-contain"
        />
       <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
  skylife
</span>
      </div>

      {/* Right Slot: User Info & Dropdown */}
      <div className="flex items-center justify-end gap-3 relative">
        <span className="text-sm font-medium text-gray-400 hidden sm:inline">
          Hello,
        </span>
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-gray-50 text-gray-800 border border-gray-200 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold hover:bg-gray-100/80 transition-all cursor-pointer shadow-xs"
          >
            <span className="max-w-[100px] md:max-w-none truncate">
              {provider?.companyName || 'Provider'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              
              <div className="absolute right-0 mt-2 w-44 md:w-52 bg-white text-gray-800 rounded-2xl border border-gray-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                <button
                  onClick={() => {
                    navigate('/provider/dashboard');
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-gray-50 text-xs md:text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-gray-400" />
                  Dashboard
                </button>
                
                <div className="h-px bg-gray-100 my-1" />
                
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-red-50 text-xs md:text-sm font-semibold text-red-600 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProviderHeaderLayout;