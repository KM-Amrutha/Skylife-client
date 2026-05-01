import React, { useState } from 'react';
import useUserDashboard from '../../hooks/user/useUserDashboard';
import useEditUserProfile from '../../hooks/user/useEditUserProfile';
import useChangePassword from '../../hooks/user/useChangePassword';
import UserDashboard from '../../components/user/UserDashboard';
import UserEditProfileModal from '../../components/user/UserEditProfileModal';
import ChangePasswordModal from '../../components/user-authentication/ChangePasswordModal';

const UserDashboardPage: React.FC = () => {
  const { user, isLoading } = useUserDashboard();
  const { formik, handleImageUpload, initForm } = useEditUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const { formik: passwordFormik } = useChangePassword(() => setIsChangingPassword(false));

  const openEdit = () => {
    if (user) initForm(user);
    setIsEditing(true);
  };

  const closeEdit = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const openChangePassword = () => setIsChangingPassword(true);

  const closeChangePassword = () => {
    passwordFormik.resetForm();
    setIsChangingPassword(false);
  };

  return (
    <>
      <UserDashboard
        user={user}
        isLoading={isLoading}
        onEditClick={openEdit}
        onChangePasswordClick={openChangePassword}
      />
      {isEditing && (
        <UserEditProfileModal
          formik={formik}
          handleImageUpload={handleImageUpload}
          onClose={closeEdit}
        />
      )}
      {isChangingPassword && (
        <ChangePasswordModal
          formik={passwordFormik}
          onClose={closeChangePassword}
        />
      )}
    </>
  );
};

export default UserDashboardPage;