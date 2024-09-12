import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-[#81d750] overflow-hidden h-[85vh]"
      style={{
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
      }}
    >
      {' '}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      {/* Content Container */}
      <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center text-left z-10 h-full">
        {/* Left Side: Text Area */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to AuctionGems
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Discover unique antique treasures and participate in exciting live
            auctions.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mb-8">
            <a
              href="#start-bidding"
              className="bg-[#996c1e] text-white py-3 px-6 rounded-md hover:bg-[#7f5d1a]"
            >
              Start Bidding
            </a>

            <a
              href="#view-all-auctions"
              className="bg-transparent border border-white text-white py-3 px-6 rounded-md hover:bg-white hover:text-blue-600"
            >
              View All Auctions
            </a>
          </div>
        </div>

        {/* Right Side: Image Areas */}
        <div className="md:w-1/2 flex flex-col md:flex-row gap-4 md:gap-8 mt-8 md:mt-0">
          {/* First Image with specific dimensions */}
          <div
            className="w-[260.75px] h-[410.69px] bg-white shadow-lg "
            style={{
              borderTopLeftRadius: '30px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '30px',
              borderTopRightRadius: '10px',
            }}
          >
            <img
              src=""
              alt="Auction Ad 1"
              className="w-full h-full object-cover "
            />
          </div>
          {/* Second Image with specific dimensions */}
          <div
            className="w-[266px] h-[295px] bg-white shadow-lg"
            style={{
              borderTopLeftRadius: '30px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '30px',
              borderTopRightRadius: '10px',
            }}
          >
            <img
              src="/path/to/your/image2.jpg"
              alt="Auction Ad 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
