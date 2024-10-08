// pages/User/LandingPage.tsx

import React from 'react';
import Header from '../../components/User/Header';
import HeroSection from '../../components/User/HeroSection';
import CategorySection from '../../components/User/Category';
import HotDeal from '../../components/User/HotDeal';
import FeaturedHighlights from '../../components/User/FeaturedHighlights';
import Footer from '../../components/User/Footer';
import { useFetchAllProductsQuery } from '../../services/apis/sellerApi';
import { FormDataType } from '../../interface/sellerTypes/sellerApiTypes';
import ProductSlider from '../../components/User/ActiveSlider';

const LandingPage: React.FC = () => {
  const { data } = useFetchAllProductsQuery();
  console.log(data,'data  ')
  const products: FormDataType[] = data?.products || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfaee]">
      <Header />
      <main className="flex-grow">
        <HeroSection />

        <div className="container mx-auto px-4 space-y-12 py-12">
          {/* Auction Items in a Slider */}
          <ProductSlider products={products} />

          {/* Rest of the sections */}
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
