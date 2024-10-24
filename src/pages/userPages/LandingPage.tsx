import React, { useState } from 'react';
import Header from '../../components/User/Header';
import HeroSection from '../../components/User/HeroSection';
import CategorySection from '../../components/User/Category';
import HotDeal from '../../components/User/HotDeal';
import FeaturedHighlights from '../../components/User/FeaturedHighlights';
import Footer from '../../components/User/Footer';
import { useFetchAllProductsQuery } from '../../services/apis/sellerApi';
import { FormDataType } from '../../interface/sellerTypes/sellerApiTypes';
import ProductSlider from '../../components/User/ActiveSlider';
import ChatBot from '../../components/commen/ChatBot';
import ChatButton from '../../components/commen/Buttons/ChatBotButton';

const LandingPage: React.FC = () => {
  const { data } = useFetchAllProductsQuery();
  const products: FormDataType[] = data?.products || [];
  const [isChatOpen, setChatOpen] = useState(false);

  const handleOpenChat = () => {
    console.log('Opening chat...'); 
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfaee]">
      <Header />
      <main className="flex-grow">
        <HeroSection />

        <div className="container mx-auto px-4 space-y-12 py-12">
          {/* Auction Items in a Slider */}
          <ProductSlider products={products} />
          <ChatButton
            onClick={handleOpenChat} 
            position={{ bottom: '20px', right: '20px' }}
          />
          {isChatOpen && (
            <div className="fixed bottom-20 right-20 z-50">
            <ChatBot onClose={handleCloseChat} /> 

            </div>
          )}
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
