export interface AdminLoginRequest {
    email: string;    // Admin's email
    password: string; // Admin's password
}
export interface AdminLoginResponse {
    status: number; // HTTP status code
    message: string; // Response message (e.g., "Login successful", "Invalid credentials")
    adminToken: string; // JWT token or similar for authentication
    // userData?: string; // Admin data if login is successful
}

// interface Admin {
//     _id: string;
//     email: string;
//     name: string;
//     role: 'admin'; // Role should be 'admin' for admin users
//     // Add other relevant admin fields here
// }
