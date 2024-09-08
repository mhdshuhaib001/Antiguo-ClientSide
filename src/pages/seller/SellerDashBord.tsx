import React, { useState } from 'react';
import BrandModal from '../../components/User/BrandModal';
import TermsModal from '../../components/User/TermsModal';
import { useCreateSellerMutation } from '../../services/apis/sellerApi';
import { SellerCreationRequest, SellerResponse } from "../../types/sellerTypes/sellerApiTypes";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store'; // Ensure this path is correct

interface SellerProps {
    onSellerCreate?: (data: SellerResponse) => void;
}

const SellerDashBord: React.FC<SellerProps> = ({ onSellerCreate }) => {

  const userState = useSelector((state: RootState) => state.user);
  console.log(userState,'userDataaa')
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [createSeller] = useCreateSellerMutation()

  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);

  const openBrandModal = () => setIsBrandModalOpen(true);
  const closeBrandModal = () => {
    setCompanyName('');
    setErrorMessage('');
    setSuccessMessage('');
    setIsBrandModalOpen(false);
  };

  const handleAcceptTerms = () => {
    closeTermsModal();
    openBrandModal();
  };

  const brandCreate = async () => {
    try {
      if (!companyName.trim()) {
        setErrorMessage('Brand name cannot be empty.');
        setSuccessMessage('');
        return;
      }

      const sellerData: SellerCreationRequest = {
        CompanyName: companyName,
      };
      
      const response = await createSeller(sellerData).unwrap(); // Use unwrap() to handle the result
      setSuccessMessage('Brand created successfully!');
      setErrorMessage('');
      closeBrandModal();
      
      // Notify the parent component about the new seller
      if (onSellerCreate) {
        onSellerCreate(response);
      }

    } catch (error) {
      console.error('Brand creation failed', error);
      setErrorMessage('An error occurred while creating the brand.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-6 bg-white shadow-md overflow-auto">
      <h1 className="text-2xl font-medium mb-6 sm:text-3xl">
        Seller Dashboard
      </h1>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-xl font-medium mb-4 text-center sm:text-2xl">
          Sell Your Antique Items
        </h2>

        <p className="text-gray-800 mb-6 text-center text-sm sm:text-base md:text-lg">
          It’s quick and easy to list your antiques. Start selling and see the value of your cherished items grow!
        </p>

        <button
          onClick={openTermsModal}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm sm:text-base mb-4"
        >
          View Terms and Conditions
        </button>
      </div>

      {/* Terms and Conditions Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={closeTermsModal}
        onAccept={handleAcceptTerms}
      />

      {/* Brand Name Modal */}
      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={closeBrandModal}
        brandName={companyName}
        setBrandName={setCompanyName}
        onBrandCreate={brandCreate}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </div>
  );
};

export default SellerDashBord;
