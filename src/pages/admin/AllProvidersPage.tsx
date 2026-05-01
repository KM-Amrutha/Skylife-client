import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AllProvidersTable from "../../components/admin/AllProvidersTable";

const AllProvidersPage: React.FC = () => {
  return (
    <AdminLayout title="All Providers">
      <AllProvidersTable />
    </AdminLayout>
  );
};

export default AllProvidersPage;