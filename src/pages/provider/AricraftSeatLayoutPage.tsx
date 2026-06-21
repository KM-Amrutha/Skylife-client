import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import SeatLayoutForm from "../../components/aircraft/seatLayoutForm";

const AircraftSeatLayoutPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      <div className="min-h-screen p-8 bg-gradient-to-r from-purple-900 to-blue-900">
        <SeatLayoutForm />
      </div>
    </ProviderMainLayout>
  );
};

export default AircraftSeatLayoutPage;
