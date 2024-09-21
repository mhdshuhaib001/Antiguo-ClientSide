import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useAddProductMutation } from '../../services/apis/sellerApi';
import { ChevronDown, Upload, Settings } from 'lucide-react';
import { productListSchema } from '../../hooks/ProductValidation';
import { Formik } from 'formik';

  
const ProductListingForm: React.FC = () => {
  const userId = useSelector((state: RootState) => state.User._id);
  const [addProduct] = useAddProductMutation();
  const [formData, setFormData] = useState({
    itemTitle: '',
    category: '',
    description: '',
    condition: '',
    auctionFormat: '',
    auctionDuration: '',
    reservePrice: '',
    shippingType: '',
    shippingCost: '',
    handlingTime: '',
    returnPolicy: '',
    images: [] as string[],
  });
  const [previewSources, setPreviewSources] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const previewPromises = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previewPromises)
        .then((previews) => {
          setPreviewSources(previews);
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: previews,
          }));
        })
        .catch(() => {
          setErrMsg('Failed to read file(s).');
        });
    }
  };

  const handleDropzoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileInputChange(e); // Reuse file input change handler
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      userId,
    };

    try {
      const productData = await addProduct(dataToSend).unwrap();
      console.log(productData);
      setSuccessMsg('Product listing submitted successfully!');
    } catch (err) {
      console.error('Failed to submit product listing:', err);
      setErrMsg('Failed to submit product listing.');
    }
  };

  return (
    <div className="mt-10 p-5 shadow-md bg-white m-0">
      <form onSubmit={handleSubmit}>
        {/* Item Details */}
        <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Item Details</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2/3">
              <label className="block text-gray-700 text-sm mb-2">
                Item Title:
              </label>
              <input
                type="text"
                name="itemTitle"
                value={formData.itemTitle}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block text-gray-700 text-sm mb-2">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a Category</option>
                <option value="art">Art</option>
                <option value="electronics">Electronics</option>
                <option value="antiques">Antiques</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Condition:
            </label>
            <textarea
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Images:
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-400" size={48} />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleDropzoneChange}
                />
              </label>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Upload images by clicking or dragging files here.
            </p>
            <div className="flex space-x-4 mt-4">
              {previewSources.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Image preview ${index + 1}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        {/* Auction Details */}
        <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Auction Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="auction">Auction</option>
                <option value="buy-it-now">Buy It Now</option>
              </select>
            </div>
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
        {/* Shipping Details */}
        <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Shipping Type:
              </label>
              <input
                type="text"
                name="shippingType"
                value={formData.shippingType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Shipping Cost:
              </label>
              <input
                type="number"
                name="shippingCost"
                value={formData.shippingCost}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Handling Time:
              </label>
              <input
                type="text"
                name="handlingTime"
                value={formData.handlingTime}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Return Policy:
              </label>
              <input
                type="text"
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Submit Listing
          </button>
        </div>
      </form>
      {successMsg && (
        <div className="mt-4 text-green-500">
          {successMsg}
        </div>
      )}
      {errMsg && (
        <div className="mt-4 text-red-500">
          {errMsg}
        </div>
      )}
    </div> 
  );
};

export default ProductListingForm;


