// src/routes/ProtectRout/AuthRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/getHelper';
interface AuthRouteProps {
  element: React.ComponentType;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element: Component }) => {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    console.log('Token check for authentication route:', token);
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return <Component />;
};

export default AuthRoute;
