import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
    className="relative bg-gradient-to-l  from-[#c9a227] via-[#e5cc6f] to-[#f7efc1] overflow-hidden h-[85vh]"
    style={{
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
      }}
    >
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg co"
        style={{ backgroundImage: 'url()' }}
      >
        
      </div>
      {/* Content Container */}
      <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center text-left z-10 h-full">
        {/* Left Side: Text Area */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c2416] mb-4">
            Welcome to AuctionGems
          </h1>
          <p className="text-lg md:text-xl text-[#4a3c2e] mb-6">
            Discover unique antique treasures and participate in exciting live
            auctions.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mb-8">
            <a
              href="#start-bidding"
              className="bg-[#b8860b] text-white py-3 px-6 rounded-md  hover:bg-[#9b7209]"
            >
              Start Bidding
            </a>

            <a
              href="#view-all-auctions"
              className="border border-[#4a3c2e] text-[#4a3c2e] hover:bg-[#4a3c2e] py-3 px-6 rounded-md  hover:text-white hover:backdrop-blur-sm hover:backdrop:bg-opacity-20" 
            >
              View All Auctions
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col md:flex-row gap-4 md:gap-8 mt-8 md:mt-0">
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
              src="/assets/Hearo2.jpg"
              alt="Auction Ad 1"
              className="w-full h-full object-cover "
              style={{
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '30px',
                borderTopRightRadius: '10px',
              }}
            />
          </div>
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
              src="/assets/Hearo1.jpg"
              alt="Auction Ad 2"
              className="w-full h-full object-cover"
              style={{
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '30px',
                borderTopRightRadius: '10px',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
