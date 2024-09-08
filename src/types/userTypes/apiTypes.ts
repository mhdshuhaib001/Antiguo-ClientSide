export interface Post{
    id: number
    title: string
    content: string;
}

export interface User{
    userData: any;
    id: string,
    name: string
    email: string
    // password: string
}

export interface AuthRequest{
    name? : string
    email: string
    password: string
    otp? : string
}

export interface AuthResponse {
    accessToken?: string;
    password: string;
    email: string;
    token: string;  
    user: User;
  } 