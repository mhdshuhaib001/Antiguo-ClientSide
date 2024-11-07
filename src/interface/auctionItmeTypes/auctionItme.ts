export default interface AuctionItemProps {
  product: {
    id: string;
    imageUrl?: string | File | null;
    name: string;
    currentBid: Number | string;
  };
  auctionEndTime?: string | null;
  status: 'live' | 'upcoming' | 'end' | 'sold';
  auctionFormat: string;
  auctionStartTime?:string|null
}
