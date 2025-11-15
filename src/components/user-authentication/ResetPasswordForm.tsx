import React from 'react';
import { FormikProps } from 'formik';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  formik: FormikProps<ResetPasswordFormData>;
  onGoBack: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  formik,
  onGoBack
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header with Logo */}
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
            Reset Password
          </h2>
          <p className="text-gray-600 text-sm">
            Create a new password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-black mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border-2 rounded-lg text-black bg-white placeholder-gray-400 text-sm transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-slate-900'
              }`}
              placeholder="Enter new password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-0.5 font-medium">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-black mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border-2 rounded-lg text-black bg-white placeholder-gray-400 text-sm transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-slate-900'
              }`}
              placeholder="Confirm new password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-0.5 font-medium">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-3"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Resetting...
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <button 
            type="button"
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

export default ResetPasswordForm;
