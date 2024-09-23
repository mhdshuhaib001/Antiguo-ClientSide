import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRoute from './Routes/UserRouts';
import AdminRoute from './Routes/AdminRouts';
import ProtectedRoute from './Routes/ProtectRout/ProtectedRoute';

import { Toaster } from 'react-hot-toast';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*"  element={<ProtectedRoute><UserRoute /></ProtectedRoute>} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
