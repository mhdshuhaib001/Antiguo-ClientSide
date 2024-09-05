import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from '../pages/userPages/Registration';
import Home from "../pages/userPages/LandingPage"
import Profile from "../pages/userPages/Profile"
const UserRoute: React.FC = () => {
  return (
      <Routes>
        <Route path="/signup" element={< Registration/>} />
        <Route path="/home" element={<Home />} />
        <Route path='/profile' element={<Profile/>} />
        </Routes>
  );
};

export default UserRoute;



