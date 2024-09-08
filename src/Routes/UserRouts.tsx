import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from '../pages/userPages/Registration';
import Home from "../pages/userPages/LandingPage";
import Profile from "../pages/userPages/Profile";
import Seller from '../pages/seller/SellerDashBord';
import ProductListingForm from '../pages/seller/Profile';
import Password  from '../pages/userPages/Password'

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Registration />} />
      <Route path="/home" element={<Home />} />
      
      {/* Profile Route with Nested Routes */}
      <Route path='/profile' element={<Profile />}>
        <Route path='seller' element={<Seller />} />
        <Route path='dashboard' element={<ProductListingForm />} />
        <Route path='password' element={<Password />} />

      </Route>
    </Routes>
  );
};

export default UserRoute;
