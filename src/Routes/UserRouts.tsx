// src/routes/UserRoute.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from '../pages/userPages/Registration';
import Home from '../pages/userPages/LandingPage';
import Profile from '../pages/userPages/Profile';
import Seller from '../pages/seller/SellerDashBord';
import ProductListingForm from '../pages/seller/ProductManagment';
import UserProtectedRoute from './ProtectRout/UserVerifyRoute';
import AuthRoute from './ProtectRout/AuthRoute';
import ForgetPasswordPage from '../pages/userPages/PasswordForgetPage';
import EmailSendPage from '../pages/userPages/EmailSendPage';

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<AuthRoute element={Registration} />} />
      <Route path="/" element={<Home />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/forget-password-request" element={<EmailSendPage />} />

      <Route path="/profile" element={<UserProtectedRoute element={Profile} />}>
        <Route path="seller" element={<UserProtectedRoute element={Seller} />}>
          <Route
            path="product-management"
            element={<UserProtectedRoute element={ProductListingForm} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoute;
