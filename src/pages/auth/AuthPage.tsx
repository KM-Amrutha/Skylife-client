import React from 'react';
import BackGroundLayout from '../../layouts/BackGroundLayout';
import AuthForm from '../../components/user-authentication/AuthForm';

const AuthPage: React.FC = () => {
  return (
    <BackGroundLayout>
      <AuthForm />
    </BackGroundLayout>
  );
};

export default AuthPage;