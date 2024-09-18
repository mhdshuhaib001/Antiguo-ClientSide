import React from 'react';
import Header from '../../components/User/Header';
import HeroSection from '../../components/User/HeroSection';
import ProductCard from '../../components/User/ProductCard';
import Footer from '../../components/User/Footer';

const LandingPage: React.FC<{}> = () => {
  return (
    <>
    <Header />
        <HeroSection />
      <div className="mx-3 mt-4 min-h-screen">
        
        <ProductCard />

      </div>
      <Footer/>
    </>
  );
};

export default LandingPage;
