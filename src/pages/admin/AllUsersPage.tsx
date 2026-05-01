import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AllUsersTable from "../../components/admin/AllUsersTable";



const AllUsersPage: React.FC = () => {
  return (
    <AdminLayout title="All Users">
      <AllUsersTable />
    </AdminLayout>
  );
};

export default AllUsersPage;