// src/routes/AdminRoute.tsx
import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from '../pages/adminPage/AdminLoginPage';
import AdminDashboard from '../pages/adminPage/AdminLayout';
import AdminUserManagementTable from '../pages/adminPage/UserManagmentTable';
import AdminRouteProtector from './ProtectRout/AdminRoutProtector';
import AdminAuthProtector from './ProtectRout/AdminAuthProtector';
import React from 'react';
import CategoryManagementTable from '../pages/adminPage/CategoryManagment';
<<<<<<< HEAD
import ReportManagment from '../components/Admin/ReportManagment';
import AdminDashBord from '../pages/adminPage/adminDashBord'
=======
<<<<<<< HEAD
import ReportManagment from '../components/Admin/ReportManagment';
import AdminDashBord from '../pages/adminPage/adminDashBord'
=======

>>>>>>> admin/category
>>>>>>> dev
const AdminRoute: React.FC = () => {
  return (
    <Routes>
      {/* Admin login route */}
      <Route path="/" element={<AdminAuthProtector element={AdminLoginPage} />} />

      <Route path="/admin-dashboard" element={<AdminRouteProtector element={AdminDashboard} />}>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> dev
      <Route path='dashboard' element={<AdminDashBord/>}/>
        <Route path="user-management" element={<AdminUserManagementTable />} />
        <Route path="category-management" element={<CategoryManagementTable />} />
        <Route path="report-management" element={<ReportManagment />} />
<<<<<<< HEAD
=======
=======
        <Route path="user-management" element={<AdminUserManagementTable />} />
        <Route path="category-management" element={<CategoryManagementTable />} />

        {/* Corrected spelling */}
>>>>>>> admin/category
>>>>>>> dev
      </Route>
    </Routes>
  );
};

export default AdminRoute;
