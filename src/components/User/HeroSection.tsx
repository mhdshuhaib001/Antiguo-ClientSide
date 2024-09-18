import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
    className="relative bg-gradient-to-l from-[#4c7940] via-[#83b276] to-[#e9f2e6] overflow-hidden h-[85vh]"
    style={{
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
      }}
    >
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}
      >
        
      </div>
      {/* Content Container */}
      <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center text-left z-10 h-full">
        {/* Left Side: Text Area */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c4027] mb-4">
            Welcome to AuctionGems
          </h1>
          <p className="text-lg md:text-xl text-[#4c7940] mb-6">
            Discover unique antique treasures and participate in exciting live
            auctions.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mb-8">
            <a
              href="#start-bidding"
              className="bg-[#619453] text-white py-3 px-6 rounded-md hover:bg-[#4c7940]"
            >
              Start Bidding
            </a>

            <a
              href="#view-all-auctions"
              className="border border-[#4c7940] text-[#4c7940] py-3 px-6 rounded-md  hover:text-white hover:bg-[#4c7940]/60  hover:backdrop-blur-sm hover:backdrop:bg-opacity-20" 
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
