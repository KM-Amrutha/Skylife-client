import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { completeProviderProfile, getProviderProfile } from '../../redux/auth/authThunk';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import { AppDispatch, RootState } from '../../redux/store';
import { completeProviderProfile as CompleteProviderProfileInterface } from '../../redux/auth/authTypes';
import { useEffect } from 'react';

interface UseCompleteProviderProfileReturn {
  formik: FormikProps<CompleteProviderProfileInterface>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => Promise<void>;
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => Promise<void>;
}

// Validation schemas
const imageSchema = Yup.mixed<File>()
  .test('fileSize', 'File size must be less than 5MB', (value: File | undefined) => {
    if (!value) return false;
    return value.size <= 5 * 1024 * 1024;
  })
  .test('fileType', 'Only image files are allowed', (value: File | undefined) => {
    if (!value) return false;
    return ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(value.type);
  });

const pdfSchema = Yup.mixed<File>()
  .test('fileSize', 'File size must be less than 10MB', (value: File | undefined) => {
    if (!value) return false;
    return value.size <= 10 * 1024 * 1024;
  })
  .test('fileType', 'Only PDF files are allowed', (value: File | undefined) => {
    if (!value) return false;
    return value.type === 'application/pdf';
  });


const completeProviderProfileValidationSchema = Yup.object().shape({
  companyName: Yup.string().optional(),
  email: Yup.string().email('Invalid email').optional(),
  mobile: Yup.string().optional(),
  airlineCode: Yup.string().optional(),
  logoUrl: Yup.string().required('Logo is required'),
  registrationCertificateUrl: Yup.string().required('Registration certificate is required'),
  insuranceProofUrl: Yup.string().required('Insurance proof is required'),
  establishmentYear: Yup.number().required('Establishment year is required').typeError('Must be a number'),
  licenseExpiryDate: Yup.date().required('License expiry date is required'),
  headquartersAddress: Yup.string().required('Headquarters address is required'),
  countryOfOperation: Yup.string().required('Country of operation is required'),
  typeOfOperation: Yup.string().required('Type of operation is required'),
  websiteUrl: Yup.string().min(3, 'Website URL must be at least 3 characters').required('Website URL is required'),
  ceoName: Yup.string().required('CEO name is required'),
  officeContactNumber: Yup.string().required('Contact number is required'),
  role: Yup.string().required()
});

const useCompleteProviderProfile = (): UseCompleteProviderProfileReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const provider = useSelector((state: RootState) => state.auth.provider);

  const formik = useFormik<CompleteProviderProfileInterface>({
    initialValues: {
      companyName: '',
      email: '',
      mobile: '',
      airlineCode: '',
      logoUrl: '',
      role: 'provider',
      registrationCertificateUrl: '',
      insuranceProofUrl: '',
      establishmentYear: new Date().getFullYear(),
      licenseExpiryDate: new Date(),
      headquartersAddress: '',
      countryOfOperation: '',
      typeOfOperation: '',
      websiteUrl: '',
      ceoName: '',
      officeContactNumber: ''
    },
    validationSchema: completeProviderProfileValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(completeProviderProfile(values)).unwrap();
        showSuccessToast(response.message || 'Profile updated successfully');
        navigate('/provider/dashboard');
      } catch (error: any) {
        showErrorToast(error || 'Failed to update profile');
      }
    }
  });

  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await imageSchema.validate(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          formik.setFieldValue(fieldName, reader.result);
          formik.setFieldTouched(fieldName, true);
        };
        reader.readAsDataURL(file);
      } catch (error: any) {
        showErrorToast(error.message);
        formik.setFieldError(fieldName, error.message);
        e.target.value = "";
      }
    }
  };

  
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await pdfSchema.validate(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          formik.setFieldValue(fieldName, reader.result);
          formik.setFieldTouched(fieldName, true);
        };
        reader.readAsDataURL(file);
      } catch (error: any) {
        showErrorToast(error.message);
        formik.setFieldError(fieldName, error.message);
        e.target.value = "";
      }
    }
  };

  // Fetch and pre-populate provider data
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        if (!provider) {
          await dispatch(getProviderProfile()).unwrap();
        }
      } catch (error) {
        if(!provider){
        showErrorToast('Failed to fetch provider data');
        }
      }
    };

    fetchProviderData();
  }, [dispatch, provider]);

  // Pre-populate form when provider data is available
  useEffect(() => {
    if (provider) {
      formik.setValues({
        companyName: provider.companyName || '',
        email: provider.email || '',
        mobile: provider.mobile || '',
        airlineCode: provider.airlineCode || '',
        logoUrl: provider.logoUrl || '',
        role: 'provider',
        registrationCertificateUrl: provider.registrationCertificateUrl || '',
        insuranceProofUrl: provider.insuranceProofUrl || '',
        establishmentYear: provider.establishmentYear || new Date().getFullYear(),
        licenseExpiryDate: provider.licenseExpiryDate || new Date(),
        headquartersAddress: provider.headquartersAddress || '',
        countryOfOperation: provider.countryOfOperation || '',
        typeOfOperation: provider.typeOfOperation || '',
        websiteUrl: provider.websiteUrl || '',
        ceoName: provider.ceoName || '',
        officeContactNumber: provider.officeContactNumber || ''
      });
    }
  }, [provider]);

  return { formik, handleImageUpload, handlePdfUpload };
};

export default useCompleteProviderProfile;
