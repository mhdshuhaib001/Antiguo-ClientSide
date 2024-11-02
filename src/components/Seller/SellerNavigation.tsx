import React from 'react';
import { Link } from 'react-router-dom';

const SellerNavigation: React.FC = () => {
  return (
    <div className=" w-full bg-main-bg border-border-accent">
      <div className="relative mb-6">
        {/* Navigation Links */}
        <div className="absolute inset-x-0 top-0 flex justify-between px-6">
          <Link
            to="/profile/seller/dashboard"
            className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
          >
            Seller Dashboard
          </Link>
          <Link
            to="/profile/seller/product-management"
            className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
          >
            Product Management
          </Link>
      
          <Link
            to="/profile/seller/about"
            className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
          >
            About Area
          </Link>
          <Link
            to="/profile/seller/order-management"
            className="text-gray-800 text-sm font-medium py-2 px-4 hover:bg-gray-100"
          >
            Order Management
          </Link>
        </div>
      </div>
      {/* Horizontal Line */}
      <div className="w-full border-t border-gray-300 mt-8"></div>

      {/* Define Routes for different sections */}
      <div className="flex-grow">
        {/* Routes would be defined here */}
      </div>
    </div>
  );
};

export default SellerNavigation;
