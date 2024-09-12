// src/routes/ProtectRout/UserVerifyRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/getHelper';

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const UserProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    console.log('Token check during route protection:', token);
    if (!token) {
      navigate('/signup');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Component />;
};

export default UserProtectedRoute;
