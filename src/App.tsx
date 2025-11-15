
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// AUTHENTICATION
import AuthPage from "./pages/auth/AuthPage";
import ProviderSignUpPage from "./pages/auth/AuthPage";
import OtpVerificationPage from "./pages/auth/OtpVerificationPage";

import WelcomePage from "./pages/user/WelcomePage";

import ForgotPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// PROVIDER SIDE

import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import CompleteProfilePage from "./pages/provider/CompleteProfilePage";


// ADMIN SIDE

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

import HomePage from "./pages/HomePage";


// PROTECTED
import ProtectedUser from "./components/protected/ProtectedUser";
import ProtectedAdmin from "./components/protected/ProtectedAdmin";
import ProtectedProvider from "./components/protected/ProtectedProvider";

// LOADING SPINNER
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

        {/* Provider Signup */}
        <Route path="/provider-sign-up" element={<ProviderSignUpPage />} />

        {/* Otp page */}

          
          <Route path="/verify-otp" element={<OtpVerificationPage />} />

<Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/reset-password/:token" element={<ResetPasswordPage />} />


<Route path="/welcome" element={<WelcomePage />} />


        {/* Default to signup */}
        <Route path="/" element={<HomePage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedUser />}>
          <Route path="/user/dashboard" element={<div>User Dashboard</div>} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdmin />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />}/>
        </Route>

        {/* Protected Provider Routes */}
        <Route element={<ProtectedProvider />}>
          <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
          <Route path="/provider/complete-profile" element={<CompleteProfilePage />} />
        </Route>

    
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
