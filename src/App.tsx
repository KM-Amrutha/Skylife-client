
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// AUTHENTICATION
import AuthPage from "./pages/auth/AuthPage";
import ProviderSignUpPage from "./pages/auth/AuthPage";
import OtpVerificationPage from "./pages/auth/OtpVerificationPage";


import UserHomePage from "./pages/user/UserHomePage";
import UserDashboardPage from "./pages/user/UserDashboardPage";


import ForgotPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import EditAircraftPage from "./pages/provider/EditAircraftPage";

// PROVIDER SIDE

import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import CompleteProfilePage from "./pages/provider/CompleteProfilePage";

import AddAircraftPage from "./pages/provider/AddAircraftPage";
import AircraftListPage from "./pages/provider/AircraftListPage";
import AircraftSeatLayoutPage from "./pages/provider/AricraftSeatLayoutPage";

import AddFlightPage from "./pages/provider/AddFlightPage";
import FlightListPage from "./pages/provider/FlightListPage";
import EditFlightPage from "./pages/provider/EditFlightPage";


// ADMIN SIDE

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import PendingProviderPage from "./pages/admin/PendingProviderPage";
import PendingFlightPage from "./pages/admin/PendingFlightPage";
import AllProvidersTablePage from "./pages/admin/AllProvidersPage";
import AllUsersTablePage from "./pages/admin/AllUsersPage";
import AdminFlights from "./components/admin/AdminFlights";

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


        {/* <Route path="/welcome" element={<WelcomePage />} /> */}


        {/* Default to signup */}
        <Route path="/" element={<HomePage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedUser />}>
          <Route path="/user/userhome" element={<UserHomePage />} />
           <Route path="/user/userdashboard" element={<UserDashboardPage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdmin />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />}/>
          <Route path="/admin/pending-providers" element={<PendingProviderPage />} />
         <Route path="/admin/pending-flights" element={<PendingFlightPage />} />
         <Route path="/admin/providers" element={<AllProvidersTablePage />} />
         <Route path="/admin/users" element={<AllUsersTablePage />} />
         <Route path="/admin/flights" element={<AdminFlights />} />

        </Route>

        {/* Protected Provider Routes */}
        <Route element={<ProtectedProvider />}>
          <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
          <Route path="/provider/complete-profile" element={<CompleteProfilePage />} />

          <Route path="/provider/add-aircraft" element={<AddAircraftPage />} />
          < Route path="/provider/aircraft-list" element={<AircraftListPage />} />
          <Route path="/provider/aircraft/:aircraftId/edit" element={<EditAircraftPage />} />

         <Route path="/provider/aircraft/:aircraftId/seat-layout" element={<AircraftSeatLayoutPage />} />

          <Route path="/provider/add-flight" element={<AddFlightPage />} />
          <Route path="/provider/flight-list" element={<FlightListPage />} />
          <Route path="/provider/update-flights/:flightId" element={<EditFlightPage />} />

        </Route>

    
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
