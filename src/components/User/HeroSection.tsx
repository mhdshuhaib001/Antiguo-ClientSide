// import React, { useState, useEffect } from 'react';

// const slides = [
//   {
//     title: 'Welcome to AuctionGems',
//     description: 'Discover unique antique treasures and participate in exciting live auctions.',
//     image1: '/assets/Hearo2.jpg',
//     image2: '/assets/Hearo1.jpg',
//   },
//   {
//     title: 'Bid on Rare Collectibles',
//     description: 'Explore our collection of one-of-a-kind vintage items and make them yours.',
//     image1: '/assets/Hearo2.jpg',
//     image2: '/assets/Hearo1.jpg',
//   },

// ];

// const HeroSection: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       className="relative bg-gradient-to-l from-[#c9a227] via-[#e5cc6f] to-[#f7efc1] overflow-hidden h-[85vh]"
//       style={{
//         borderBottomLeftRadius: '40px',
//         borderBottomRightRadius: '40px',
//       }}
//     >
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
//         style={{ backgroundImage: `url(${slides[currentSlide].image1})` }}
//       ></div>

//       {/* Content Container */}
//       <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center text-left z-10 h-full">
//         {/* Left Side: Text Area */}
//         <div className="md:w-1/2">
//           <h1 className="text-4xl md:text-5xl font-bold text-[#2c2416] mb-4">
//             {slides[currentSlide].title}
//           </h1>
//           <p className="text-lg md:text-xl text-[#4a3c2e] mb-6">
//             {slides[currentSlide].description}
//           </p>

//           {/* Buttons */}
//           <div className="flex space-x-4 mb-8">
//             <a
//               href="#start-bidding"
//               className="bg-[#b8860b] text-white py-3 px-6 rounded-md hover:bg-[#9b7209]"
//             >
//               Start Bidding
//             </a>

//             <a
//               href="#view-all-auctions"
//               className="border border-[#4a3c2e] text-[#4a3c2e] hover:bg-[#4a3c2e] py-3 px-6 rounded-md hover:text-white hover:backdrop-blur-sm hover:backdrop:bg-opacity-20"
//             >
//               View All Auctions
//             </a>
//           </div>
//         </div>

//         {/* Right Side: Image Carousel */}
//         <div className="md:w-1/2 flex flex-col md:flex-row gap-4 md:gap-8 mt-8 md:mt-0">
//           <div
//             className="w-[260.75px] h-[410.69px] bg-white shadow-lg"
//             style={{
//               borderTopLeftRadius: '30px',
//               borderBottomLeftRadius: '10px',
//               borderBottomRightRadius: '30px',
//               borderTopRightRadius: '10px',
//             }}
//           >
//             <img
//               src={slides[currentSlide].image1}
//               alt={`Auction Ad ${currentSlide + 1}`}
//               className="w-full h-full object-cover"
//               style={{
//                 borderTopLeftRadius: '30px',
//                 borderBottomLeftRadius: '10px',
//                 borderBottomRightRadius: '30px',
//                 borderTopRightRadius: '10px',
//               }}
//             />
//           </div>
//           <div
//             className="w-[266px] h-[295px] bg-white shadow-lg"
//             style={{
//               borderTopLeftRadius: '30px',
//               borderBottomLeftRadius: '10px',
//               borderBottomRightRadius: '30px',
//               borderTopRightRadius: '10px',
//             }}
//           >
//             <img
//               src={slides[currentSlide].image2}
//               alt={`Auction Ad ${currentSlide + 1}`}
//               className="w-full h-full object-cover"
//               style={{
//                 borderTopLeftRadius: '30px',
//                 borderBottomLeftRadius: '10px',
//                 borderBottomRightRadius: '30px',
//                 borderTopRightRadius: '10px',
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Welcome to AuctionGems',
    description: 'Discover unique antique treasures and participate in exciting live auctions.',
    image: '/assets/Hearo2.jpg', // Single image reference
  },
  {
    title: 'Bid on Rare Collectibles',
    description: 'Explore our collection of one-of-a-kind vintage items and make them yours.',
    image: '/assets/Hearo1.jpg', // Single image reference
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-gradient-to-l from-[#c9a227] via-[#e5cc6f] to-[#f7efc1] overflow-hidden h-[85vh]"
      style={{
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      ></div>

      {/* Content Container */}
      <div className="relative container mx-auto px-6 py-20 flex flex-col md:flex-row items-center text-left z-10 h-full">
        {/* Left Side: Text Area */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c2416] mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-[#4a3c2e] mb-6">
            {slides[currentSlide].description}
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mb-8">
            <a
              href="#start-bidding"
              className="bg-[#b8860b] text-white py-3 px-6 rounded-md hover:bg-[#9b7209]"
            >
              Start Bidding
            </a>

            <a
              href="#view-all-auctions"
              className="border border-[#4a3c2e] text-[#4a3c2e] hover:bg-[#4a3c2e] py-3 px-6 rounded-md hover:text-white hover:backdrop-blur-sm hover:backdrop:bg-opacity-20"
            >
              View All Auctions
            </a>
          </div>
        </div>

        {/* Right Side: Single Image */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div
            className="w-[400px] h-[400px] bg-white shadow-lg"
            style={{
              borderRadius: '30px',
            }}
          >
            <img
              src={slides[currentSlide].image}
              alt={`Auction Ad ${currentSlide + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
