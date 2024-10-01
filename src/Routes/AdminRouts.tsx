import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from '../pages/adminPage/AdminLoginPage';
import AdminDashboard from '../pages/adminPage/AdminLayout';
import AdminUserManagementTable from '../pages/adminPage/UserManagmentTable';
import AdminRouteProtector from './ProtectRout/AdminRoutProtector';
import AdminAuthProtector from './ProtectRout/AdminAuthProtector';
import React from 'react';
import CategoryManagementTable from '../pages/adminPage/CategoryManagment';

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      {/* Admin login route */}
      <Route path="/" element={<AdminAuthProtector element={AdminLoginPage} />} />

      <Route path="/admin-dashboard" element={<AdminRouteProtector element={AdminDashboard} />}>
        <Route path="user-management" element={<AdminUserManagementTable />} />
        <Route path="category-management" element={<CategoryManagementTable />} />

        {/* Corrected spelling */}
      </Route>
    </Routes>
  );
};

export default AdminRoute;
