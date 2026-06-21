import React, { useState } from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import ProviderDashboard from '../../components/provider/ProviderDashboard';
import ChangePasswordModal from '../../components/user-authentication/ChangePasswordModal';
import useChangePassword from '../../hooks/user/useChangePassword';

const ProviderDashboardPage: React.FC = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { formik: passwordFormik } = useChangePassword(() => setIsChangingPassword(false));

  const openChangePassword = () => setIsChangingPassword(true);
  const closeChangePassword = () => {
    passwordFormik.resetForm();
    setIsChangingPassword(false);
  };

  return (
    <ProviderMainLayout>
      <ProviderDashboard onChangePasswordClick={openChangePassword} />
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