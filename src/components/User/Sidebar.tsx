import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="flex items-center ps-8 min-h-screen bg-gray-100">
    <aside className="w-64 bg-gray-800 shadow-lg rounded-md">
      <div className="p-4">
        <h2 className="text-xl text-white font-bold">
          My Profile
        </h2>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <a
          href="#dashboard"
          className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200"
        >
          Dashboard
        </a>
        <a
          href="#my-auctions"
          className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200"
        >
          My Auctions
        </a>
        <a
          href="#payments"
          className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200"
        >
          Payments
        </a>
        <a
          href="#orders"
          className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200"
        >
          Orders
        </a>
        <a
          href="#sell"
          className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200"
        >
          Sell
        </a>
        <a
          href="#password"
          className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200"
        >
          Password
        </a>
        <a
          href="#settings"
          className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded transition duration-200"
        >
          Settings
        </a>
      </nav>
    </aside>
    </div>
  );
};

export default Sidebar;
