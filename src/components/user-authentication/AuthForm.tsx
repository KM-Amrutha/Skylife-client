import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store';
import useAuthForm from '../../hooks/user/userAuthForm';
import useGoogleAuth from '../../hooks/user/useGoogleAuth';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ProviderSignUpForm from './SignUpFormProvider';

type AuthMode = 'sign in' | 'sign up' | 'provider';

const resolveMode = (pathname: string): AuthMode => {
  if (pathname === '/sign-in') return 'sign in';
  if (pathname === '/sign-up') return 'sign up';
  if (pathname === '/provider-sign-up') return 'provider';
  return 'sign up';
};

const AuthForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>(() => resolveMode(location.pathname));
  const [showPassword, setShowPassword] = useState(false);

  const { handleUserAuth, handleProviderAuth } = useAuthForm(
    mode === 'provider' ? 'sign up' : mode
  );
  const { handleGoogleAuthSuccess } = useGoogleAuth();

  const { user, provider, admin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) navigate('/welcome');
    else if (provider) navigate('/provider/dashboard');
    else if (admin) navigate('/admin/dashboard');
  }, [user, provider, admin, navigate]);

  useEffect(() => {
    setMode(resolveMode(location.pathname));
  }, [location.pathname]);

  const toggleUser = () => {
    if (mode === 'sign in') navigate('/sign-up');
    else navigate('/sign-in');
  };

  if (mode === 'sign in') {
    return (
      <SignInForm
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        formik={handleUserAuth}
        handleGoogleAuthSuccess={handleGoogleAuthSuccess}
        onToggleAuth={toggleUser}
      />
    );
  }

  if (mode === 'sign up') {
    return (
      <SignUpForm
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        formik={handleUserAuth}
        onToggleAuth={toggleUser}
      />
    );
  }

  return (
    <ProviderSignUpForm
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formik={handleProviderAuth}
      onToggleAuth={() => navigate('/sign-up')}
    />
  );
};

export default AuthForm;