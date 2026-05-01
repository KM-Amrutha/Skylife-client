import { useDispatch } from 'react-redux';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '../../redux/store';
import { updatePassword } from '../../redux/auth/authThunk';
import { showSuccessToast, showErrorToast } from '../../utils/toast';

export interface ChangePasswordForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface UseChangePasswordReturn {
  formik: FormikProps<ChangePasswordForm>;
}

const changePasswordValidationSchema = Yup.object().shape({
  password: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Must contain at least one special character')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Please confirm your new password'),
});

const useChangePassword = (onSuccess: () => void): UseChangePasswordReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<ChangePasswordForm>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await dispatch(updatePassword({
          password: values.password,
          newPassword: values.newPassword,
        })).unwrap();
        showSuccessToast('Password changed successfully');
        resetForm();
        onSuccess();
      } catch (error: any) {
        showErrorToast(error || 'Failed to change password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik };
};

export default useChangePassword;