import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Upload } from 'lucide-react';
import { DatePicker } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useGetProductQuery, useUpdateProductMutation } from '../../services/apis/sellerApi';
import toast from 'react-hot-toast';

const EditProductForm: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  if (!productId) {
    return <div>Product ID is missing</div>;
  }
  const { data: product, isLoading: isProductLoading } = useGetProductQuery(productId);
  console.log(product, 'this is the productData');
  const [updateProduct, { isLoading: isUpdateProductLoading }] = useUpdateProductMutation();
  const [previewSources, setPreviewSources] = useState<string[]>([]);

  useEffect(() => {
    if (product && product.images) {
      console.log(product, 'This is the product data fetched from the API');

      setPreviewSources(product.images);
    }
  }, [product]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
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
          setPreviewSources((prev) => [...prev, ...previews]);
          setFieldValue('images', [...previewSources, ...previews]);
        })
        .catch(() => {
          toast.error('Failed to read file(s).');
        });
    }
  };

  const handleRemoveImage = (index: number, setFieldValue: any) => {
    setPreviewSources((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index);
      setFieldValue('images', newPreviews);
      return newPreviews;
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      const updatedProductData = await updateProduct({ ...values, productId, sellerId }).unwrap();
      console.log('Updated Product Data:', updatedProductData);
      toast.success('Product updated successfully!');
    } catch (err) {
      console.error('Failed to update product:', err);
      toast.error('Failed to update product.');
    }
  };

  if (isProductLoading || !product) {
    return <div>Loading product data...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mt-10 p-5 shadow-md bg-white m-0">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <Formik
        initialValues={{
          itemTitle: product?.productData?.itemTitle || '',
          category: product?.productData?.category || '',
          description: product.productData.description || '',
          condition: product.productData.condition || '',
          auctionFormat: product.productData.auctionFormat || '',
          reservePrice: product.productData.reservePrice || '',
          shippingType: product.productData.shippingType || '',
          shippingCost: product.productData.shippingCost || '',
          handlingTime: product.productData.handlingTime || '',
          returnPolicy: product.productData.returnPolicy || '',
          auctionStartDateTime: product.productData.auctionStartDateTime || null,
          auctionEndDateTime: product.productData.auctionEndDateTime || null,
          images: product.productData.images || [],
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            {/* Item Details */}
            <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Item Details</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2/3">
                  <label className="block text-gray-700 text-sm mb-2">Item Title:</label>
                  <Field
                    name="itemTitle"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="itemTitle" component="div" className="text-red-500" />
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700 text-sm mb-2">Category:</label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a Category</option>
                    <option value="art">Art</option>
                    <option value="electronics">Electronics</option>
                    <option value="antiques">Antiques</option>
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-red-500" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Description:</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Condition:</label>
                <Field
                  as="textarea"
                  name="condition"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
                <ErrorMessage name="condition" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Images:</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileInputChange(e, setFieldValue)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  aria-label="Upload Images"
                />
                <div className="flex flex-wrap mt-2">
                  {previewSources.map((preview, index) => (
                    <div key={index} className="relative w-24 h-24 m-1">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, setFieldValue)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        aria-label={`Remove image preview ${index + 1}`}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Auction Details */}
            <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Auction Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Auction Format:</label>
                  <Field
                    as="select"
                    name="auctionFormat"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Auction Format</option>
                    <option value="auction">Auction</option>
                    <option value="buy-it-now">Buy It Now</option>
                  </Field>
                  <ErrorMessage name="auctionFormat" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Reserve Price:</label>
                  <Field
                    name="reservePrice"
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="reservePrice" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Auction Start Date & Time:
                  </label>
             <Field name="auctionStartDateTime">
  {({ field }:any) => (
    <DatePicker
      value={field.value || null} // Ensure the DatePicker has a value
      onChange={(date) => setFieldValue('auctionStartDateTime', date)}
      className="w-full"
    />
  )}
</Field>
                  <ErrorMessage
                    name="auctionStartDateTime"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Auction End Date & Time:
                  </label>
                  <Field name="auctionEndDateTime">
                    {({ field }: any) => (
                      <DatePicker
                        {...field}
                        className="w-full"
                        onChange={(date) => setFieldValue('auctionEndDateTime', date)}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="auctionEndDateTime"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Shipping Type:</label>
                  <Field
                    as="select"
                    name="shippingType"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Shipping Type</option>
                    <option value="standard">Standard</option>
                    <option value="expedited">Expedited</option>
                  </Field>
                  <ErrorMessage name="shippingType" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Shipping Cost:</label>
                  <Field
                    name="shippingCost"
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="shippingCost" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Handling Time:</label>
                  <Field
                    as="select"
                    name="handlingTime"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Handling Time</option>
                    <option value="immediate">Immediate</option>
                    <option value="3_business_days">3 Business Days</option>
                    <option value="standard">Standard</option>
                  </Field>
                  <ErrorMessage name="handlingTime" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Return Policy:</label>
                  <Field
                    as="select"
                    name="returnPolicy"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Return Policy</option>
                    <option value="5_days">5 Days</option>
                    <option value="10_days">10 Days</option>
                    <option value="14_days">14 Days</option>
                  </Field>
                  <ErrorMessage name="returnPolicy" component="div" className="text-red-500" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${
                  isUpdateProductLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isUpdateProductLoading}
              >
                {isUpdateProductLoading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductForm;
