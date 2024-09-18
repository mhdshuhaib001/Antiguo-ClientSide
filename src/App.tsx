import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserRoute from './Routes/UserRouts';
import AdminRoute from './Routes/AdminRouts';
import { Toaster } from 'react-hot-toast';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
