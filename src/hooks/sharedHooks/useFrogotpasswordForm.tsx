
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import axiosInstance from "../../config/axios";

interface ForgotPasswordFormData {
  email: string;
}

interface UseForgotPasswordFormReturn {
  handleForgotPasswordForm: FormikProps<ForgotPasswordFormData>;
  handleGoBack: () => void;
}

const useForgotPasswordForm = (): UseForgotPasswordFormReturn => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  });

  const handleForgotPasswordForm = useFormik<ForgotPasswordFormData>({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Call backend - sends EMAIL LINK
        await axiosInstance.patch('auth/password-reset', {
          email: values.email
        });

        showSuccessToast('Password reset link sent to your email! Please check your inbox.');
        handleForgotPasswordForm.resetForm();
        navigate('/sign-in');
        
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to send reset link. Please try again.';
        showErrorToast(errorMessage);
        console.error('Forgot password error:', error);
      }
    }
  });

  const handleGoBack = () => {
    navigate('/sign-in');
  };

  return {
    handleForgotPasswordForm,
    handleGoBack
  };
};

export default useForgotPasswordForm;
