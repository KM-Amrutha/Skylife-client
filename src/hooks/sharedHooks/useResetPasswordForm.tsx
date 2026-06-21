import { useFormik, FormikProps } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import axiosInstance from "../../config/axios";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface UseResetPasswordFormReturn {
  token?: string;
  handleResetPasswordForm: FormikProps<ResetPasswordFormData>;
  handleGoBack: () => void;
}

const useResetPasswordForm = (): UseResetPasswordFormReturn => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
  if (!token) {
    navigate("/forgot-password");
  }
}, [token, navigate]);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required')
  });

  const handleResetPasswordForm = useFormik<ResetPasswordFormData>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!token) {
        showErrorToast('Invalid reset link. Please request a new one.');
        navigate('/forgot-password');
        return;
      }

      try {
        // Call backend with token from URL
        await axiosInstance.post(`auth/password-reset/${token}`, {
          password: values.password
        });

        showSuccessToast('Password reset successfully! Please sign in with your new password.');
        handleResetPasswordForm.resetForm();
        navigate('/sign-in');
        
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again.';
        showErrorToast(errorMessage);
        console.error('Reset password error:', error);
      }
    }
  });

  const handleGoBack = () => {
    navigate('/sign-in');
  };

 return {
  token,
  handleResetPasswordForm,
  handleGoBack,
};
};

export default useResetPasswordForm;
