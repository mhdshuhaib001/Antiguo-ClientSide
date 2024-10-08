export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface User {
  isActive?: string ;
  userData: any;
  _id: string;
  name: string;
  email: string;
  status:string
  role:"user"|"seller"
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
  message:string;
  userData: any;
  _id: string;
  user: any;
  accessToken?: string|undefined;
  password: string;
  email: string;
}

export interface ErrorType{
  data:{
    status:string,
    messsage:string
  }
}