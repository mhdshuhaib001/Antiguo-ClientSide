
export interface Product {
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
    auction_start_time?: Date; 
    auctionEndDateTime?: string;  
  }
  
  