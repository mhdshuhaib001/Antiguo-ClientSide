import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useAddProductMutation } from '../../services/apis/sellerApi';
import 'tailwindcss/tailwind.css';

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
  const [fileInputState, setFileInputState] = useState('');
  const [previewSources, setPreviewSources] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>();
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
      setSelectedFiles(fileArray);

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
            <label className="block text-gray-700 text-sm mb-2 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m0 0l-3-3m3 3H4M12 4V2M12 12h4M12 12V8M12 12V2M8 4h4M8 4H4m4 0h4M4 4v4m4-4v4m0 0h4M4 4h4M8 8h4M8 8v4M8 8H4M4 8v4m4 0h4"
                />
              </svg>
              Images:
            </label>
            <input
              type="file"
              name="images"
              onChange={handleFileInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              multiple
            />
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
              <select
                name="shippingType"
                value={formData.shippingType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Shipping Type</option>
                <option value="standard">Standard</option>
                <option value="express">Express</option>
              </select>
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
              <textarea
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Submit Listing
        </button>
        {successMsg && <p className="text-green-500 mt-4">{successMsg}</p>}
        {errMsg && <p className="text-red-500 mt-4">{errMsg}</p>}
      </form>
    </div>
  );
};

export default ProductListingForm;
