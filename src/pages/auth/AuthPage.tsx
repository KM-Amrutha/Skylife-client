import React, { useEffect, useState } from "react";
import useAuthForm from "../../hooks/userAuthForm";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate, useLocation } from "react-router-dom";
import BackGroundLayout from "../../layouts/BackGroundLayout";
import SignInForm from "../../components/user-authentication/SignInForm";
import SignUpForm from "../../components/user-authentication/SignUpForm";
import ProviderSignUpForm from "../../components/user-authentication/SignUpFormProvider";

const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialMode: "sign in" | "sign up" | "provider" =
    location.pathname === "/sign-in" 
      ? "sign in"
      : location.pathname === "/sign-up"
      ? "sign up"
      : location.pathname === "/provider-sign-up"
      ? "provider"
      : "sign up";

  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  const { handleUserAuth, handleProviderAuth } = useAuthForm(
    mode === "provider" ? "sign up" : mode
  );

  const { user, provider, admin } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) navigate("/welcome");
    else if (provider) navigate("/provider/dashboard");
    else if (admin) navigate("/admin/dashboard");
  }, [user, provider, admin, navigate]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/sign-in") setMode("sign in");
    else if (path === "/sign-up") setMode("sign up");
    else if (path === "/provider-sign-up") setMode("provider");
    else setMode("sign up");
  }, [location.pathname]);

  const toggleUser = () => {
    if (mode === "sign in") navigate("/sign-up");
    else navigate("/sign-in");
  };

    const { handleGoogleAuthSuccess } = useGoogleAuth();
  const goProvider = () => navigate("/provider-sign-up");
  const goUser = () => navigate("/sign-up");

  return (
    <BackGroundLayout>
      {mode === "sign in" ? (
          <SignInForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formik={handleUserAuth}
              handleGoogleAuthSuccess={handleGoogleAuthSuccess}
            onToggleAuth={toggleUser}
          />
      ) : mode === "sign up" ? (
        <SignUpForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={handleUserAuth}
            
          onToggleAuth={toggleUser}
        />
      ) : (
        
          <ProviderSignUpForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formik={handleProviderAuth}
            onToggleAuth={goUser}
          />
      )}
    </BackGroundLayout>
  );
};

export default AuthPage;
