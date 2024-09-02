export interface Post{
    id: number
    title: string
    content: string;
}

// respose for the user-related oprations

export interface User{
    id: number
    username: string
    email: string
}

export interface AuthRequest{
    name? : string
    email: string
    password: string
    otp? : string
}

export interface AuthResponse {
    token: string;
    user: User;
  }