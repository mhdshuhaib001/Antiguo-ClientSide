import React, { useState } from "react";

interface ItemDetailsProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({  formData,handleInputChange, handleImageChange,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [originalFiles, setOriginalFiles] = useState<File[]>([]);

  const handleImagePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
      setOriginalFiles(files);
    }
  };

  return (
    <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Item Details</h2>

      {/* Flex container for Item Title and Category on the same line */}
      <div className="flex items-center gap-1 mb-4">
        {/* Item Title Field */}
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

        {/* Category Field */}
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm mb-2">Category:</label>
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

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-96 p-2 border border-gray-300 rounded-md"
          rows={4}
          required
        />
      </div>

      {/* Condition */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Condition:</label>
        <textarea
          name="condition"
          value={formData.condition}
          onChange={handleInputChange}
          className="w-96 p-2 border border-gray-300 rounded-md"
          rows={4}
          required
        />
      </div>

      {/* Images */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Images:</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImagePreviewChange} // Updated handler for preview
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="border-t border-gray-300 pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Image Previews:</h3>
          <div className="flex flex-wrap gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="w-24 h-24 overflow-hidden rounded-md border border-gray-300">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
