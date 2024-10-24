import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {User}  from 'lucide-react'
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
  }, []);
 
  return (
    <header className="bg-[#fcfaee] border border-b border-[#7c4b24] shadow-md py-2">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div onClick={()=>navigate('/')}
         className="text-xl font-bold text-gray-800 cursor-pointer">AuctionGems</div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          <a href="#auction" className="text-gray-600 hover:text-gray-900">
            Auction
          </a>
          <a href="#live-auction" className="text-gray-600 hover:text-gray-900">
            Live Auction
          </a>
          <a href="#wishlist" className="text-gray-600 hover:text-gray-900">
            Wishlist
          </a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </a>

          {/* Chat Icon */}
          <a
            onClick={()=>navigate('/chat')}
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 6h18M3 14h18M3 18h18"
              />
            </svg>
          </a>

          {/* Profile Button */}
          {token ? (
            <button
              className="flex items-center bg-[#975f26] text-[#f7efc1]  hover:text-[#e5cc6f] py-1 px-4 rounded-md hover:bg-[#663f21] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ml-4"
              onClick={() => {
                navigate('/profile/dashboard');
              }}
            >
              <User size={20} className='mr-2'/>
              Profile
            </button>
          ) : (
            <button onClick={()=>{navigate('/registration')}} className="bg-[#975f26] text-white py-1 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ml-4">
              Register
            </button>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} px-6 mt-4`}>
        <a
          href="#auction"
          className="block py-2 text-gray-600 hover:text-gray-900"
        >
          Auction
        </a>
        <a
          href="#live-auction"
          className="block py-2 text-gray-600 hover:text-gray-900"
        >
          Live Auction
        </a>
        <a
          href="#wishlist"
          className="block py-2 text-gray-600 hover:text-gray-900"
        >
          Wishlist
        </a>
        <a href="#faq" className="block py-2 text-gray-600 hover:text-gray-900">
          FAQ
        </a>
        <button className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2">
          Profile
        </button>
      </div>
    </header>
  );
};

export default Header;
