import React from 'react';
import { useState, useRef, ChangeEvent } from 'react';
import { Edit2, Save, Camera } from 'lucide-react';
import { Image } from '@nextui-org/react';
import { useCreateSellerMutation } from '../../services/apis/sellerApi';
import {SellerInfo} from '../../interface/sellerTypes/sellerApiTypes'


export default function SellerAboutPage() {


  const [createSeller] = useCreateSellerMutation();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    about: '',
    image: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSellerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSellerInfo((prev) => ({ ...prev, image: reader.result as string })); 
        };
        reader.readAsDataURL(file);
        console.log('Selected file:', file); 
    }
};


  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    if (!sellerInfo.companyName || !sellerInfo.email || !sellerInfo.phone || !sellerInfo.address || !sellerInfo.about) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Seller Info before appending to FormData:', sellerInfo);

    const formData = new FormData();
    formData.append('companyName', sellerInfo.companyName);
    formData.append('email', sellerInfo.email);
    formData.append('phone', sellerInfo.phone);
    formData.append('address', sellerInfo.address);
    formData.append('about', sellerInfo.about);
    console.log(formData,'haiiiiiiiiiiiii')
    // Append the image file
    const file = fileInputRef.current?.files?.[0];
    console.log('File before appending:', file);

    if (file) {
      formData.append('image', file);
    }

    // Uncomment and implement your API call logic here
    try {
      const response = await createSeller(formData).unwrap();
      console.log('Seller created successfully:', response);
    } catch (error) {
      console.error('Error creating seller:', error);
    }

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfaee] py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-[#f5f0d0] shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-[#f5f0d0] border-b border-[#c2b370] flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#5c4f2c]">About the Seller</h1>
          <button
            onClick={isEditing ? saveChanges : toggleEdit}
            className="px-4 py-2 bg-[#8c7851] text-white rounded hover:bg-[#6e5f41] transition duration-300 flex items-center"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32">
              <Image src={sellerInfo.image || '/placeholder.svg'} alt="Seller" className="rounded-full" />
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-[#8c7851] text-white rounded-full hover:bg-[#6e5f41] transition duration-300"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#5c4f2c]">{sellerInfo.companyName || 'Company Name'}</h2>
              <p className="text-[#3a3422]">{sellerInfo.email || 'Email Address'}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Company Name</label>
            {isEditing ? (
              <input
                name="companyName"
                value={sellerInfo.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
              />
            ) : (
              <p className="text-[#3a3422]">{sellerInfo.companyName || 'Not Provided'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Email</label>
            {isEditing ? (
              <input
                name="email"
                value={sellerInfo.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
              />
            ) : (
              <p className="text-[#3a3422]">{sellerInfo.email || 'Not Provided'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Phone</label>
            {isEditing ? (
              <input
                name="phone"
                value={sellerInfo.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
              />
            ) : (
              <p className="text-[#3a3422]">{sellerInfo.phone || 'Not Provided'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Address</label>
            {isEditing ? (
              <input
                name="address"
                value={sellerInfo.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
              />
            ) : (
              <p className="text-[#3a3422]">{sellerInfo.address || 'Not Provided'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5c4f2c] mb-1">About</label>
            {isEditing ? (
              <textarea
                name="about"
                value={sellerInfo.about}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-4 border border-[#c2b370] bg-[#fcfaee] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
              />
            ) : (
              <div className="w-96 p-4 border border-[#c2b370] bg-[#f5f0d0] rounded-md shadow-md">
                <p className="text-[#3a3422]">{sellerInfo.about || 'Not Provided'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
