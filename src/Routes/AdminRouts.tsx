import { Route, Routes } from 'react-router-dom';
import AdminLogin from '../pages/adminPage/AdminLoginPage';
import AdminDashbord from '../pages/adminPage/AdminLayout';
import AdminUserTable from '../components/Admin/Table';
import AdminRoutProtector from './ProtectRout/AdminRoutProtector';

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      {/* Admin login route */}
      <Route path="/" element={<AdminLogin />} />

      <Route
        path="/admin-dashboard"
        element={<AdminRoutProtector element={AdminDashbord} />}
      >
        <Route path="userManagment" element={<AdminUserTable />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
