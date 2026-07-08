import React from "react";
import ProviderBookings from "../../components/provider/ProviderBookings";
import ProviderHeaderLayout from '../../layouts/ProviderHeaderLayout';
import ProviderSidebarLayout from '../../layouts/ProviderSidebarLayout';

const ProviderBookingsPage: React.FC = () => {
  return (
      <div className="flex min-h-screen bg-slate-100">
      <ProviderSidebarLayout />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <ProviderHeaderLayout />
        <div className="flex-1 overflow-y-auto">
          {/* Component handles its own modal state now */}
          <ProviderBookings />
        </div>
      </div>
    </div>
  );
}
export default ProviderBookingsPage;