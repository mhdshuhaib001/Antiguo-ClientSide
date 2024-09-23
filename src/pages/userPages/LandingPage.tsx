import React from 'react';
import Header from '../../components/User/Header';
import HeroSection from '../../components/User/HeroSection';
import CategorySection from '../../components/User/Category';
import AuctionItem from '../../components/User/ProductCard';
import HotDeal from '../../components/User/HotDeal';
import FeaturedHighlights from '../../components/User/FeaturedHighlights';
import Footer from '../../components/User/Footer';
import { useFetchAllProductsQuery } from '../../services/apis/sellerApi';
import { FormDataType } from '../../interface/sellerTypes/sellerApiTypes';

const LandingPage: React.FC = () => {
  const { data, error, isLoading } = useFetchAllProductsQuery();
  const products: FormDataType[] = data?.products || [];

  // Limit to 5 products
  const limitedProducts = products.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 space-y-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {limitedProducts.length > 0 ? (
              limitedProducts.map((product) => (
                <AuctionItem
                  key={product._id ?? `product-${product.itemTitle}`}
                  product={{
                    id: product._id ?? '',
                    imageUrl: product.images?.[0] ?? '/placeholder-image.jpg',
                    name: product.itemTitle ?? 'Unnamed Product',
                    currentBid: Number(product.reservePrice) || 0,
                  }}
                  auctionEndTime={product.auctionEndDateTime}
                />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
          <CategorySection />
          <HotDeal />
          <FeaturedHighlights />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
