import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../redux/store';
import { updateUserProfile } from '../../redux/auth/authThunk';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import { User } from '../../redux/auth/authTypes';

export interface EditProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | '';
  address1: string;
  address2: string;
  profilePicture: string;
}

interface UseEditUserProfileReturn {
  formik: FormikProps<EditProfileForm>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initForm: (user: User) => void;
}

const editProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits')
    .required('Mobile is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Please select a gender')
    .required('Gender is required'),
  address1: Yup.string().trim().required('Address is required'),
  address2: Yup.string().optional(),
  profilePicture: Yup.string().optional(),
});

const useEditUserProfile = (): UseEditUserProfileReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik<EditProfileForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      dateOfBirth: '',
      gender: '',
      address1: '',
      address2: '',
      profilePicture: '',
    },
    validationSchema: editProfileValidationSchema,
    enableReinitialize: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(updateUserProfile({
          userData: {
            ...values,
            gender: values.gender as 'male' | 'female',
            isVerified: user?.isVerified ?? false,
            password: user?.password ?? '',
          }
        })).unwrap();
        showSuccessToast('Profile updated successfully');
      } catch (error: any) {
        showErrorToast(error || 'Failed to update profile');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const initForm = (user: User) => {
    formik.setValues({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      mobile: user.mobile || '',
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || '',
      address1: user.address1 || '',
      address2: user.address2 || '',
      profilePicture: user.profilePicture || '',
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showErrorToast('Image must be less than 5MB');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      showErrorToast('Only JPG and PNG images are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue('profilePicture', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return {
    formik,
    handleImageUpload,
    initForm,
  };
};

export default useEditUserProfile;