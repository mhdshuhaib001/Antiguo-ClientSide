// src/routes/UserRoute.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from '../pages/userPages/Registration';
import Home from '../pages/userPages/LandingPage';
import Profile from '../pages/userPages/Profile';
import Seller from '../pages/seller/SellerDashBord';
import ProductListingForm from '../containers/sellerFeturs/ProductListingForm';
import EditProductForm from '../containers/sellerFeturs/EditProductForm';

import UserProtectedRoute from './ProtectRout/UserVerifyRoute';
import AuthRoute from './ProtectRout/AuthRoute';
import ForgetPasswordPage from '../pages/userPages/PasswordForgetPage';
import EmailSendPage from '../pages/userPages/EmailSendPage';
import ProductManagment from '../pages/seller/ProductManagment';
import AuctionItemForm from '../components/Seller/auction-item-form';
import UserDashBoard from '../components/User/UserDshboard';
import SellerAboutPage from '../components/Seller/SellerAbout'

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<AuthRoute element={Registration} />} />
      <Route path="/" element={<Home />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/forget-password-request" element={<EmailSendPage />} />
      <Route path="/profile" element={<UserProtectedRoute element={Profile} />}>
        <Route path="dashboard" element={<UserDashBoard />} />
        <Route path="password" element={<AuctionItemForm />} />
        <Route path="seller" element={<UserProtectedRoute element={Seller} />}>
          <Route path="product-management" element={<UserProtectedRoute element={ProductManagment} />} />
          <Route path="addproduct" element={<UserProtectedRoute element={ProductListingForm} />} />
          <Route path="editproduct/:productId" element={<UserProtectedRoute element={EditProductForm} />} />
          <Route path="about" element={<SellerAboutPage/>} />

        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoute;
