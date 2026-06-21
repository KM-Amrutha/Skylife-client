
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// AUTHENTICATION
import AuthPage from "./pages/auth/AuthPage";
import ProviderSignUpPage from "./pages/auth/AuthPage";
import OtpVerificationPage from "./pages/auth/OtpVerificationPage";
import ForgotPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import UserRoutes from "./routes/userRoutes";
import AdminRoutes from "./routes/adminRoutes";
import ProviderRoutes from "./routes/providerRoutes";
import HomePage from "./pages/HomePage";

const LoadingSpinner = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);
const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/sign-in" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />
        <Route path="/provider-sign-up" element={<ProviderSignUpPage />} />
          <Route path="/verify-otp" element={<OtpVerificationPage />} />
         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/" element={<HomePage />} />
         {/* Protected Routes */}
        {UserRoutes()}
        {ProviderRoutes()}
        {AdminRoutes()}
        
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
