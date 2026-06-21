import { Route } from 'react-router-dom';
import ProtectedProvider from '../components/protected/ProtectedProvider';
import ProviderDashboardPage from '../pages/provider/ProviderDashboardPage';
import CompleteProfilePage from '../pages/provider/CompleteProfilePage';
import AddAircraftPage from '../pages/provider/AddAircraftPage';
import AircraftListPage from '../pages/provider/AircraftListPage';
import EditAircraftPage from '../pages/provider/EditAircraftPage';
import AircraftSeatLayoutPage from '../pages/provider/AricraftSeatLayoutPage';
import AddFlightPage from '../pages/provider/AddFlightPage';
import FlightListPage from '../pages/provider/FlightListPage';
import EditFlightPage from '../pages/provider/EditFlightPage';
import AddFoodPage from '../pages/food/AddFoodPage';
import FoodListPage from '../pages/food/FoodListPage';
import EditFoodPage from '../pages/food/EditFoodPage';
import AddOfferPage from '../pages/offer/AddOfferPage';
import OfferListPage from '../pages/offer/OfferListPage';
import EditOfferPage from '../pages/offer/EditOfferPage';
import ProviderBookingsPage from '../pages/provider/ProviderBookingsPage';
import ProviderWalletPage from '../pages/provider/ProviderWalletPage';
import ProviderBookedDetailPage from '../pages/provider/ProviderBookedDetailPage';

const ProviderRoutes = () => (
  <Route element={<ProtectedProvider />}>
    <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
    <Route path="/provider/complete-profile" element={<CompleteProfilePage />} />
    <Route path="/provider/add-aircraft" element={<AddAircraftPage />} />
    <Route path="/provider/aircraft-list" element={<AircraftListPage />} />
    <Route path="/provider/aircraft/:aircraftId/edit" element={<EditAircraftPage />} />
    <Route path="/provider/aircraft/:aircraftId/seat-layout" element={<AircraftSeatLayoutPage />} />
    <Route path="/provider/add-flight" element={<AddFlightPage />} />
    <Route path="/provider/flight-list" element={<FlightListPage />} />
    <Route path="/provider/update-flights/:flightId" element={<EditFlightPage />} />
    <Route path="/provider/add-food" element={<AddFoodPage />} />
    <Route path="/provider/food-list" element={<FoodListPage />} />
    <Route path="/provider/update-food/:foodId" element={<EditFoodPage />} />
    <Route path="/provider/add-offer" element={<AddOfferPage />} />
    <Route path="/provider/offer-list" element={<OfferListPage />} />
    <Route path="/provider/update-offer/:offerId" element={<EditOfferPage />} />
    <Route path="/provider/bookings" element={<ProviderBookingsPage />} />
    <Route path="/provider/wallet" element={<ProviderWalletPage />} />
    <Route path="/provider/bookings/:bookingId" element={<ProviderBookedDetailPage />} />
    
  </Route>
);

export default ProviderRoutes;