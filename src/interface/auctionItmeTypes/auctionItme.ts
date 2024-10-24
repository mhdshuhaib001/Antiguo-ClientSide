
export default interface AuctionItemProps {
    product: {
      id: string;
      imageUrl?: string;
      name: string;
      currentBid: number;
    };
    auctionEndTime?: string;
    status: any;
  }