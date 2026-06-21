import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import OfferList from "../../components/offer/OfferList";

const OfferListPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      <div className="p-4 md:p-8 pt-20 lg:pt-8">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold">Offers</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage discount offers for your flights
          </p>
        </div>
        <OfferList />
      </div>
    </ProviderMainLayout>
  );
};

export default OfferListPage;