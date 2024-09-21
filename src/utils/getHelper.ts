export const getToken = (): string | null => {
  const token = localStorage.getItem('accessToken');
  console.log('Token in getToken:', token);
  return token;
};

export const getSellerToken = (): string | null => {
  const sellerToken = localStorage.getItem('sellerToken');
  console.log('Token in getToken:', sellerToken);
  return sellerToken;
};

export const getAdminToken = (): string | null => {
  const adminToken = localStorage.getItem('adminToken');
  console.log('Admin Token in getToken:', adminToken);
  return adminToken;
};
