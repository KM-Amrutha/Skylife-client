import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { googleAuth } from "../../redux/auth/authThunk";
import { setUser } from "../../redux/auth/authSlice";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { CredentialResponse } from "@react-oauth/google";


const useGoogleAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const handleGoogleAuthSuccess = async (credentialResponse: CredentialResponse) => {
  try {
    const { credential } = credentialResponse;

    if (!credential) {
      showErrorToast("Google login failed: No credential");
      return;
    }

    const response = await dispatch(googleAuth({ token: credential })).unwrap();
    localStorage.setItem("accessToken", response.data.accessToken);
    dispatch(setUser(response.data.user));  // assuming your backend returns { user, accessToken }

    showSuccessToast(`Welcome back${response.data.user.firstName ? " " + response.data.user.firstName : ""}!`);

    const role = response.data.user.role;
    console.log("role is: ", role)
    
    if (role === "user") navigate("/user/userhome");
    else if (role === "provider") navigate("/provider/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");

  } catch (error: any) {
    console.error("Google Auth Error:", error);
    showErrorToast(error || "Failed to login with Google");
  }
};

  return { handleGoogleAuthSuccess };
};

export default useGoogleAuth;
