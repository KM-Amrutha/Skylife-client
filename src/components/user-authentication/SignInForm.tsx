import React from 'react';
import { FormikProps } from 'formik';
import { UserAuthFormData } from '../../types/authTypes';
import { useNavigate } from 'react-router-dom';

interface SignInFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  formik: FormikProps<UserAuthFormData>;
  onToggleAuth: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  showPassword,
  setShowPassword,
  formik,
  onToggleAuth
}) => {
  const navigate = useNavigate();
  return (
      <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
  
        {/* Header */}
<div className="text-center mb-8">
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
  <h2 className="text-3xl font-bold text-black mb-2">
    Welcome Back
  </h2>
  <p className="text-gray-600 text-base">
    Sign in to your AirTicket account
  </p>
</div>

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
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-slate-900'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.password}
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
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

        </form>

        {/* ADD FORGOT PASSWORD LINK HERE - AFTER FORM, BEFORE FOOTER */}
        <div className="text-center mt-4">
          <a 
            href="/forgot-password"
            className="text-slate-900 font-semibold hover:underline transition-colors text-sm"
          >
            Forgot Password?
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <button 
              onClick={onToggleAuth}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>

<div className="flex items-center justify-center">
        <div className="border-t border-gray-300 flex-grow mr-2"></div>
        <span className="text-gray-400 text-xs">OR</span>
        <div className="border-t border-gray-300 flex-grow ml-2"></div>
      </div>
       <p className="text-gray-600 text-xs">
        Are you an airline provider?{' '}
        <button 
          type="button"
          onClick={() => navigate('/provider-sign-up')}
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </button>
      </p>

        </div>
      </div>
    </div>
  );
};

export default SignInForm;
