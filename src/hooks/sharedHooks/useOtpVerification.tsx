import { useEffect } from "react";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { verifyOtp, resendOtp } from "../../redux/auth/authThunk";
import { clearOtpDetails,updateCountDown } from "../../redux/auth/authSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";



interface OtpFormData {
  otp: string[];
}
interface UseOtpFormReturn {
  otp: RootState["auth"]["otp"];

  handleOtpForm: FormikProps<OtpFormData>;
  isResending: boolean;
  handleResendOtp: () => void;
  handleGoBack: () => void;
  otpType: "signup" | "forgotPassword";
}

const useOtpVerification = (): UseOtpFormReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { otp, isLoading } = useSelector((state: RootState) => state.auth);
   // DETECT OTP TYPE FROM URL OR STATE
  const otpType: 'signup' | 'forgotPassword' = location.pathname.includes('forgot-password') || 
                                               location.state?.otpType === 'forgotPassword' ? 
                                               'forgotPassword' : 'signup';


   useEffect(() => {
  if (!otp || !otp.email) {
    if (otpType === "forgotPassword") {
      navigate("/forgot-password");
    } else {
      navigate("/sign-up");
    }
  }
}, [otp, otpType, navigate]);

   useEffect(() => {
  let interval: NodeJS.Timeout;

  if (otp && otp.countDown > 0) {
    interval = setInterval(() => {
      dispatch(updateCountDown(otp.countDown - 1));
    }, 1000);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [otp?.countDown, dispatch, otp]);


 
  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(Yup.string().matches(/^[0-9]$/, 'Must be a digit'))
      .length(6, 'OTP must be 6 digits')
      .required('OTP is required')
  });

  const handleOtpForm = useFormik<OtpFormData>({
    initialValues: {
      otp: ['', '', '', '', '', '']
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!otp?.email) return;
      
      try {
        const otpString = values.otp.join('');
        
        // VERIFY OTP
        await dispatch(verifyOtp({ 
          email: otp.email, 
          otp: otpString 
        })).unwrap();
        
        dispatch(clearOtpDetails());
        handleOtpForm.resetForm();
        
        // SIMPLE LOGIC - NO CONFUSION
        if (otpType === 'forgotPassword') {
          // FORGOT PASSWORD → RESET PASSWORD PAGE
          showSuccessToast('OTP verified! Set your new password.');
          navigate('/reset-password', {
            state: {
              email: otp.email,
              verified: true
            }
          });
        } else {
          // SIGNUP → SIGN-IN PAGE
          showSuccessToast('Account verified! Please sign in.');
          navigate('/sign-in');
        }
        
      } catch (error: any) {
        showErrorToast(error || 'Invalid OTP. Please try again.');
        handleOtpForm.setFieldValue('otp', ['', '', '', '', '', '']);
      }
    }
  });

  const handleResendOtp = async () => {
    if (!otp?.email) return;
    
    try {
      await dispatch(resendOtp({ email: otp.email })).unwrap();
      showSuccessToast('OTP sent successfully!');
      handleOtpForm.setFieldValue('otp', ['', '', '', '', '', '']);
    } catch (error: any) {
      showErrorToast(error || 'Failed to resend OTP.');
    }
  };

  const handleGoBack = () => {
    dispatch(clearOtpDetails());
    if (otpType === 'forgotPassword') {
      navigate('/forgot-password');
    } else {
      navigate('/sign-up');
    }
  };

  return { 
    otp,
    handleOtpForm, 
    isResending: isLoading,
    handleResendOtp,
    handleGoBack,
    otpType
  };
};

export default useOtpVerification;
