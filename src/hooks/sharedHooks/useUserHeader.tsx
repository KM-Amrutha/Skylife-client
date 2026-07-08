import { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { signOutUser } from "../../redux/auth/authThunk"; 

const useUserHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.firstName?.toLowerCase() ?? "there";

  const toggleDropdown = () => setIsDropdownOpen((p) => !p);

  const handleSignOut = useCallback(async () => {
    await dispatch(signOutUser());
    setIsDropdownOpen(false);
    navigate("/");
  }, [dispatch, navigate]);

  const goToDashboard = useCallback(() => {
    setIsDropdownOpen(false);
    navigate("/user/userdashboard");
  }, [navigate]);

  return {
    userName,
    isDropdownOpen,
    dropdownRef,
    toggleDropdown,
    handleSignOut,
    goToDashboard,
  };
};

export default useUserHeader;