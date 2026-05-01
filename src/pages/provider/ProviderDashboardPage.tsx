import React, { useState } from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import ProviderDashboard from '../../components/provider/ProviderDashboard';
import useProviderDashboard from '../../hooks/provider/useProviderDashboard';
import useChangePassword from '../../hooks/user/useChangePassword';
import ChangePasswordModal from '../../components/user-authentication/ChangePasswordModal';

const ProviderDashboardPage: React.FC = () => {
  const { provider, isLoading } = useProviderDashboard();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { formik: passwordFormik } = useChangePassword(() => setIsChangingPassword(false));

  const openChangePassword = () => setIsChangingPassword(true);

  const closeChangePassword = () => {
    passwordFormik.resetForm();
    setIsChangingPassword(false);
  };

  return (
    <ProviderMainLayout>
      <ProviderDashboard
        provider={provider}
        isLoading={isLoading}
        onChangePasswordClick={openChangePassword}
      />
      {isChangingPassword && (
        <ChangePasswordModal
          formik={passwordFormik}
          onClose={closeChangePassword}
        />
      )}
    </ProviderMainLayout>
  );
};

export default ProviderDashboardPage;