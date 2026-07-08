import React from "react";
import SeatLayoutForm from "../../components/aircraft/seatLayoutForm";
import ProviderHeaderLayout from '../../layouts/ProviderHeaderLayout';
import ProviderSidebarLayout from '../../layouts/ProviderSidebarLayout';

const SeatLayoutPage: React.FC = () => {
   return (
    <div className="flex min-h-screen bg-slate-100">
      <ProviderSidebarLayout />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <ProviderHeaderLayout />
        <div className="flex-1 overflow-y-auto">
          <SeatLayoutForm />
        </div>
      </div>
    </div>
  );
  
};

export default SeatLayoutPage;
