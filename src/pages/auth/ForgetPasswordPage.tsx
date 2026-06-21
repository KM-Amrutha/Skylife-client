import React from "react";
import ForgotPasswordForm from "../../components/user-authentication/ForgotPasswordForm";
import BackGroundLayout from "../../layouts/BackGroundLayout";

const ForgotPasswordPage: React.FC = () => {
  return (
    <BackGroundLayout>
    <ForgotPasswordForm
    />
     </BackGroundLayout>
  );
};

export default ForgotPasswordPage;
