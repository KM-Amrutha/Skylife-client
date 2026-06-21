import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import EditOfferForm from "../../components/offer/EditOffer";

const EditOfferPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      <div
        className="relative rounded-2xl overflow-hidden p-8"
        style={{
          backgroundImage: "url(/image/airplane-sunset.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />
        <div className="relative z-10 flex flex-col items-center justify-start min-h-[600px] py-10">
          <div className="w-full max-w-2xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <EditOfferForm />
          </div>
        </div>
      </div>
    </ProviderMainLayout>
  );
};

export default EditOfferPage;