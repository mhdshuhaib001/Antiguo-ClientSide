import React from "react";
import { Link } from "react-router-dom";

const AdminSideBare: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col items-center p-4">
      {/* Profile Section */}
      <div className="w-full flex flex-col items-start mb-4 p-4 ml-4">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 bg-gray-600 mb-4 rounded-sm"
        />
        <h2 className="text-lg font-semibold">Admin Name</h2>
        <p className="text-sm text-gray-400">admin@example.com</p>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4 w-full text-start p-4 ml-4">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/admin/admin-dashboard/userManagment">Users</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Products</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Orders</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default AdminSideBare;
