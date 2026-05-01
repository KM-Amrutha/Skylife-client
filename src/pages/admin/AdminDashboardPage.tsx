import React from "react";
import AdminDashboard from "../../components/admin/AdminDashboard";
import useAdminDashboard from "../../hooks/admin/useAdminDashboard";

const AdminDashboardPage: React.FC = () => {
  const {
    pendingProviders,
    isLoading,
    handleVerifyProvider,
    handleRejectProvider,
  } = useAdminDashboard();

  return (
    <AdminDashboard
      pendingProviders={pendingProviders}
      onVerifyProvider={handleVerifyProvider}
      onRejectProvider={handleRejectProvider}
      isLoading={isLoading}
    />
  );
};

export default AdminDashboardPage;
