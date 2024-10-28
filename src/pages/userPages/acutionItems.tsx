import React, { useState, useEffect } from 'react';
import AuctionItemGrid from '../../components/commen/AuctionGrid';
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';
const AuctionItems: React.FC = () => {
  return (
    <>
    <Header/>
    <div className="h-full">
      <AuctionItemGrid />
    </div>
    <Footer/>
    </>
  );
};

export default AuctionItems;
