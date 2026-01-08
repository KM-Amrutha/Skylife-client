import React from "react";
import PendingProvider from "../../components/admin/PendingProvider";
import useAdminDashboard from "../../hooks/useAdminDashboard"; 

const PendingProvidersPage: React.FC = () => {
  const {
    pendingProviders,
    isLoading,
    handleVerifyProvider,
    handleRejectProvider,
  } = useAdminDashboard();

  return (
    <PendingProvider
      pendingProviders={pendingProviders}
      onVerifyProvider={handleVerifyProvider}
      onRejectProvider={handleRejectProvider}
      isLoading={isLoading}
    />
  );
};

export default PendingProvidersPage;