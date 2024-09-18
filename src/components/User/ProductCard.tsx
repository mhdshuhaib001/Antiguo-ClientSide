import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const AuctionItem = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 78, hours: 4, minutes: 0, seconds: 39 });
  const [currentBid, setCurrentBid] = useState(4648);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-64  rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
      <div className="relative h-60">
        <img
          className="w-full h-full object-cover"
          src="/assets/signup.jpg"
          alt="19th century Chinese antique porcelain vase"
        />
        <div className="absolute top-1 left-1 bg-red-600 text-white px-1.5 py-0.5 rounded-full flex items-center">
          <Clock className="w-3 h-3 mr-0.5" />
          <span className="text-xs font-bold">Live</span>
        </div>
        <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-70 rounded-sm text-black p-1">
          <div className="flex justify-between items-center text-xs">
            <div className="text-center">
              <div className="font-bold">{timeLeft.days}</div>
              <div className="text-xxs">Days</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{timeLeft.hours}</div>
              <div className="text-xxs">Hrs</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{timeLeft.minutes}</div>
              <div className="text-xxs">Min</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{timeLeft.seconds}</div>
              <div className="text-xxs">Sec</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-between p-2">
        <div>
          <div className="font-bold text-sm mb-1 truncate">19th century Chinese antique porcelain vase</div>
          <p className="text-gray-700 text-xs">Current Bid at:</p>
          <p className="text-lg font-bold">${currentBid.toLocaleString()}</p>
        </div>
        <button className="bg-black hover:bg-gray-800 text-white text-sm font-bold py-1 px-2 rounded w-full mt-1">
          Bid Now
        </button>
      </div>
    </div>
  );
};

export default AuctionItem;