import React from 'react';
import { FormikProps } from 'formik';
import { UserAuthFormData } from '../../types/authTypes';
import { useNavigate } from 'react-router-dom';

interface SignUpFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  formik: FormikProps<UserAuthFormData>;
  onToggleAuth: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  showPassword,
  setShowPassword,
  formik,
  onToggleAuth
}) => {
  const navigate = useNavigate();
  return (
    
       <div
  className="flex items-center justify-center min-h-screen p-5"
  style={{
    backgroundImage: `linear-gradient(to bottom right, rgba(10,58,138,0.7), rgba(0,0,0,0.5)), url('/image/image3.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-screen overflow-y-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/image/gemlogo.png" alt="Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-gray-900">Skylife</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h2>
          <p className="text-gray-600 text-sm">Join AirTicket Booking to start your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-xs font-medium text-gray-900 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border-2 rounded-lg text-gray-900 bg-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#0a3a8a] ${
                  formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-xs mt-0.5">{formik.errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-xs font-medium text-gray-900 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border-2 rounded-lg text-gray-900 bg-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#0a3a8a] ${
                  formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Last name"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-xs mt-0.5">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-900 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border-2 rounded-lg text-gray-900 bg-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#0a3a8a] ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-0.5">{formik.errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-xs font-medium text-gray-900 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border-2 rounded-lg text-gray-900 bg-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#0a3a8a] ${
                formik.touched.mobile && formik.errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10-digit mobile"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-500 text-xs mt-0.5">{formik.errors.mobile}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-900 mb-1">
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
                className={`w-full px-3 py-2 pr-10 border-2 rounded-lg text-gray-900 bg-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#0a3a8a] ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-0.5">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#0a3a8a] text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-[#082c6b] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-3"
          >
            {formik.isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-gray-600 text-xs">
            Already have an account?{' '}
            <button type="button" onClick={onToggleAuth} className="text-[#0a3a8a] font-semibold hover:underline">
              Sign In
            </button>
          </p>

          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-2"></div>
            <span className="text-gray-400 text-xs">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>

          <p className="text-gray-600 text-xs">
            Are you an airline provider?{' '}
            <button type="button" onClick={() => navigate('/provider-sign-up')} className="text-[#0a3a8a] font-semibold hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;