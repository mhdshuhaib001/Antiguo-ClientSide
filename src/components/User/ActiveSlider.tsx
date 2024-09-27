import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module
import AuctionItem from './ProductCard'; 
import { FormDataType } from '../../interface/sellerTypes/sellerApiTypes';

interface ProductSliderProps {
  products: FormDataType[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const limitedProducts = products.slice(0, 9);

  return (
    <div className="relative">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        // freeMode={true}
        // autoplay={{ delay: 2000 }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
        }}
        modules={[FreeMode, Pagination, Autoplay]} 
        className="max-w-[90%] lg:max-w-[80%] mx-auto"
      >
        {limitedProducts.length > 0 ? (
          limitedProducts.map((product) => (
            <SwiperSlide key={product._id ?? `product-${product.itemTitle}`}>
              <AuctionItem
                key={product._id ?? `product-${product.itemTitle}`}
                product={{
                  id: product._id ?? '',
                  imageUrl: product.images?.[0] ?? '/placeholder-image.jpg',
                  name: product.itemTitle ?? 'No Name',
                  currentBid: Number(product.reservePrice) || 0,
                }}
                auctionEndTime={product.auctionEndDateTime}
              />
            </SwiperSlide>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="swiper-pagination-custom flex justify-center space-x-2 mt-4">
        <span className="swiper-pagination-bullet w-3 h-3 bg-orange-500 rounded-full"></span>
        <span className="swiper-pagination-bullet w-3 h-3 bg-orange-500 rounded-full"></span>
        <span className="swiper-pagination-bullet w-3 h-3 bg-orange-500 rounded-full"></span>
        {/* Add more bullets as needed */}
      </div>
    </div>
  );
};

export default ProductSlider;
