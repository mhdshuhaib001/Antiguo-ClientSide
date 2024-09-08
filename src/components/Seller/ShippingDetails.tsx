import React from "react";

interface ShippingDetailsProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>

      {/* Using grid to place inputs side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shipping Type */}
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
            <option value="standard">Standard Shipping</option>
            <option value="express">Express Shipping</option>
          </select>
        </div>

        {/* Shipping Cost */}
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

        {/* Handling Time */}
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

        {/* Return Policy */}
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm mb-2">
            Return Policy:
          </label>
          <textarea
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
