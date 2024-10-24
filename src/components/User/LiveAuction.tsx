import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MessageCircle, MoreVertical, ChevronRight } from 'lucide-react';
import { Image } from '@nextui-org/react';
import { useGetProductByIdQuery } from '../../services/apis/productApi';
import { useGetAuctionByIdQuery, usePlaceBidMutation } from '../../services/apis/auctionApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

type Bid = {
  id?: string;
  bidder: string;
  amount: number;
  time: Date | string;
  avatar: string;
};

const quickBids = [1590, 1600, 1750, 1890];

export default function RealTimeBidding() {
  const userData = useSelector((state: RootState) => state.User);
  const userId = userData._id;
  const { id } = useParams<{ id: string }>();
  const [customBid, setCustomBid] = useState('');
  const [placeBid] = usePlaceBidMutation();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [quickBids, setQuickBids] = useState<number[]>([]);

  const { productData, sellerData: sellerProfile } = data || {};
  const [currentBid, setCurrentBid] = useState(productData.reservePrice);

  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<any>(null);
  const [bids, setBids] = useState<Bid[]>([]);

  const {
    data: auctionData,
    error: auctionError,
    isLoading: auctionLoading,
  } = useGetAuctionByIdQuery(id);

  useEffect(() => {
    const generateQuickBids = (currentBid: number) => {
      const increment = 10;
      return [
        currentBid + increment * 1,
        currentBid + increment * 2,
        currentBid + increment * 3,
        currentBid + increment * 4,
      ];
    };

    if (currentBid !== undefined) {
      setQuickBids(generateQuickBids(currentBid));
    }
  }, [currentBid]);

  useEffect(() => {
    console.log(typeof auctionData, 'type of auctionData');
    console.log(auctionData, 'auctionData structure');

    if (Array.isArray(auctionData)) {
      const fetchedBids = auctionData.map((bid: any) => ({
        id: bid.id,
        bidder: bid.bidder,
        amount: bid.amount,
        time: new Date(bid.time),
        avatar: bid.avatar || 'default_avatar_url',
      }));
      setBids(fetchedBids.sort((a, b) => b.amount - a.amount));
    }
  }, [auctionData]);

  useEffect(() => {
    const socket = io('http://localhost:8001');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to socket');
    });

    socket.on('disconnect', () => {
      console.warn('Disconnected from socket');
    });

    socket.emit('join_auction', id, userId);

    socket.on('new_bid', (newBid: any) => {
      console.log('new bid placed', newBid, userId);
    
      try {
        const updatedBid: Bid = {
          ...newBid,
          time: new Date(),
          avatar: 'profile',
        };
        const updatedBids = [updatedBid, ...bids].sort((a, b) => b.amount - a.amount);
        setBids(updatedBids);
        setCurrentBid(updatedBids[0].amount); 
      } catch (error) {
        console.log('socket error:', error);
      }
    });
    
    return () => {
      socket.disconnect();
    };
  }, [id, userId, bids]);

  useEffect(() => {
    const socket = io('http://localhost:8001');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to socket  for the end auction chekcing ');

      socket.emit('join_auction', id, userId);
    });

    socket.on('disconnect', () => {
      console.warn('Disconnected from socket');
    });

    socket.on('auctionEnded', (data) => {
      console.log('Auction ended event received', data);
      if (data.winner === userId) {
        setModalMessage(`Congratulations! You have won the auction for $${data.amount}!`);
        setIsModalOpen(true);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id, userId]);

  const handleBid = async (amount: number) => {
    if (socketRef.current == null) {
      console.error('Socket is not initialized.');
      return;
    }
  
    // Validation checks
    if (amount <= currentBid) {
      toast.error('Your quick bid must be greater than the current bid.');
      setModalMessage('Your quick bid must be greater than the current bid.');
      setIsModalOpen(true);
      return;
    }
  
    setIsPlacingBid(true);
  
    try {
      // Emit the bid to the auction room
      socketRef.current.emit('place_bid', {
        auctionId: id,
        bidder: userId,
        amount,
        time: new Date(),
      });
  
      // Call your mutation to save the bid to the database
      const response = await placeBid({
        auctionId: id,
        bidderId: userId,
        currentBid: currentBid,
        bidAmount: amount,
        time: new Date(),
        sellerId: sellerProfile?.sellerId,
      }).unwrap();
  
      // Create a new bid object
      const updatedBid: Bid = {
        bidder: userData.name,
        amount,
        time: new Date(),
        avatar: 'profile',
      };
  
      // Update the local bids state
      const updatedBids = [updatedBid, ...bids].sort((a, b) => b.amount - a.amount);
      setBids(updatedBids);
      setCurrentBid(updatedBids[0].amount);  
    } catch (error) {
      console.error('Failed to place bid:', error);
      setModalMessage('An error occurred while placing your bid. Please try again.');
      setIsModalOpen(true);
    } finally {
      setIsPlacingBid(false);
    }
  };
  

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (productData?.auctionEndDateTime) {
      const auctionEndTime = new Date(productData.auctionEndDateTime).getTime();
      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = auctionEndTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };

      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [productData?.auctionEndDateTime]);

  const handleCustomBid = async (e: React.FormEvent) => {
    e.preventDefault();

    if (socketRef.current == null) {
      console.error('Socket is not initialized.');
      return;
    }

    const bid = parseFloat(customBid);

    // Reset customBid for UI purposes
    setCustomBid('');

    // Validation checks
    if (isNaN(bid) || bid <= currentBid) {
      toast.error('Your bid must be a valid number greater than the current bid.');

      setModalMessage('Your bid must be a valid number greater than the current bid.');
      setIsModalOpen(true);
      return;
    }

    setIsPlacingBid(true);

    try {
      socketRef.current.emit('place_bid', {
        auctionId: id,
        bidder: userData.name,
        amount: bid,
        time: new Date(),
      });

      const response = await placeBid({
        auctionId: id,
        bidderId: userId,
        currentBid: currentBid,
        bidAmount: bid,
        time: new Date(),
        sellerId: sellerProfile?.sellerId,
      }).unwrap();

      const updatedBid: Bid = {
        bidder: userData.name,
        amount: bid,
        time: new Date(),
        avatar: 'profile',
      };
      const updatedBids = [updatedBid, ...bids].sort((a, b) => b.amount - a.amount);
      setBids(updatedBids);
      setCurrentBid(updatedBids[0].amount); 
        } catch (error) {
      console.error('Failed to place bid:', error);
      setModalMessage('An error occurred while placing your bid. Please try again.');
      setIsModalOpen(true);
    } finally {
      setIsPlacingBid(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product data.</div>;
  if (!productData) return <div>No product data found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1">
            <Image
              isBlurred
              width={240}
              height={240}
              src={productData.images[0]}
              alt="Product Image"
              className="m-5"
            />
          </div>
          <h1 className="text-2xl font-bold">{productData.itemTitle}</h1>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Start Price:</p>
              <p className="text-xl font-semibold">$ {productData.reservePrice}</p>
            </div>
            <div>
              <p className="text-gray-600">Current Price:</p>
              <p className="text-2xl font-bold text-green-600">$ {currentBid.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-600">Seconds</div>
              </div>
            </div>
            <p className="text-center mt-2 text-sm text-gray-600">
              Ending On:{' '}
              {new Date(productData.auctionEndDateTime).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              ,{' '}
              {new Date(productData.auctionEndDateTime).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Image
                src={sellerProfile?.profile}
                alt={sellerProfile?.companyName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h2 className="font-semibold">{sellerProfile?.companyName}</h2>
                {/* <p className="text-sm text-gray-600">8.3K Items sold</p> */}
              </div>
            </div>
            {/* <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-yellow-400"
                    fill={star <= 4 ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <MessageCircle className="w-6 h-6 text-gray-600" />
              <MoreVertical className="w-6 h-6 text-gray-600" />
            </div> */}
          </div>
          <div className="bg-orange-100  rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Bidding Leader</h3>

            {bids.length > 0 ? (
              <div className="space-y-4">
                {bids.map((bid) => (
                  <div key={bid.id} className="flex items-center space-x-3">
                    <Image
                      src={bid.avatar}
                      alt={bid.bidder}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{bid.bidder}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(bid.time).toLocaleTimeString()} for{' '}
                        {bid.amount ? bid.amount.toFixed(2) : '0.00'}$
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-gray-600 text-center">Be the first to start the bidding!</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {quickBids.map((bid) => (
              <button
                key={bid}
                onClick={() => handleBid(bid)}
                className="bg-amber-100 text-amber-950 py-2 rounded-lg hover:bg-amber-200 transition duration-300"
              >
                $ {bid}
              </button>
            ))}
          </div>
          <form onSubmit={handleCustomBid} className="flex space-x-2">
            <input
              type="number"
              value={customBid}
              onChange={(e) => setCustomBid(e.target.value)}
              placeholder="Enter your bid"
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              type="submit"
              className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-500 border-amber-200 transition duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
