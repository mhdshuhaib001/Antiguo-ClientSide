export interface AdminLoginRequest {
  email: string;
  password: string;
}
export interface AdminLoginResponse {
  status: number;
  message: string;
  adminToken: string;
}

export interface Category {
  _id: string;
  id: string; 
  name: string; 
  imageUrl: string;
  iconUrl: string; 
}

export interface UploadCategory {
  name: string;
  image:string | File | null; 
  icon: string | File | null; 
}

export interface FetchCategoriesResponse {
  success: boolean;
  categories: Category[];
  totalPages:number
}

export interface AddCategoryRequest {
  name: string;
  image: File; 
  icon: File; 
}

