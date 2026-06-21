import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import EditFlightForm from "../../components/flight/EditFlightForm";

const EditFlightPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-start min-h-[600px] py-10">
          <div className="w-full max-w-4xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <EditFlightForm />
          </div>
        </div>
    </ProviderMainLayout>
  );
};

export default EditFlightPage;