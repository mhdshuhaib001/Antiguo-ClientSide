import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center ps-8 flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-800 shadow-lg rounded-md">
        <div className="p-4">
          <h2 className="text-xl text-white font-bold">My Profile</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link to="/profile/dashboard" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">Profile</Link>
          <Link to="/profile/seller" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">Sell</Link>
          {/* Adjust the hrefs to link to real paths */}
          <Link to="/profile/password" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">password</Link>

          <a href="#my-auctions" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">My Auctions</a>
          <a href="#payments" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">Payments</a>
          <a href="#orders" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">Orders</a>
          <a href="#password" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">Password</a>
          <a href="#settings" className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200">Settings</a>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
