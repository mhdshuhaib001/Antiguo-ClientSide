import { CalendarDateTime } from '@internationalized/date'; 
import { Seller } from '../sellerTypes/sellerApiTypes';

export type ProductImage = string | File;

export interface Product {
  categoryId: any;
  sellerData: Seller;
  productData: any;
  _id?: string;
  itemTitle: string;
  category: string;
  description: string;
  condition: string;
  images: ProductImage[];
  auctionFormat: string;
  // auctionDuration: string;
  reservePrice: string;
  shippingType: string;
  shippingCost: string;
  handlingTime: string;
  returnPolicy: string;
  auctionStartDateTime?: any | null; 
  auctionEndDateTime?: any | null; 
}
