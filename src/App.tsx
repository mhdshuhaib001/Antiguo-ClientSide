import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/commen/Loader';
import { Toaster } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const UserRoutes = lazy(() => import('./Routes/UserRouts'));
const AdminRoutes = lazy(() => import('./Routes/AdminRouts'));
import ProtectedRoute from './Routes/ProtectRout/ProtectedRoute';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App: React.FC = () => {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/*" element={<ProtectedRoute><UserRoutes /></ProtectedRoute>} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </Suspense>
      </Elements>
      <Toaster />
    </Router>
  );
};

export default App;
