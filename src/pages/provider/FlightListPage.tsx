import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import ProviderFlightsTable from "../../components/flight/flightTableForm";

const ProviderFlightsPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      <div
        className="relative rounded-2xl overflow-hidden p-8"
        style={{
          backgroundImage: "url(/image/airplane-sunset.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />

        <div className="relative z-10 flex flex-col items-center justify-start min-h-[600px]">
          <div className="w-full max-w-6xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <ProviderFlightsTable />
          </div>
        </div>
      </div>
    </ProviderMainLayout>
  );
};

export default ProviderFlightsPage;
