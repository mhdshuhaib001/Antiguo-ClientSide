export interface AdminLoginRequest {
  email: string;
  password: string;
}
export interface AdminLoginResponse {
  status: number;
  message: string;
  adminToken: string;
  // userData?: string; // Admin data if login is successful
}

// interface Admin {
//     _id: string;
//     email: string;
//     name: string;
//     role: 'admin'; // Role should be 'admin' for admin users
//     // Add other relevant admin fields here
// }
