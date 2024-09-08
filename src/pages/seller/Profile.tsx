import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'tailwindcss/tailwind.css';
import ItemDetails from '../../components/Seller/ItemDetails';
import AuctionDetails from '../../components/Seller/AuctionDetails';
import ShippingDetails from '../../components/Seller/ShippingDetails';
import { FormDataType } from '../../types/sellerTypes/sellerApiTypes'; 

const ProductListingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    itemTitle: '',
    category: '',
    description: '',
    condition: '',
    images: [],
    auctionFormat: '',
    auctionDuration: '',
    reservePrice: '',
    shippingType: '',
    shippingCost: '',
    handlingTime: '3 business days',
    returnPolicy: 'No returns accepted unless item is not as described',
  });

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image input
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData({ ...formData, images: files });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault(); 
    console.log('Form submitted:', formData);
  };

  return (
    <div className=" mx-auto mt-10 p-5 shadow-md  bg-white">
      <form onSubmit={handleSubmit}>
        {/* Render Item Details */}
        <ItemDetails
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
        />
        
        {/* Render Auction Details */}
        <AuctionDetails
          formData={formData}
          handleInputChange={handleInputChange}
        />
        
        {/* Render Shipping Details */}
        <ShippingDetails
          formData={formData}
          handleInputChange={handleInputChange}
        />
        
        {/* Submit Button */}
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Submit Product Listing
        </button>
      </form>
    </div>
  );
};

export default ProductListingForm;
