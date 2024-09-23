import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/commen/Loader'; 
import { Toaster } from 'react-hot-toast';

const UserRoute = lazy(() => import('./Routes/UserRouts'));
const AdminRoute = lazy(() => import('./Routes/AdminRouts'));
import ProtectedRoute from './Routes/ProtectRout/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/*" element={<ProtectedRoute><UserRoute /></ProtectedRoute>} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default App;
