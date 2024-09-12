import React from 'react';
import { Link } from 'react-router-dom';

const SellerNavigation: React.FC = () => {
  return (
    <div className="h-full w-full bg-white ">
      {/* Navigation Links Above Horizontal Line */}
      <div className="relative mb-6">
        {/* Navigation Links */}
        <div className="absolute inset-x-0 top-0 flex justify-items-start px-6">
          <Link
            to="/seller/product-management  "
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
        </div>
        {/* Horizontal Line */}
        <div className="w-full border-t border-gray-300 mt-8"></div>
      </div>

      {/* Define Routes for different sections */}
      <div className="flex-grow">{/* Routes would be defined here */}</div>
    </div>
  );
};

export default SellerNavigation;
