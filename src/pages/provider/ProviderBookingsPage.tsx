import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import ProviderBookings from "../../components/provider/ProviderBookings";

const ProviderBookingsPage: React.FC = () => (
  <ProviderMainLayout>
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Bookings</h1>
        <ProviderBookings />
      </div>
    </div>
  </ProviderMainLayout>
);
export default ProviderBookingsPage;