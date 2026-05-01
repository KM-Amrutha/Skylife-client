import React from 'react';
import { FormikProps } from 'formik';

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormProps {
  formik: FormikProps<ForgotPasswordFormData>;
  onGoBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  formik,
  onGoBack
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header */}
       <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img 
              src="/image/gemlogo.png" 
              alt="Logo" 
              className="h-10 w-10"
            />
            <h1 className="text-2xl font-bold text-slate-900">
              Skylife
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-black mb-1">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your email to reset your password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-slate-900'
              }`}
              placeholder="Enter your email address"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold text-base hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-6"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending Reset Link...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-3">
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          
          <button 
            onClick={onGoBack}
            className="text-slate-900 font-semibold hover:underline transition-colors text-sm"
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
