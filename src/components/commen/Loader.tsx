import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-center space-x-2">
        <div className="h-10 w-10 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="h-10 w-10 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="h-10 w-10 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        <div className="h-10 w-10 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
      </div>
      <h2 className="mt-4 text-xl text-gray-700">Loading...</h2>
    </div>
  );
};

export default Loader;
