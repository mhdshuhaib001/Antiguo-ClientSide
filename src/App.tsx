import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/commen/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { generateToken, onMessageListener } from './services/notifications/firebase';
import NotificationToast from './components/commen/Notification/NotificationTost';

const UserRoutes = lazy(() => import('./Routes/UserRouts'));
const AdminRoutes = lazy(() => import('./Routes/AdminRouts'));
import ProtectedRoute from './Routes/ProtectRout/ProtectedRoute';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface FCMNotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    icon?: string;
  };
  data?: {
    [key: string]: string;
  };
}

const App: React.FC = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load state

  useEffect(() => {
    const fcmtoken = async () => {
      try {
        const token = await generateToken();
        setFcmToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    fcmtoken();

    // Set initialLoad to false once the app has loaded
    setInitialLoad(false);
  }, []);

  onMessageListener().then((payload) => {
    const notificationPayload = payload as FCMNotificationPayload;
    console.log('payload appp', notificationPayload);
    toast.custom((_t) => (
      <NotificationToast
        title={notificationPayload?.notification?.title || 'No Title'}
        body={notificationPayload?.notification?.body || 'No body'}
        imageUrl={notificationPayload?.data?.auctionImage || '/default-image.jpg'}
        auctionTitle={notificationPayload?.data?.auctionTitle || 'No Auction Title'}
      />
    ));
  }).catch((err) => {
    console.log(err);
  });
  
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Suspense fallback={initialLoad ? <Loader /> : null}>
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
