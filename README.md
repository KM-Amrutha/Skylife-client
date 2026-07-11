Aircraft booking platform frontend

## Tech Stack

- **Framework:** React (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **UI Framework:** React 18
- **Icon Factory:** Lucid React
- **Type Safty:** TypeScript
- **Form handling& validation:** Formik + Yup
- **TicketvPDF generation:** html2Canvas + jsPDF
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Payments:** Stripe Elements
- **Image Upload:** Cloudinary, s3Bucket

## Folder Structure
```
front-end/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminFlights.tsx
│   │   │   ├── AdminWallet.tsx
│   │   │   ├── AllProvidersTable.tsx
│   │   │   ├── AllUsersTable.tsx
│   │   │   ├── PendingFlight.tsx
│   │   │   ├── PendingProvider.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── aircraft/
│   │   │   ├── AircraftDetailModal.tsx
│   │   │   ├── aircraftForm.tsx
│   │   │   ├── aircraftListForm.tsx
│   │   │   ├── AircraftSeatModal.tsx
│   │   │   ├── DeleteAircraftModal.tsx
│   │   │   ├── EditAircraftForm.tsx
│   │   │   └── seatLayoutForm.tsx
│   │   ├── booking/
│   │   │   ├── BookedDetail.tsx
│   │   │   ├── BookingDetails.tsx
│   │   │   ├── BookingSegment.tsx
│   │   │   ├── BookingSummary.tsx
│   │   │   ├── FoodSelectionModal.tsx
│   │   │   ├── Payment.tsx
│   │   │   ├── PaymentSuccess.tsx
│   │   │   ├── RetryPayment.tsx
│   │   │   └── SeatSelectionModal.tsx
│   │   ├── flight/
│   │   │   ├── DeleteFlightModal.tsx
│   │   │   ├── EditFlightForm.tsx
│   │   │   ├── FlightDetailModal.tsx
│   │   │   ├── flightForm.tsx
│   │   │   ├── FlightList.tsx
│   │   │   ├── FlightSeatModal.tsx
│   │   │   └── RecurringFlightForm.tsx
│   │   ├── food/
│   │   │   ├── EditFood.tsx
│   │   │   ├── FoodForm.tsx
│   │   │   └── FoodList.tsx
│   │   ├── offer/
│   │   │   ├── EditOffer.tsx
│   │   │   ├── OfferForm.tsx
│   │   │   └── OfferList.tsx
│   │   ├── protected/
│   │   │   ├── ProtectedAdmin.tsx
│   │   │   ├── ProtectedProvider.tsx
│   │   │   └── ProtectedUser.tsx
│   │   ├── provider/
│   │   │   ├── CompleteProfileFom.tsx
│   │   │   ├── ProviderBookedDetail.tsx
│   │   │   ├── ProviderBookings.tsx
│   │   │   ├── ProviderDashboard.tsx
│   │   │   └── ProviderWallet.tsx
│   │   ├── user/
│   │   │   ├── SearchForm.tsx
│   │   │   ├── UserBookings.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── UserEditProfileModal.tsx
│   │   │   ├── UserHeader.tsx
│   │   │   ├── UserHome.tsx
│   │   │   └── UserWallet.tsx
│   │   ├── user-authentication/
│   │   │   ├── AuthForm.tsx
│   │   │   ├── ChangePasswordModal.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── GoogleAuth.tsx
│   │   │   ├── OtpForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── SignUpFormProvider.tsx
│   │   └── wallet/
│   │       ├── AddMoneyModal.tsx
│   │       └── AddMoneyProviderModal.tsx
│   ├── config/
│   │   └── axios.ts
│   ├── hooks/
│   │   ├── admin/
│   │   │   ├── useAdminDashboard.tsx
│   │   │   ├── useAdminFlights.tsx
│   │   │   ├── useAdminProviders.tsx
│   │   │   ├── useAdminUsers.tsx
│   │   │   ├── useAdminWallet.tsx
│   │   │   ├── useFlightApproval.tsx
│   │   │   └── useProviderVerification.tsx
│   │   ├── booking/
│   │   │   ├── useBookedDetail.tsx
│   │   │   ├── useBookingDetails.tsx
│   │   │   ├── useBookingSegment.tsx
│   │   │   ├── useBookingSummary.tsx
│   │   │   ├── useFoodSelection.tsx
│   │   │   ├── usePassengerForm.tsx
│   │   │   ├── usePayment.tsx
│   │   │   ├── usePaymentSuccess.tsx
│   │   │   ├── useRetryPayment.tsx
│   │   │   ├── useSeatSelection.tsx
│   │   │   └── useUserBookings.tsx
│   │   ├── food/
│   │   │   ├── useEditFood.tsx
│   │   │   ├── useFood.tsx
│   │   │   └── useProviderFood.tsx
│   │   ├── offer/
│   │   │   ├── useEditOffer.tsx
│   │   │   ├── useOffer.tsx
│   │   │   └── useProviderOffer.tsx
│   │   ├── provider/
│   │   │   ├── useAircraft.tsx
│   │   │   ├── useAircraftList.tsx
│   │   │   ├── useAircraftSchedule.tsx
│   │   │   ├── useAircraftSeats.tsx
│   │   │   ├── useCompleteProviderHook.tsx
│   │   │   ├── useEditAircraft.tsx
│   │   │   ├── useEditFlight.tsx
│   │   │   ├── useFlight.tsx
│   │   │   ├── useFlightDestinations.tsx
│   │   │   ├── useFlightList.tsx
│   │   │   ├── useProviderBookedDetail.tsx
│   │   │   ├── useProviderBookings.tsx
│   │   │   ├── useProviderDashboard.tsx
│   │   │   ├── useProviderWallet.tsx
│   │   │   ├── useRecurringFlight.tsx
│   │   │   └── useSeatLayout.tsx
│   │   ├── sharedHooks/
│   │   │   ├── useFrogotpasswordForm.tsx
│   │   │   ├── useOtpVerification.tsx
│   │   │   ├── usePagination.tsx
│   │   │   ├── useResetPasswordForm.tsx
│   │   │   └── useUserHeader.tsx
│   │   ├── user/
│   │   │   ├── useChangePassword.tsx
│   │   │   ├── useEditUserProfile.tsx
│   │   │   ├── useFlightSearch.tsx
│   │   │   ├── useGoogleAuth.tsx
│   │   │   ├── userAuthForm.tsx
│   │   │   ├── useUserDashboard.tsx
│   │   │   ├── useUserHome.tsx
│   │   │   └── useUserWallet.tsx
│   │   └── wallet/
│   │       ├── useAddMoney.tsx
│   │       └── useAddmoneyProvider.tsx
│   ├── layouts/
│   │   ├── BackGroundLayout.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProviderHeaderLayout.tsx
│   │   └── ProviderSidebarLayout.tsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   ├── AdminFlightPage.tsx
│   │   │   ├── AdminWalletPage.tsx
│   │   │   ├── AllProvidersPage.tsx
│   │   │   ├── AllUsersPage.tsx
│   │   │   ├── PendingFlightPage.tsx
│   │   │   └── PendingProviderPage.tsx
│   │   ├── auth/
│   │   │   ├── AuthPage.tsx
│   │   │   ├── ForgetPasswordPage.tsx
│   │   │   ├── OtpVerificationPage.tsx
│   │   │   └── ResetPasswordPage.tsx
│   │   ├── booking/
│   │   │   ├── BookedDetailPage.tsx
│   │   │   ├── BookingDetailsPage.tsx
│   │   │   ├── BookingSegmentPage.tsx
│   │   │   ├── BookingSummaryPage.tsx
│   │   │   ├── PaymentPage.tsx
│   │   │   ├── PaymentSuccessPage.tsx
│   │   │   └── RetryPaymentPage.tsx
│   │   ├── food/
│   │   │   ├── AddFoodPage.tsx
│   │   │   ├── EditFoodPage.tsx
│   │   │   └── FoodListPage.tsx
│   │   ├── offer/
│   │   │   ├── AddOfferPage.tsx
│   │   │   ├── EditOfferPage.tsx
│   │   │   └── OfferListPage.tsx
│   │   ├── provider/
│   │   │   ├── AddAircraftPage.tsx
│   │   │   ├── AddFlightPage.tsx
│   │   │   ├── AircraftListPage.tsx
│   │   │   ├── AricraftSeatLayoutPage.tsx
│   │   │   ├── CompleteProfilePage.tsx
│   │   │   ├── EditAircraftPage.tsx
│   │   │   ├── EditFlightPage.tsx
│   │   │   ├── FlightListPage.tsx
│   │   │   ├── ProviderBookedDetailPage.tsx
│   │   │   ├── ProviderBookingsPage.tsx
│   │   │   ├── ProviderDashboardPage.tsx
│   │   │   ├── ProviderWalletPage.tsx
│   │   │   └── SeatLayoutPage.tsx
│   │   ├── user/
│   │   │   ├── UserBookingsPage.tsx
│   │   │   ├── UserDashboardPage.tsx
│   │   │   ├── UserHomePage.tsx
│   │   │   └── UserWalletPage.tsx
│   │   ├── HomePage.tsx
│   │   └── PageNOtFound.tsx
│   ├── redux/
│   │   ├── admin/
│   │   │   ├── adminSlice.ts
│   │   │   ├── adminThunk.ts
│   │   │   └── adminTypes.ts
│   │   ├── aircraft/
│   │   │   ├── aircraftSlice.ts
│   │   │   ├── aircraftThunk.ts
│   │   │   └── aircraftTypes.ts
│   │   ├── auth/
│   │   │   ├── authSlice.ts
│   │   │   ├── authThunk.ts
│   │   │   └── authTypes.ts
│   │   ├── booking/
│   │   │   ├── bookingSlice.ts
│   │   │   ├── bookingThunk.ts
│   │   │   └── bookingTypes.ts
│   │   ├── destination/
│   │   │   ├── destinationSlice.ts
│   │   │   ├── destinationThunk.ts
│   │   │   └── destinationTypes.ts
│   │   ├── flight/
│   │   │   ├── flightSlice.ts
│   │   │   ├── flightThunk.ts
│   │   │   └── flightTypes.ts
│   │   ├── food/
│   │   │   ├── foodSlice.ts
│   │   │   ├── foodThunk.ts
│   │   │   └── foodTypes.ts
│   │   ├── offer/
│   │   │   ├── offerSlice.ts
│   │   │   ├── offerThunk.ts
│   │   │   └── offerTypes.ts
│   │   ├── providerBooking/
│   │   │   ├── providerBookingSlice.ts
│   │   │   ├── providerBookingThunk.ts
│   │   │   └── providerBookingTypes.ts
│   │   ├── seat/
│   │   │   ├── seatSlice.ts
│   │   │   ├── seatThunk.ts
│   │   │   └── seatTypes.ts
│   │   └── wallet/
│   │       ├── walletSlice.ts
│   │       ├── walletThunk.ts
│   │       └── walletTypes.ts
│   ├── routes/
│   │   ├── adminRoutes.tsx
│   │   ├── providerRoutes.tsx
│   │   └── userRoutes.tsx
│   ├── types/
│   │   ├── amenities.ts
│   │   └── authTypes.ts
│   ├── utils/
│   │   ├── amenities.tsx
│   │   ├── debounce.ts
│   │   ├── OtpConstants.ts
│   │   ├── toast.ts
│   │   ├── uploadToCloudinary.ts
│   │   └── validationSchema.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables
```
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_GOOGLE_CLIENT_ID=
VITE_API_BASE_URL=
VITE_CLOUDINARY_NAME=
VITE_CLOUDINARY_URL=
VITE_CLOUDINARY_PRESET=
```

