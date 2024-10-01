export interface AdminLoginRequest {
  email: string;
  password: string;
}
export interface AdminLoginResponse {
  status: number;
  message: string;
  adminToken: string;
}

// interface Admin {
//     _id: string;
//     email: string;
//     name: string;
//     role: 'admin'; // Role should be 'admin' for admin users
//     // Add other relevant admin fields here
// }

// adminApiTypes.ts

export interface Category {
  icon: string | undefined;
  image: string | undefined;
  id: string; 
  name: string;
  imageUrl: string; 
  iconUrl: string; 
}

export interface AddCategoryRequest {
  name: string;
  image: File; 
  icon: File; 
}

export interface FetchCategoriesResponse {
  success: boolean;
  categories: Category[];
}