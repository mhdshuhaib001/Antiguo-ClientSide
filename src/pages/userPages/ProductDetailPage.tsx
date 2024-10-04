import React, { useState } from 'react';
import Header from '../../components/User/Header';

type ProductImage = {
  src: string;
  alt: string;
};

type RelatedProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
};

const productImages: ProductImage[] = [
  { src: '/placeholder.svg?height=400&width=400', alt: 'Main product image' },
  { src: '/placeholder.svg?height=100&width=100', alt: 'Thumbnail 1' },
  { src: '/placeholder.svg?height=100&width=100', alt: 'Thumbnail 2' },
  { src: '/placeholder.svg?height=100&width=100', alt: 'Thumbnail 3' },
  { src: '/placeholder.svg?height=100&width=100', alt: 'Thumbnail 4' },
];

const relatedProducts: RelatedProduct[] = [
  { id: '1', name: '19th century clocks antique porcelain vase', image: '/placeholder.svg?height=200&width=200', price: 4648, daysLeft: 76, hoursLeft: 7, minutesLeft: 30, secondsLeft: 44 },
  { id: '2', name: 'Art deco art bronze sculpture antique gilt', image: '/placeholder.svg?height=200&width=200', price: 8974, daysLeft: 76, hoursLeft: 7, minutesLeft: 30, secondsLeft: 44 },
  { id: '3', name: 'Neo-classical marble busting rustic farmhouse', image: '/placeholder.svg?height=200&width=200', price: 5237, daysLeft: 76, hoursLeft: 7, minutesLeft: 30, secondsLeft: 44 },
  { id: '4', name: 'Zenith auto elevating driving your experience', image: '/placeholder.svg?height=200&width=200', price: 2898, daysLeft: 76, hoursLeft: 7, minutesLeft: 30, secondsLeft: 44 },
];

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [activeTab, setActiveTab] = useState('description');

  return (
   <> <Header/>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1">
            <img src={mainImage.src} alt={mainImage.alt} className="rounded-lg" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {productImages.map((image, index) => (
              <button key={index} onClick={() => setMainImage(image)} className="aspect-w-1 aspect-h-1">
                <img src={image.src} alt={image.alt} className="rounded-lg" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Brass Sextant Compass w Wooden Box Vintage Solid</h1>
          <div className="flex items-center space-x-2 bg-[#eae09e]">
            <img src="/placeholder.svg?height=40&width=40" alt="Seller avatar" width={40} height={40} className="rounded-full" />
            <span className="font-semibold">IMAXPRICES</span>
            <span className="text-gray-500">5.3K Items sold</span>
            <button className="text-blue-600 hover:underline">Contact</button>
          </div>
          <div className="text-3xl font-bold">$2,898</div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-lg font-semibold mb-2">Ending On: August 23, 2024 11:42 am</div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2 rounded">
                <div className="text-2xl font-bold">00</div>
                <div className="text-sm text-gray-500">Days</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-2xl font-bold">07</div>
                <div className="text-sm text-gray-500">Hours</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-2xl font-bold">30</div>
                <div className="text-sm text-gray-500">Minutes</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-2xl font-bold">44</div>
                <div className="text-sm text-gray-500">Seconds</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full bg-[#975f26] text-white py-2 rounded-lg hover:bg-[#d4a575] transition duration-300">Enter To Auction</button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Add To Cart</button>
          </div>
          <div className="flex justify-between items-center border-t border-b py-2">
            <span>Guaranteed Safe Checkout</span>
            <div className="flex space-x-2">
              <img src="/placeholder.svg?height=30&width=50" alt="Visa" width={50} height={30} />
              <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" width={50} height={30} />
              <img src="/placeholder.svg?height=30&width=50" alt="PayPal" width={50} height={30} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="watchlist" className="rounded text-blue-600" />
            <label htmlFor="watchlist">Add to watchlist</label>
          </div>
        </div>
      </div>
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
              <h2 className="text-2xl font-bold mb-4">They're kinda our Best thing!</h2>
              <p className="text-gray-600">
                Immerse yourself in the golden era of music with this stunning 1950s Vintage Record Player. A genuine artifact from the mid-20th century, this
                record player is more than just a piece of audio equipment—it's a captivating relic of a bygone era that brings the charm and elegance of vintage
                design into your home.
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
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              <p className="text-gray-600">Product reviews would be displayed here.</p>
            </div>
          )}
        </div>
      </div>
      {/* <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Auction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="p-4 bg-[#eae09e]">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price}</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Bid Now</button>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {product.daysLeft}d {product.hoursLeft}h {product.minutesLeft}m {product.secondsLeft}s
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
    </>
  );
}
