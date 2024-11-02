import { CalendarDateTime } from '@internationalized/date';
import { Seller } from '../sellerTypes/sellerApiTypes';

export type ProductImage = any;

export interface ProductType {
  categoryId: any;
  sellerData: Seller;
  productData: any;
  _id?: string;
  itemTitle: string;
  category: any;
  description: string;
  condition: string;
  images: ProductImage[];
  currentBid:Number
  auctionFormat: string;
  sold: boolean;
  reservePrice: string;
  shippingType: string;
  shippingCost: string;
  handlingTime: string;
  returnPolicy: string;
  auctionStartDateTime?: any | null;
  auctionEndDateTime?: any | null;
  auctionStatus: 'live' | 'upcoming' | 'ended' | 'sold';
}
