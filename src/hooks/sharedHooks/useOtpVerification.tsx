import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { verifyOtp, resendOtp } from "../../redux/auth/authThunk";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { OTP_MESSAGES } from "../../utils/OtpConstants"

const OTP_COUNTDOWN_SECONDS = 60;




const useOtpVerification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const otpSessionId = searchParams.get("session");
  const otpType: 'signup' | 'forgotPassword' =
    location.state?.otpType === 'forgotPassword' ? 'forgotPassword' : 'signup';

  // local countdown — UX only, Redis TTL is real enforcement
  const [countdown, setCountdown] = useState(OTP_COUNTDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);

  // guard — no session id = wrong page, redirect
  useEffect(() => {
    if (!otpSessionId) {
      navigate(otpType === 'forgotPassword' ? '/forgot-password' : '/sign-up', { replace: true });
    }
  }, [otpSessionId, otpType, navigate]);

  // countdown timer — purely cosmetic
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(Yup.string().matches(/^[0-9]$/, 'Must be a digit'))
      .length(6, 'OTP must be 6 digits')
      .required('OTP is required'),
  });

  const handleOtpForm = useFormik({
    initialValues: { otp: ['', '', '', '', '', ''] },
    validationSchema,
    onSubmit: async (values) => {
      if (!otpSessionId) return;
      try {
        await dispatch(verifyOtp({
          otpSessionId,
          otp: values.otp.join(''),
        })).unwrap();

        handleOtpForm.resetForm();

        
        if (otpType === 'forgotPassword') {
          showSuccessToast('OTP verified! Set your new password.');
          navigate('/reset-password', { state: { otpSessionId, verified: true } });
        } else {
          showSuccessToast('Account verified! Please sign in.');
          navigate('/sign-in');
        }
      } catch (error: any) {
        // session expired or max attempts — force restart
      if (error === OTP_MESSAGES.EXPIRED || error === OTP_MESSAGES.MAX_ATTEMPTS) {
  showErrorToast(error);
  navigate(otpType === 'forgotPassword' ? '/forgot-password' : '/sign-up', { replace: true });
  return;
}
        showErrorToast(error || 'Invalid OTP. Please try again.');
        handleOtpForm.setFieldValue('otp', ['', '', '', '', '', '']);
      }
    },
  });

  const handleResendOtp = async () => {
    if (!otpSessionId || !canResend) return;
    setIsResending(true);
    try {
      await dispatch(resendOtp({ otpSessionId })).unwrap();
      showSuccessToast('OTP sent successfully!');
      setCountdown(OTP_COUNTDOWN_SECONDS);
      setCanResend(false);
      handleOtpForm.setFieldValue('otp', ['', '', '', '', '', '']);
    } catch (error: any) {
      // max resends hit or session expired — force restart
     if (error === OTP_MESSAGES.MAX_RESENDS || error === OTP_MESSAGES.EXPIRED) {
  showErrorToast(error);
  navigate(otpType === 'forgotPassword' ? '/forgot-password' : '/sign-up', { replace: true });
  return;
}
      showErrorToast(error || 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    navigate(otpType === 'forgotPassword' ? '/forgot-password' : '/sign-up');
  };

  return {
    handleOtpForm,
    countdown,
    canResend,
    isResending,
    handleResendOtp,
    handleGoBack,
    otpType,
  };
};

export default useOtpVerification;