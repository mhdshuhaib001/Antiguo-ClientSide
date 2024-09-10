import { AuthRequest } from "../userTypes/apiTypes";

export interface SellerCreationRequest {
    UserID?: string;
    CompanyName: string;
    contactInfo?: string;
    about?: string;
}



export interface SellerResponse {
    sellerToken:string
    id: string;
    UserId?: string;
    CompanyName: string;
    contactInfo?: string;
    about?: string;
    createdAt: string;
    updatedAt?: string;
}



export interface FormDataType {
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
  }
  

  export interface AddProductResponse {
    success: boolean;
    message: string;
  } 
  
  