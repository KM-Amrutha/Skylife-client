import React from "react";
import ForgotPasswordForm from "../../components/user-authentication/ForgotPasswordForm";
import useForgotPasswordForm from "../../hooks/useFrogotpasswordForm";
import BackGroundLayout from "../../layouts/BackGroundLayout";
const ForgotPasswordPage: React.FC = () => {
  const { handleForgotPasswordForm, handleGoBack } = useForgotPasswordForm();

  return (
    <BackGroundLayout>
    <ForgotPasswordForm
      formik={handleForgotPasswordForm}
      onGoBack={handleGoBack}
    />
     </BackGroundLayout>
  );
};

export default ForgotPasswordPage;
