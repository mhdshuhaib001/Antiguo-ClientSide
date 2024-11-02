import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Flag, MessageCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  currentBid: number;
  image: string;
  endTime: Date;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  avatar: string;
}

export default function AuctionStyleSellerProfile() {
  const [activeTab, setActiveTab] = useState('shop');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    [key: number]: { days: number; hours: number; minutes: number; seconds: number };
  }>({});

  const products: Product[] = [
    {
      id: 1,
      name: '19th century Chinese antique porcelain vase',
      currentBid: 4648,
      image: '/placeholder.svg?height=300&width=400&text=Antique+Vase',
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      name: 'Vintage Art Deco chandelier',
      currentBid: 2199,
      image: '/placeholder.svg?height=300&width=400&text=Art+Deco+Chandelier',
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      name: 'Rare first edition classic novel',
      currentBid: 1500,
      image: '/placeholder.svg?height=300&width=400&text=First+Edition+Book',
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 4,
      name: 'Antique brass telescope',
      currentBid: 899,
      image: '/placeholder.svg?height=300&width=400&text=Brass+Telescope',
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      user: 'Eleanor',
      rating: 5,
      comment: "Absolutely adore the antique pocket watch! It's a true piece of history.",
      avatar: '/placeholder.svg?height=100&width=100&text=E',
    },
    {
      id: 2,
      user: 'Theodore',
      rating: 4,
      comment: 'The vintage typewriter is a gem, though it needed a bit of oiling.',
      avatar: '/placeholder.svg?height=100&width=100&text=T',
    },
    {
      id: 3,
      user: 'Beatrice',
      rating: 5,
      comment: 'The classic vinyl records brought back so many wonderful memories!',
      avatar: '/placeholder.svg?height=100&width=100&text=B',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft = products.reduce(
        (acc, product) => {
          const difference = product.endTime.getTime() - now.getTime();
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          acc[product.id] = { days, hours, minutes, seconds };
          return acc;
        },
        {} as { [key: number]: { days: number; hours: number; minutes: number; seconds: number } },
      );
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [products]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New review:', newReview);
    // Here you would typically send the review to your backend
    setNewReview({ rating: 5, comment: '' });
  };

  const handleReportSeller = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Seller reported');
    setIsReportModalOpen(false);
    // Here you would typically send the report to your backend
  };

  const handleBidNow = (productId: number) => {
    console.log('Bid placed on product:', productId);
    // Here you would typically handle the bidding process
  };

  const StarRating = ({
    rating,
    setRating,
  }: {
    rating: number;
    setRating?: (rating: number) => void;
  }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${setRating ? 'cursor-pointer' : ''} ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
            onClick={() => setRating && setRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header with Profile Area */}
      <header className="bg-bg-primary shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src="/placeholder.svg?height=200&width=200&text=Zack"
                alt="Seller Profile"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Zack's Antiques</h1>
                <p className="text-sm text-gray-600">Established 1985 • 2,483 items sold</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-gray-700 mb-2">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> (555) 123-4567
                </p>
               
              </div>
         
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <Flag className="w-4 h-4 mr-1" /> Report Seller
              </button>
              <button
                // onClick={() => }
                className="flex items-center px-3 py-1.5 bg-btn-secondary text-white rounded-full text-sm hover:bg-amber-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-8">
          <ul className="flex justify-center space-x-4 border-b border-gray-200">
            {['Shop', 'About', 'Reviews'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 text-lg font-medium ${
                    activeTab === tab.toLowerCase()
                      ? 'border-b-2 border-border-accent text-amber-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'shop' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-center">Current Auctions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          Live
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          {timeLeft[product.id] && (
                            <div className="text-sm font-semibold">
                              {timeLeft[product.id].days}d {timeLeft[product.id].hours}h{' '}
                              {timeLeft[product.id].minutes}m {timeLeft[product.id].seconds}s
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">Current Bid:</p>
                            <p className="text-xl font-bold">
                              ${product.currentBid.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleBidNow(product.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Bid Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'about' && (
              <section className="max-w-2xl mx-auto">
                <div className="bg-amber-50 border-border-accent     rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">About Zack's Antiques</h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to Zack's Antiques, where every item tells a story. For over three
                    decades, I've been curating a collection of the finest vintage treasures from
                    around the globe. Each piece in our emporium carries with it the charm and
                    craftsmanship of bygone eras.
                  </p>
                  <p className="text-gray-700 mb-4">
                    When you acquire a piece from Zack's Antiques, you're not just purchasing an
                    object – you're becoming a custodian of history. Thank you for your patronage
                    and for helping to keep the spirit of the past alive!
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Visit Our Emporium</h3>
                    <address className="text-gray-700 not-italic">
                      <p className="flex items-center mb-1">
                        <MapPin className="mr-2 text-blue-500" /> 123 Vintage Lane, Nostalgiaville,
                        NT 12345
                      </p>
                      <p className="flex items-center mb-1">
                        <Phone className="mr-2 text-blue-500" /> (555) 123-4567
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 text-blue-500" /> info@zacksantiques.com
                      </p>
                    </address>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'reviews' && (
              <section className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Customer Reviews</h2>
                <div className="space-y-6 mb-8">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg shadow-lg p-6 flex items-start space-x-4"
                    >
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{review.user}</h3>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <form onSubmit={handleSubmitReview} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Rating
                    </label>
                    <StarRating
                      rating={newReview.rating}
                      setRating={(rating) => setNewReview((prev) => ({ ...prev, rating }))}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Share your thoughts on your vintage purchase..."
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                  >
                    Submit Review
                  </motion.button>
                </form>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Report Seller Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-semibold mb-4">Report Seller</h2>
            <form onSubmit={handleReportSeller}>
              <div className="mb-4">
                <label
                  htmlFor="reportReason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Report
                </label>
                <select
                  id="reportReason"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Counterfeit items</option>
                  <option>Misleading description</option>
                  <option>Poor communication</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reportDetails"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Details
                </label>
                <textarea
                  id="reportDetails"
                  rows={4}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide more information about your report..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
