import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { getUserProfile, signOutUser } from '../../redux/auth/authThunk';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import { User } from '../../redux/auth/authTypes';

interface UseUserDashboardReturn {
  user: User | null;
  isLoading: boolean;
  isDropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement|null>;
  toggleDropdown: () => void;
  handleSignOut: () => Promise<void>;
  goToDashboard: () => void;
}

const useUserDashboard = (): UseUserDashboardReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user?.userId) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user?.userId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      showSuccessToast('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      showErrorToast(error || 'Failed to sign out');
    }
  };

  const goToDashboard = () => {
    setIsDropdownOpen(false);
    navigate('/user/userdashboard');
  };

  return {
    user,
    isLoading,
    isDropdownOpen,
    dropdownRef,
    toggleDropdown,
    handleSignOut,
    goToDashboard,
  };
};

export default useUserDashboard;