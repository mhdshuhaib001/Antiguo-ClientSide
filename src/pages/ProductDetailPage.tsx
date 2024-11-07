import React, { useEffect, useState } from 'react';
import Header from '../components/User/Header';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/apis/productApi';
import { useSubscribeNotificationMutation } from '../services/apis/adminApi';
import { generateToken } from '../services/notifications/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import NotificationMethodSelector from '../components/User/NotificationMethodComponent';
import { Seller } from '../interface/sellerTypes/sellerApiTypes';
import { ProductType } from '../interface/productTypes/productType';
import toast from 'react-hot-toast';
import { useAuctionTimer } from '../utils/hooks/useAuctionTimer';
import Footer from '../components/User/Footer';
import SellerProfileCard from '../components/Seller/SellerProfileCard';
type ProductImage = {
  src: string;
  alt: string;
};

export default function ProductPage() {
  const userId = useSelector((state: RootState) => state.User._id);

  const [mainImage, setMainImage] = useState<ProductImage | null>(null);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [sellerData, setSellerData] = useState<Seller | null>(null);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribeNotification] = useSubscribeNotificationMutation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error: apiError, isLoading: apiLoading } = useGetProductByIdQuery(id);

  useEffect(() => {
    if (data) {
      setProductData(data.productData);
      setSellerData(data.sellerData);
      setIsLoading(false);
      setError(null);
    } else if (apiError) {
      setIsLoading(false);
      setError('Error fetching product data. Please try again.');
    }
  }, [data, apiError]);
  useEffect(() => {
    if (productData) {
      const auctionStartDate = new Date(productData.auctionStartDateTime || Date.now());
      const auctionEndDate = new Date(productData.auctionEndDateTime || Date.now());

      const updateTimeLeft = () => {
        const currentTime = Date.now();

        if (currentTime < auctionStartDate.getTime()) {
          setTimeLeft(auctionStartDate.getTime() - currentTime);
        } else if (currentTime < auctionEndDate.getTime()) {
          setTimeLeft(auctionEndDate.getTime() - currentTime);
        } else {
          setTimeLeft(0);
        }
      };

      updateTimeLeft();
      let intervalId: NodeJS.Timeout | undefined;
      if (Date.now() >= auctionStartDate.getTime()) {
        intervalId = setInterval(updateTimeLeft, 1000);
      }

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [productData]);

  useEffect(() => {
    if (productData?.images?.length) {
      setMainImage({ src: productData.images[0], alt: 'Main product image' });
    }
  }, [productData]);

  // Calculate the time left
  const auctionStartDate = new Date(productData?.auctionStartDateTime || Date.now());
  const auctionEndDate = new Date(productData?.auctionEndDateTime || Date.now());
  const isAuctionStarted = Date.now() >= auctionStartDate.getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);


  const isAuctionEnded = Date.now() > auctionEndDate.getTime();

  const handleSelectMethod = (method: string, notificationData: any) => {
    setSelectedMethod(method);
    setShowNotificationModal(false);
    handleNotifyMe(productData?._id || '', userId, method, notificationData);
  };

  const handleNotifyMe = async (
    auctionId: string,
    userId: string,
    method: string,
    notificationData: any,
  ) => {
    try {
      const { countryCode, phoneNumber, email } = notificationData;
      let fcmToken = null;
      if (method === 'Notification') {
        fcmToken = await generateToken();
        console.log(method, fcmToken);

        await subscribeNotification({ auctionId, userId, fcmToken });
        setShowNotificationModal(false);
      } else if (method === 'WhatsApp' && phoneNumber) {
        await subscribeNotification({ auctionId, userId, countryCode, phoneNumber });
      } else if (method === 'Email' && email) {
        await subscribeNotification({ auctionId, userId, email });
      }
      toast.success('auction Notification Send');
    } catch (error) {
      console.error('Error subscribing to notification:', error);
    }
  };

  function handleBuyNow(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 bg-main-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex space-x-4">
            {/* Left side with preview images */}
            <div className="flex flex-col space-y-2 ">
              {productData?.images?.length ? (
                productData.images.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setMainImage({ src: image, alt: `Thumbnail ${index + 1}` })}
                    className={`relative overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105 ${
                      mainImage?.src === image ? 'border-2 border-amber-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded-lg object-cover w-full h-24"
                    />
                  </button>
                ))
              ) : (
                <div>No images available</div>
              )}
            </div>

            {mainImage && (
              <div
                className="relative flex-1 flex justify-center items-center"
                style={{ height: '500px' }}
              >
                <img
                  src={mainImage.src}
                  alt={mainImage.alt}
                  className="rounded-lg max-h-full max-w-full transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{productData?.itemTitle || 'Product Title'}</h1>

            <SellerProfileCard
              id={sellerData?.sellerId}
              sellerName={sellerData?.companyName}
              profileImage={sellerData?.profile}
            />
            <div className="text-3xl font-bold">${productData?.reservePrice || 'Price'}</div>
            {productData?.auctionFormat !== 'buy-it-now' && (
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-lg font-semibold mb-2">
                  Ending On:{' '}
                  {productData?.auctionEndDateTime
                    ? new Date(productData.auctionEndDateTime).toLocaleString()
                    : 'N/A'}
                </div>
                {!isAuctionEnded &&isAuctionStarted ? (
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
                ) : (
                  <div className="text-lg font-semibold">
                    Auction starts on: {auctionStartDate.toLocaleString()}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              {productData?.auctionFormat === 'buy-it-now' ? (
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
                >
                  Buy Now
                </button>
              ) : !isAuctionStarted ? (
                <button
                  // onClick={() => navigate(`/auction-page/${productData?._id}`)}

                  onClick={() => setShowNotificationModal(true)}
                  className="w-full bg-amber-600 border-amber-300 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
                >
                  Notify Me When Auction Starts
                </button>
              ) : (
                // <button
                //   onClick={() => setShowNotificationModal(true)}
                //   className="w-full bg-amber-500 border-amber-300 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
                // >
                //   Enter Bid{' '}
                // </button>
                <button
                  onClick={() => navigate(`/auction-page/${productData?._id}`)}
                  // onClick={() => setShowNotificationModal(true)}

                  className="w-full bg-amber-500 border-amber-300 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
                >
                  Enter Bid{' '}
                </button>
              )}
              {showNotificationModal && (
                <NotificationMethodSelector
                  isOpen={showNotificationModal}
                  onClose={() => setShowNotificationModal(false)}
                  onSelectMethod={handleSelectMethod}
                />
              )}
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Shipping:</h2>
              <p>{productData?.shippingType}</p>

              {/* <h2 className="text-lg font-semibold">Delivery:</h2> */}

              <h2 className="text-lg font-semibold">Returns:</h2>
              <p>{productData?.returnPolicy} days returns. Buyer pays for return shipping</p>
            </div>
            <div className="flex justify-between items-center border-t border-b py-2">
              <span className="font-semibold">Guaranteed Safe Checkout</span>
              <div className="flex space-x-2">
                <img src="/svg/icons/stripe.png" alt="Visa" width={50} height={30} />
                <img src="/svg/icons/mastercard.svg" alt="Mastercard" width={50} height={30} />
                <img src="/svg/icons/paypal.svg" alt="PayPal" width={50} height={30} />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8">
          <div className="border-b">
            <nav className="flex space-x-8 justify-center">
              {['Description', 'Condition'].map((tab) => (
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
            {activeTab === 'condition' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                <p className="text-gray-600">{productData?.condition}</p>
              </div>
            )}
            {/* {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <p className="text-gray-600">User reviews would be displayed here.</p>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// import React, { useEffect, useState } from 'react';
// import Header from '../components/User/Header';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useGetProductByIdQuery } from '../services/apis/productApi';
// import { useSubscribeNotificationMutation } from '../services/apis/adminApi';
// import { generateToken } from '../services/notifications/firebase';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/Store';
// import NotificationMethodSelector from '../components/User/NotificationMethodComponent';
// import { button } from '@nextui-org/react';
// import { Seller } from '../interface/sellerTypes/sellerApiTypes';
// import { ProductType } from '../interface/productTypes/productType';
// type ProductImage = {
//   src: string;
//   alt: string;
// };

// export default function ProductPage() {
//   const userId = useSelector((state: RootState) => state.User._id);

//   const [mainImage, setMainImage] = useState<ProductImage | null>(null);
//   const [activeTab, setActiveTab] = useState<string>('description');
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
//   const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
//   const [sellerData, setSellerData] = useState<Seller | null>(null);
//   const [productData, setProductData] = useState<ProductType | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [subscribeNotification] = useSubscribeNotificationMutation();
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { data, error: apiError, isLoading: apiLoading } = useGetProductByIdQuery(id);

//   useEffect(() => {
//     if (data) {
//       setProductData(data.productData);
//       setSellerData(data.sellerData);
//       setIsLoading(false);
//       setError(null);
//     } else if (apiError) {
//       setIsLoading(false);
//       setError('Error fetching product data. Please try again.');
//     }
//   }, [data, apiError]);
//   console.log(data?.sellerData, 'sellerData============================================');
//   useEffect(() => {
//     if (productData) {
//       const auctionStartDate = new Date(productData.auctionStartDateTime || Date.now());
//       const auctionEndDate = new Date(productData.auctionEndDateTime || Date.now());

//       const updateTimeLeft = () => {
//         const currentTime = Date.now();

//         if (currentTime < auctionStartDate.getTime()) {
//           setTimeLeft(auctionStartDate.getTime() - currentTime);
//         } else if (currentTime < auctionEndDate.getTime()) {
//           setTimeLeft(auctionEndDate.getTime() - currentTime);
//         } else {
//           setTimeLeft(0);
//         }
//       };

//       updateTimeLeft();
//       let intervalId: NodeJS.Timeout | undefined;
//       if (Date.now() >= auctionStartDate.getTime()) {
//         intervalId = setInterval(updateTimeLeft, 1000);
//       }

//       return () => {
//         if (intervalId) clearInterval(intervalId);
//       };
//     }
//   }, [productData]);

//   useEffect(() => {
//     if (productData?.images?.length) {
//       setMainImage({ src: productData.images[0], alt: 'Main product image' });
//     }
//   }, [productData]);

//   // Calculate the time left
//   const auctionStartDate = new Date(productData?.auctionStartDateTime || Date.now());
//   const auctionEndDate = new Date(productData?.auctionEndDateTime || Date.now());
//   const isAuctionStarted = Date.now() >= auctionStartDate.getTime();
//   const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//   const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//   const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

//   const handleSelectMethod = (method: string) => {
//     setSelectedMethod(method);
//     setShowNotificationModal(false);
//     handleNotifyMe(productData?._id || '', userId, method);
//   };
//   const handleNotifyMe = async (auctionId: string, userId: string, method: string) => {
//     try {
//       let fcmToken = null;
//       if (method === 'Notification') {
//         console.log('Notification');
//         fcmToken = await generateToken();
//         await subscribeNotification({
//           auctionId,
//           userId,
//           fcmToken,
//         });
//       }
//     } catch (error) {
//       console.error('Error subscribing to notification:', error);
//     }
//   };

//   function handleBuyNow(event: React.MouseEvent<HTMLButtonElement>): void {
//     throw new Error('Function not implemented.');
//   }

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto px-4 py-8 bg-backgroundColor">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Image Gallery */}
//           <div className="flex space-x-4">
//             {/* Left side with preview images */}
//             <div className="flex flex-col space-y-2 ">
//               {productData?.images?.length ? (
//                 productData.images.map((image: string, index: number) => (
//                   <button
//                     key={index}
//                     onClick={() => setMainImage({ src: image, alt: `Thumbnail ${index + 1}` })}
//                     className={`relative overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105 ${
//                       mainImage?.src === image ? 'border-2 border-blue-500' : ''
//                     }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`Thumbnail ${index + 1}`}
//                       className="rounded-lg object-cover w-full h-24"
//                     />
//                   </button>
//                 ))
//               ) : (
//                 <div>No images available</div>
//               )}
//             </div>

//             {mainImage && (
//               <div
//                 className="relative flex-1 flex justify-center items-center"
//                 style={{ height: '500px' }}
//               >
//                 <img
//                   src={mainImage.src}
//                   alt={mainImage.alt}
//                   className="rounded-lg max-h-full max-w-full transition-transform duration-300 transform hover:scale-105"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Product Details */}
//           <div className="space-y-4">
//             <h1 className="text-3xl font-bold">{productData?.itemTitle || 'Product Title'}</h1>
//             <div className="flex items-center  bg-[#eae09e] p-2 rounded">
//               <img
//                 src={sellerData?.profile}
//                 alt="Seller avatar"
//                 width={50}
//                 height={50}
//                 className="rounded-full"
//               />
//               <span className="font-semibold ml-3">{sellerData?.companyName}</span>
//               {/* <span className="text-gray-500">5.3K Items sold</span> */}
//               <div className="ml-auto flex items-center space-x-2">
//                 <button className="flex items-center text-blue-600 hover:underline">
//                   <svg
//                     fill="#000000"
//                     height="24px"
//                     width="24px"
//                     version="1.1"
//                     id="Capa_1"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 60 60"
//                     xmlSpace="preserve"
//                     className="h-5 w-5 mr-2"
//                   >
//                     <g>
//                       <path d="M55.232,43.104C58.354,38.746,60,33.705,60,28.5c0-14.888-13.458-27-30-27S0,13.612,0,28.5s13.458,27,30,27 c4.262,0,8.378-0.79,12.243-2.348c6.805,3.927,16.213,5.281,16.618,5.338c0.047,0.007,0.093,0.01,0.139,0.01 c0.375,0,0.725-0.211,0.895-0.554c0.192-0.385,0.116-0.85-0.188-1.153C57.407,54.493,55.823,49.641,55.232,43.104z M42.839,51.182 c-0.001,0-0.001,0-0.001,0c-2.11-1.303-4.466-2.814-5.014-3.249c-0.297-0.433-0.883-0.563-1.338-0.29 c-0.3,0.18-0.489,0.513-0.491,0.861c-0.003,0.589,0.006,0.77,4.081,3.316C36.865,52.931,33.487,53.5,30,53.5 c-15.439,0-28-11.215-28-25s12.561-25,28-25s28,11.215,28,25c0,4.897-1.591,9.644-4.601,13.725 c-0.144,0.195-0.212,0.436-0.191,0.677c0.35,4.175,1.239,9.491,3.44,13.161C53.316,55.385,47.31,53.882,42.839,51.182z"></path>
//                       <path d="M16,24.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S18.206,24.5,16,24.5z M16,30.5c-1.103,0-2-0.897-2-2s0.897-2,2-2 s2,0.897,2,2S17.103,30.5,16,30.5z"></path>
//                       <path d="M30,24.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S32.206,24.5,30,24.5z M30,30.5c-1.103,0-2-0.897-2-2s0.897-2,2-2 s2,0.897,2,2S31.103,30.5,30,30.5z"></path>
//                       <path d="M44,24.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S46.206,24.5,44,24.5z M44,30.5c-1.103,0-2-0.897-2-2s0.897-2,2-2 s2,0.897,2,2S45.103,30.5,44,30.5z"></path>
//                     </g>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div className="text-3xl font-bold">${productData?.reservePrice || 'Price'}</div>
//             {productData?.auctionFormat !== 'buy-it-now' && (
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <div className="text-lg font-semibold mb-2">
//                   Ending On:{' '}
//                   {productData?.auctionEndDateTime
//                     ? new Date(productData.auctionEndDateTime).toLocaleString()
//                     : 'N/A'}
//                 </div>
//                 {isAuctionStarted ? (
//                   <div className="grid grid-cols-4 gap-2 text-center">
//                     <div className="bg-white p-2 rounded shadow">
//                       <div className="text-2xl font-bold">{daysLeft}</div>
//                       <div className="text-sm text-gray-500">Days</div>
//                     </div>
//                     <div className="bg-white p-2 rounded shadow">
//                       <div className="text-2xl font-bold">{hoursLeft}</div>
//                       <div className="text-sm text-gray-500">Hours</div>
//                     </div>
//                     <div className="bg-white p-2 rounded shadow">
//                       <div className="text-2xl font-bold">{minutesLeft}</div>
//                       <div className="text-sm text-gray-500">Minutes</div>
//                     </div>
//                     <div className="bg-white p-2 rounded shadow">
//                       <div className="text-2xl font-bold">{secondsLeft}</div>
//                       <div className="text-sm text-gray-500">Seconds</div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-lg font-semibold">
//                     Auction starts on: {auctionStartDate.toLocaleString()}
//                   </div>
//                 )}
//               </div>
//             )}

//             <div className="space-y-2">
//               {productData?.auctionFormat === 'buy-it-now' ? (
//                 <button
//                   onClick={handleBuyNow}
//                   className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
//                 >
//                   Buy Now
//                 </button>
//               ) : !isAuctionStarted ? (
//                 <button
//                   onClick={() => setShowNotificationModal(true)}
//                   className="w-full bg-amber-600 border-amber-300 text-white py-2 rounded hover:bg-amber-700 transition duration-300"
//                 >
//                   Notify Me When Auction Starts
//                 </button>
//               ) : (
//                 <button onClick={()=>navigate('/auction-page')} className="w-full bg-amber-500 border-amber-300 text-white py-2 rounded hover:bg-amber-700 transition duration-300">
//                   Enter Bid{' '}
//                 </button>
//               )}
//               {showNotificationModal && (
//                 <NotificationMethodSelector
//                   isOpen={showNotificationModal}
//                   onClose={() => setShowNotificationModal(false)}
//                   onSelectMethod={handleSelectMethod}
//                 />
//               )}
//             </div>
//             <div className="space-y-4">
//               <h2 className="text-lg font-semibold">Shipping:</h2>
//               <p>US $29.94 eBay International Shipping. See details for shipping.</p>
//               <p>Located in: La Puente, CA, United States</p>
//               <p>Authorities may apply duties, fees, and taxes upon delivery.</p>

//               <h2 className="text-lg font-semibold">Delivery:</h2>
//               <p>Estimated between Wed, Nov 20 and Thu, Dec 5 to 676562.</p>
//               <p>Please note the delivery estimate is greater than 22 business days.</p>
//               <p>Seller ships within 1 day after receiving cleared payment.</p>

//               <h2 className="text-lg font-semibold">Returns:</h2>
//               <p>30 days returns. Buyer pays for return shipping. See details.</p>
//             </div>
//             <div className="flex justify-between items-center border-t border-b py-2">
//               <span className="font-semibold">Guaranteed Safe Checkout</span>
//               <div className="flex space-x-2">
//                 <img src="/svg/icons/stripe.png" alt="Visa" width={50} height={30} />
//                 <img src="/svg/icons/mastercard.svg" alt="Mastercard" width={50} height={30} />
//                 <img src="/svg/icons/paypal.svg" alt="PayPal" width={50} height={30} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="mt-8">
//           <div className="border-b">
//             <nav className="flex space-x-8">
//               {['Description', 'Additional Information', 'Reviews (15)'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
//                   className={`py-4 border-b-2 font-medium ${
//                     activeTab === tab.toLowerCase().split(' ')[0]
//                       ? 'border-blue-600 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </nav>
//           </div>
//           <div className="mt-8">
//             {activeTab === 'description' && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">Product Description</h2>
//                 <p className="text-gray-600">
//                   {productData?.description || 'No description available.'}
//                 </p>
//               </div>
//             )}
//             {activeTab === 'additional' && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
//                 <p className="text-gray-600">Additional product details would go here.</p>
//               </div>
//             )}
//             {activeTab === 'reviews' && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">Reviews</h2>
//                 <p className="text-gray-600">User reviews would be displayed here.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
