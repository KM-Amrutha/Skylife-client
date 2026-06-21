import { Route } from 'react-router-dom';
import ProtectedAdmin from '../components/protected/ProtectedAdmin';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import PendingProviderPage from '../pages/admin/PendingProviderPage';
import PendingFlightPage from '../pages/admin/PendingFlightPage';
import AllProvidersTablePage from '../pages/admin/AllProvidersPage';
import AllUsersTablePage from '../pages/admin/AllUsersPage';
import AdminFlights from '../components/admin/AdminFlights';
import AdminWalletPage from '../pages/admin/AdminWalletPage';

const AdminRoutes = () => (
  <Route element={<ProtectedAdmin />}>
    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    <Route path="/admin/pending-providers" element={<PendingProviderPage />} />
    <Route path="/admin/pending-flights" element={<PendingFlightPage />} />
    <Route path="/admin/providers" element={<AllProvidersTablePage />} />
    <Route path="/admin/users" element={<AllUsersTablePage />} />
    <Route path="/admin/flights" element={<AdminFlights />} />
    <Route path="/admin/wallet" element={<AdminWalletPage />} />
  </Route>
);

export default AdminRoutes;