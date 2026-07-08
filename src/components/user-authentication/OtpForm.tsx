import React, { useRef, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import useOtpVerification from "../../hooks/sharedHooks/useOtpVerification";

const OtpForm: React.FC = () => {
  const {
    handleOtpForm,
    countdown,
    canResend,
    isResending,
    handleResendOtp,
    handleGoBack,
    otpType,
  } = useOtpVerification();

  const formik = handleOtpForm;
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const getTexts = () => {
    if (otpType === 'forgotPassword') {
      return {
        title: "Verify Reset Code",
        subtitle: "We've sent a 6-digit reset code to your email",
        buttonText: "Verify & Continue",
        backButtonText: "← Back to Email Entry"
      };
    }
    return {
      title: "Verify Your Account",
      subtitle: "We've sent a 6-digit code to your email",
      buttonText: "Verify OTP",
      backButtonText: "← Back to Sign Up"
    };
  };

  const texts = getTexts();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue('otp', newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-screen overflow-y-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/image/gemlogo.png" alt="Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-gray-900">Skylife</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{texts.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{texts.subtitle}</p>

          {/* Countdown Timer */}
          {countdown > 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
              <p className="text-[#0a3a8a] text-xs font-semibold">
                Time remaining: {formatTime(countdown)}
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
              <p className="text-red-500 text-xs font-semibold">
                OTP expired. Please request a new one.
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 text-center">
              Enter 6-Digit Code
            </label>
            <div className="flex justify-center gap-2 mb-3">
              {formik.values.otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { if (el) inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-10 h-10 text-center text-lg font-bold text-gray-900 border-2 rounded-lg bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/10 ${
                    formik.errors.otp
                      ? 'border-red-500 focus:border-red-500'
                      : digit
                      ? 'border-[#0a3a8a] bg-blue-50 focus:border-[#0a3a8a]'
                      : 'border-gray-300 focus:border-[#0a3a8a]'
                  }`}
                  disabled={formik.isSubmitting || countdown === 0}
                />
              ))}
            </div>
            {formik.errors.otp && (
              <p className="text-red-500 text-xs mt-1 font-medium text-center">
                Please enter a valid 6-digit OTP
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || formik.values.otp.some(d => !d) || countdown === 0}
            className="w-full bg-[#0a3a8a] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#082c6b] focus:outline-none focus:ring-4 focus:ring-[#0a3a8a]/30 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-3"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : texts.buttonText}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-gray-600 text-xs">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending || !canResend}
              className={`font-semibold transition-colors ${
                !canResend || isResending
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#0a3a8a] hover:underline'
              }`}
            >
              {isResending ? 'Resending...' : canResend ? 'Resend OTP' : `Resend in ${formatTime(countdown)}`}
            </button>
          </p>

          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-2"></div>
            <span className="text-gray-400 text-xs">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>

          <button
            type="button"
            onClick={handleGoBack}
            className="text-[#0a3a8a] font-semibold hover:underline transition-colors text-sm"
          >
            {texts.backButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;