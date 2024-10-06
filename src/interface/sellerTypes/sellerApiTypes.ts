
export interface SellerCreationRequest {
  userId?: string;
  companyName?: string;
  contactInfo?: string;
  about?: string;
  image?:string
}

export interface SellerResponse {
  sellerId: string;
  sellerToken: string;
  id: string;
  UserId?: string;
  companyName: string;
  email?: string; 
  phone?: string; 
  address?: string; 
  about?: string; 
  image?: string; 
  createdAt: string;
  updatedAt?: string;
}

export interface FormDataType {
  _id?: string;
  itemTitle: string;
  category: string;
  description: string;
  condition: string;
  images: string[]; 
  auctionFormat: string;
  auctionDuration: string;
  reservePrice: string;
  shippingType: string;
  shippingCost: string;
  handlingTime: string;
  returnPolicy: string;
  auction_start_time?: Date; 
  auctionEndDateTime?: string;  
}



export interface AddProductResponse {
  success: boolean;
  message: string;
}

export interface ProductsResponse {
  products: FormDataType[];
}
export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  currentBid: number;
}

export interface SellerInfo {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  image: string;
}