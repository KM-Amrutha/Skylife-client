import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import ProviderWallet from "../../components/provider/ProviderWallet";

const ProviderWalletPage: React.FC = () => (
  <ProviderMainLayout>
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="max-w-2xl mx-auto">
        <ProviderWallet />
      </div>
    </div>
  </ProviderMainLayout>
);
export default ProviderWalletPage;