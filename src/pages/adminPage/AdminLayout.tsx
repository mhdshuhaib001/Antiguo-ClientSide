import React from "react";
import AdminSideBare from "../../components/Admin/AdminSideBare";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AdminSideBare />
      <div className="flex-grow bg-gray-100 overflow-y-auto p-4">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
