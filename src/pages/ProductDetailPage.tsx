import React, { useEffect, useState } from 'react';
import Header from '../components/User/Header';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/apis/productApi';

type ProductImage = {
  src: string;
  alt: string;
};

type Product = {
  id: string;
  itemTitle: string;
  reservePrice: number;
  auctionEndDateTime: string;
  description: string;
  images?: string[];
  auctionFormat: string;
};

export default function ProductPage() {
  const [mainImage, setMainImage] = useState<ProductImage | null>(null);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [productData, setProductData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error: apiError, isLoading: apiLoading } = useGetProductByIdQuery(id);

  useEffect(() => {
    if (data) {
      setProductData(data.productData);
      setIsLoading(false);
      setError(null);
    } else if (apiError) {
      setIsLoading(false);
      setError('Error fetching product data. Please try again.');
    }
  }, [data, apiError]);

  useEffect(() => {
    if (productData && productData.auctionFormat !== 'buy-it-now') {
      const auctionEndDate = new Date(productData.auctionEndDateTime || Date.now());
      setTimeLeft(auctionEndDate.getTime() - Date.now());

      const intervalId = setInterval(() => {
        setTimeLeft(auctionEndDate.getTime() - Date.now());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [productData]);

  useEffect(() => {
    if (productData?.images?.length) {
      setMainImage({ src: productData.images[0], alt: 'Main product image' });
    }
  }, [productData]);

  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const handleBuyNow = (): void => {
    navigate(`/checkout/${id}`);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 bg-backgroundColor">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {mainImage && (
              <div className="relative " style={{height:'500px'}}>
                <img
                  src={mainImage.src}
                  alt={mainImage.alt}
                  className="rounded-lg object-cover  h-full transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            )}

            <div className="grid grid-cols-5 gap-2">
              {productData?.images?.length ? (
                productData.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setMainImage({ src: image, alt: `Thumbnail ${index + 1}` })}
                    className="relative overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </button>
                ))
              ) : (
                <div>No images available</div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{productData?.itemTitle || 'Product Title'}</h1>
            <div className="flex items-center space-x-2 bg-[#eae09e] p-2 rounded">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Seller avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold">Seller Name</span>
              <span className="text-gray-500">5.3K Items sold</span>
              <button className="text-blue-600 hover:underline">Contact</button>
            </div>
            <div className="text-3xl font-bold">
              ${productData?.reservePrice.toFixed(2) || 'Price'}
            </div>
            {productData?.auctionFormat !== 'buy-it-now' && (
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-lg font-semibold mb-2">
                Ending On:{' '}
                {productData?.auctionEndDateTime
                  ? new Date(productData.auctionEndDateTime).toLocaleString()
                  : 'N/A'}
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{daysLeft}</div>
                  <div className="text-sm text-gray-500">Days</div>
                </div>
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{hoursLeft}</div>
                  <div className="text-sm text-gray-500">Hours</div>
                </div>
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{minutesLeft}</div>
                  <div className="text-sm text-gray-500">Minutes</div>
                </div>  
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{secondsLeft}</div>
                  <div className="text-sm text-gray-500">Seconds</div>
                </div>
              </div>
            </div>
            )}
            <div className="space-y-2">
              {productData?.auctionFormat === 'buy-it-now' ? (
                <button onClick={handleBuyNow} className="w-full bg-[#975f26] text-white py-2 rounded-lg hover:bg-[#d4a575] transition duration-300">
                  Buy It Now
                </button>
              ) : (
                <button className="w-full bg-[#975f26] text-white py-2 rounded-lg hover:bg-[#d4a575] transition duration-300">
                  Enter To Auction
                </button>
              )}
            
            </div>
            <div className="flex justify-between items-center border-t border-b py-2">
              <span>Guaranteed Safe Checkout</span>
              <div className="flex space-x-2">
                <img src="/placeholder.svg?height=30&width=50" alt="Visa" width={50} height={30} />
                <img
                  src="/placeholder.svg?height=30&width=50"
                  alt="Mastercard"
                  width={50}
                  height={30}
                />
                <img
                  src="/placeholder.svg?height=30&width=50"
                  alt="PayPal"
                  width={50}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8">
          <div className="border-b">
            <nav className="flex space-x-8">
              {['Description', 'Additional Information', 'Reviews (15)'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                  className={`py-4 border-b-2 font-medium ${
                    activeTab === tab.toLowerCase().split(' ')[0]
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-gray-600">
                  {productData?.description || 'No description available.'}
                </p>
              </div>
            )}
            {activeTab === 'additional' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                <p className="text-gray-600">Additional product details would go here.</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <p className="text-gray-600">User reviews would be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
