import { Seller } from "../sellerTypes/sellerApiTypes";

export interface Product {
  sellerData:Seller;
    productData: any;
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
    auctionStartDateTime?: Date; 
    auctionEndDateTime?: Date;  
  }
  
  