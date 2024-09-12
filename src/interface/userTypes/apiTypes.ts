export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface User {
  userData: any;
  _id: string;
  name: string;
  email: string;
  // password: string
}

// export interface User {
//     _id: string;
//     name: string;
//     email: string;
//   }

export interface AuthRequest {
  name?: string;
  email: string;
  password: string;
  otp?: string;
}

export interface AuthResponse {
  userData: any;
  _id: string;
  user: any;
  accessToken?: string;
  password: string;
  email: string;
  token: string;
}
