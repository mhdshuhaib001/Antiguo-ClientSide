import { AuthRequest } from "../userTypes/apiTypes";

export interface SellerCreationRequest {
    userId?: string;
    CompanyName: string;
    contactInfo?: string;
    about?: string;
}



export interface SellerResponse {
    id: string;
    userId?: string;
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
    images: File[]; 
    auctionFormat: string;
    auctionDuration: string;
    reservePrice: string;
    shippingType: string;
    shippingCost: string;
    handlingTime: string;
    returnPolicy: string;
  }
  