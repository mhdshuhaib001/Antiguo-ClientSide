import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getAdminToken } from '../../utils/getHelper';

interface AuthRouteProps {
  element: React.ComponentType;
}

const AdminRoutProtector: React.FC<AuthRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = getToken();
  const adminToken = getAdminToken();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin');
    }
  }, [token, adminToken, navigate]);

  return <Component />;
};

export default AdminRoutProtector;
