import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserRoute from './Routes/UserRouts';
import AdminRoute from './Routes/AdminRouts'
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/user/*" element={<UserRoute  />} />
      <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
