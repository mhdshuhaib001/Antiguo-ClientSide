import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserRoute from './Routes/UserRouts';
import AdminRoute from './Routes/AdminRouts'
import { ToastContainer } from 'react-toastify';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/*" element={<UserRoute  />} />
      <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
