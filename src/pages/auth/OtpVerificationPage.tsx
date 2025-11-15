// pages/auth/OtpVerificationPage.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { updateCountDown } from "../../redux/auth/authSlice";
import OtpForm from "../../components/user-authentication/OtpForm";
import useOtpForm from "../../hooks/userOtpForm";
import BackGroundLayout from "../../layouts/BackGroundLayout";

const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { otp } = useSelector((state: RootState) => state.auth);
  const { handleOtpForm, isResending, handleResendOtp, handleGoBack, otpType } = useOtpForm();

  // Redirect if no OTP state
  useEffect(() => {
    if (!otp || !otp.email) {
      if (otpType === 'forgotPassword') {
        navigate('/forgot-password');
      } else {
        navigate('/sign-up');
      }
    }
  }, [otp, navigate, otpType]);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (otp && otp.countDown > 0) {
      interval = setInterval(() => {
        dispatch(updateCountDown(otp.countDown - 1));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [otp?.countDown, dispatch]);

  if (!otp) {
    return (
        <BackGroundLayout>

      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
      </BackGroundLayout>
    );
  }

  return (
    <BackGroundLayout>
    <OtpForm
      formik={handleOtpForm}
      email={otp.email}
      countDown={otp.countDown}
      isResending={isResending}
      onResendOtp={handleResendOtp}
      onGoBack={handleGoBack}
      otpType={otpType}
    />
     </BackGroundLayout>
  );
};

export default OtpVerificationPage;
