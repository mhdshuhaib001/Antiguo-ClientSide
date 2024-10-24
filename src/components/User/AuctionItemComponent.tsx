import { Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuctionItemProps from '../../interface/auctionItmeTypes/auctionItme';

const AuctionItem: React.FC<AuctionItemProps> = ({ product, auctionEndTime, status }) => {
  const Navigate = useNavigate();
  
  const calculateTimeLeft = (endTime: string) => {
    const auctionEndDateTime = new Date(endTime).getTime();
    const now = Date.now();
    const timeLeft = auctionEndDateTime - now;

    if (isNaN(auctionEndDateTime)) {
      console.error("Invalid auctionEndTime format");
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    if (timeLeft <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(() =>
    auctionEndTime ? calculateTimeLeft(auctionEndTime) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );

  useEffect(() => {
    if (auctionEndTime) {
      const timerInterval = setInterval(() => {
        const newTimeLeft = calculateTimeLeft(auctionEndTime);
        setTimeLeft(newTimeLeft);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [auctionEndTime]);

  const handleBidClick = () => {
    Navigate(`/product-details/${product.id}`);
  };

  return (
    <div className="w-64 rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
      <div className="relative h-60">
        <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute top-1 left-1 bg-red-600 text-white px-1.5 py-0.5 rounded-full flex items-center">
          <Clock className="w-3 h-3 mr-0.5" />
          <span className="text-xs font-bold">Live</span>
        </div>
        {status === 'auction' && (
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
        )}
      </div>
      <div className="flex-grow flex flex-col justify-between p-2">
        <div>
          <div className="font-bold text-sm mb-1 truncate">{product.name}</div>
          <p className="text-gray-700 text-xs">Current Bid at:</p>
          <p className="text-lg font-bold">${product.currentBid.toLocaleString()}</p>
        </div>
        <button
          onClick={handleBidClick}
          className={`${
            status === 'auction' ? 'bg-amber-300 hover:bg-amber-200' : 'bg-amber-200 hover:bg-amber-300'
          } text-amber-900 font-bold py-1 px-2 rounded w-full mt-1 border border-amber-200`}
        >
          {status === 'auction' ? 'Bid Now' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default AuctionItem;
