import React from "react";

interface AuctionDetailsProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Auction Details</h2>

      {/* Using grid to place inputs side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Auction Format */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Auction Format:
          </label>
          <select
            name="auctionFormat"
            value={formData.auctionFormat}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Auction Format</option>
            <option value="english">English Auction</option>
            <option value="dutch">Dutch Auction</option>
          </select>
        </div>

        {/* Auction Duration */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Auction Duration:
          </label>
          <input
            type="text"
            name="auctionDuration"
            value={formData.auctionDuration}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Reserve Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Reserve Price:
          </label>
          <input
            type="number"
            name="reservePrice"
            value={formData.reservePrice}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
