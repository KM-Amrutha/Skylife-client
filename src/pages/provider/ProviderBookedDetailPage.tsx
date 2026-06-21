import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import ProviderBookedDetail from "../../components/provider/ProviderBookedDetail";

const ProviderBookedDetailPage: React.FC = () => (
  <ProviderMainLayout>
    <ProviderBookedDetail />
  </ProviderMainLayout>
);

export default ProviderBookedDetailPage;