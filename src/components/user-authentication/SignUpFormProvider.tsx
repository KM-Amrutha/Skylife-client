import React from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { ProviderAuthFormData } from "../../types/authTypes";

interface ProviderSignUpFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  formik: FormikProps<ProviderAuthFormData>;
  onToggleAuth: () => void;
}

const ProviderSignUpForm: React.FC<ProviderSignUpFormProps> = ({
  showPassword,
  setShowPassword,
  formik,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
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
  <h2 className="text-2xl font-bold text-slate-900 mb-1">
    Partner with us?
  </h2>
  <p className="text-sm font-medium text-slate-700">
    Register here!
  </p>
</div>

        {/* Form Container */}
        <div className="bg-slate-900 rounded-3xl p-5">
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/* Company Name */}
            <div>
              <input
                type="text"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Company Name"
                className="w-full px-4 py-2.5 rounded-lg text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <p className="text-red-300 text-xs mt-1">
                  {formik.errors.companyName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                className="w-full px-4 py-2.5 rounded-lg text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-300 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Airline Code */}
            <div>
              <input
                type="text"
                name="airlineCode"
                value={formik.values.airlineCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Airline Code"
                className="w-full px-4 py-2.5 rounded-lg text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              {formik.touched.airlineCode && formik.errors.airlineCode && (
                <p className="text-red-300 text-xs mt-1">
                  {formik.errors.airlineCode}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <input
                type="tel"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Mobile"
                className="w-full px-4 py-2.5 rounded-lg text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-300 text-xs mt-1">
                  {formik.errors.mobile}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                className="w-full px-4 py-2.5 pr-10 rounded-lg text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-300 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit Button - Same color as user signup */}
           {/* Submit Button */}
<button
  type="submit"
  disabled={formik.isSubmitting}
  className="w-full bg-[#000D2B] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#001845] focus:outline-none focus:ring-4 focus:ring-white/50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-3"
>
  {formik.isSubmitting ? (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      Signing In...
    </div>
  ) : (
    "Sign In"
  )}
</button>


            {/* Already a partner - Inside form */}
            <div className="text-center pt-2">
              
              <p className="text-white text-xs">
                Already a partner?{" "}
                <button
                  type="button"
                  onClick= {()=> navigate('/sign-in')}
                  className="underline text-blue-300 hover:text-blue-200 font-medium"
                >
                  Login
                </button>
              </p>
            </div>

            {/* Passenger Register */}
            <div className="border-t border-gray-400 pt-2">
              <p className="text-white text-xs text-center">
                Are you a passenger?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/sign-up')}
                  className="underline text-blue-300 hover:text-blue-200 font-medium"
                >
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderSignUpForm;
