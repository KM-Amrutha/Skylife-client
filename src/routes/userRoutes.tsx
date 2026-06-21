import { Route } from 'react-router-dom';
import ProtectedUser from '../components/protected/ProtectedUser';
import UserHomePage from '../pages/user/UserHomePage';
import UserDashboardPage from '../pages/user/UserDashboardPage';
import UserBookingsPage from '../pages/user/UserBookingsPage';
import UserWalletPage from '../pages/user/UserWalletPage';
import BookingSegmentPage from '../pages/booking/BookingSegmentPage';
import BookingDetailsPage from '../pages/booking/BookingDetailsPage';
import BookingSummaryPage from '../pages/booking/BookingSummaryPage';
import PaymentPage from '../pages/booking/PaymentPage';
import RetryPaymentPage from '../pages/booking/RetryPaymentPage';
import PaymentSuccessPage from '../pages/booking/PaymentSuccessPage';
import BookedDetailPage from '../pages/booking/BookedDetailPage';

const UserRoutes = () => (
  <Route element={<ProtectedUser />}>
    <Route path="/user/userhome" element={<UserHomePage />} />
    <Route path="/user/userdashboard" element={<UserDashboardPage />} />
   
    <Route path="/user/bookings/:sessionId/segment" element={<BookingSegmentPage />} />
    <Route path="/user/bookings/:sessionId/passengers" element={<BookingDetailsPage />} />
      <Route path="/user/bookings/:sessionId/summary" element={<BookingSummaryPage />} />
      <Route path="/user/bookings/:bookingId/payment" element={<PaymentPage />} />
       <Route path="/user/bookings/:bookingId/confirmation" element={<PaymentSuccessPage />} />
    <Route path="/user/bookings/:bookingId/failed" element={<RetryPaymentPage />} />
    <Route path="/user/bookings" element={<UserBookingsPage />} />
      <Route path="/user/bookings/:bookingId" element={<BookedDetailPage />} />
      
  
    <Route path="/user/wallet" element={<UserWalletPage />} />
  </Route>
);

export default UserRoutes;