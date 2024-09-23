import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useAddProductMutation } from '../../services/apis/sellerApi';
import { Upload } from 'lucide-react';
import { productListingSchema } from '../../hooks/ProductValidation';
import { Field, Formik, Form, ErrorMessage, FieldProps } from 'formik';
import toast from 'react-hot-toast';
import { DatePicker } from '@nextui-org/react';
import { now, getLocalTimeZone } from '@internationalized/date';
import { useNavigate } from 'react-router-dom';
const ProductListingForm: React.FC = () => {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const [auctionFormat, setAuctionFormat] = useState('');

  const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();
  const [previewSources, setPreviewSources] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState('');

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Generate base64 strings and previews
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
          setFieldValue('images', previews);
        })
        .catch(() => {
          setErrMsg('Failed to read file(s).');
        });
    }
  };
  const handleRemoveImage = (index: number) => {
    setPreviewSources((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: any) => {
    console.log('values', values);
    try {
      const startDate = new Date(values.auctionStartDateTime);
      const endDate = new Date(values.auctionEndDateTime);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate <= startDate) {
        setErrMsg(
          'Please select valid start and end dates, ensuring that the end date is after the start date.',
        );
        return;
      }

      const dataToSend = { ...values, sellerId };
      console.log('Submitting:', dataToSend);

      const productData = await addProduct(dataToSend).unwrap();
      console.log('Product Data:', productData);

      toast.success('Product listing submitted successfully!');
      setTimeout(() => {
        // Navigate('profile/seller/product-management')
      }, 1000);
      setErrMsg('');
    } catch (err) {
      console.error('Failed to submit product listing:', err);
      toast.error('Failed to submit product listing.');
    }
  };

  return (
    <div className="mt-10 p-5 shadow-md bg-white m-0">
      <Formik
        initialValues={{
          itemTitle: '',
          category: '',
          description: '',
          condition: '',
          auctionFormat: '',
          reservePrice: '',
          shippingType: '',
          shippingCost: '',
          handlingTime: '',
          returnPolicy: '',
          auctionStartDateTime: null,
          auctionEndDateTime: null,
          images: '',
        }}
        validationSchema={productListingSchema}
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
                  <Field name="itemTitle">
                    {({ field }: { field: any }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </Field>
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
              <div className="mb-4 flex">
                <div className="w-60 mr-4">
                  <label className="block text-gray-700 text-sm mb-2">Images:</label>
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
                        onChange={(e) => handleFileInputChange(e, setFieldValue)}
                      />
                    </label>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Upload images by clicking or dragging files here.
                  </p>
                </div>
                <div className="flex space-x-4 mt-4">
                  {previewSources.map((preview, index) => (
                    <div key={index} className="relative w-32 h-32">
                      <img
                        src={preview}
                        alt={`Image preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 0 text-black rounded-full p-1"
                        title="Remove image"
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
                <div className="md:col-span-1">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Auction Format:</label>
                    <Field
                      as="select"
                      name="auctionFormat"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
                        setAuctionFormat(e.target.value);
                        // Optionally, you can call field.onChange here if needed
                      }}
                    >
                      <option value="">Select Auction Format</option>
                      <option value="auction">Auction</option>
                      <option value="buy-it-now">Buy It Now</option>
                    </Field>
                    <ErrorMessage name="auctionFormat" component="div" className="text-red-500" />
                  </div>

                  {auctionFormat === 'auction' && (
                    <div className="mb-4 flex space-x-4">
                      <div className="flex-1">
                        <label id="date-label" className="block text-gray-700 text-sm mb-2">
                          Auction Start Date & Time:
                        </label>
                        <Field name="auctionStartDateTime">
                          {({ field }: FieldProps) => (
                            <DatePicker
                              aria-labelledby="date-label"
                              variant="bordered"
                              hideTimeZone
                              defaultValue={now(getLocalTimeZone())}
                              onChange={(date) => {
                                const jsDate = new Date(
                                  date.year,
                                  date.month - 1,
                                  date.day,
                                  date.hour,
                                  date.minute,
                                  date.second,
                                  date.millisecond,
                                );

                                if (!isNaN(jsDate.getTime())) {
                                  field.onChange({ target: { name: field.name, value: jsDate } });
                                }
                              }}
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

                      <div className="flex-1">
                        <label id="endDate-label" className="block text-gray-700 text-sm mb-2">
                          Auction End Date & Time:
                        </label>
                        <Field name="auctionEndDateTime">
                          {({ field }: FieldProps) => (
                            <DatePicker
                              aria-labelledby="endDate-label"
                              variant="bordered"
                              hideTimeZone
                              defaultValue={now(getLocalTimeZone())}
                              onChange={(date) => {
                                const jsDate = new Date(
                                  date.year,
                                  date.month - 1,
                                  date.day,
                                  date.hour,
                                  date.minute,
                                  date.second,
                                  date.millisecond,
                                );

                                if (!isNaN(jsDate.getTime())) {
                                  field.onChange({ target: { name: field.name, value: jsDate } });
                                }
                              }}
                              className="w-full"
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
                  )}

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Reserve Price:</label>
                    <Field
                      name="reservePrice"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="reservePrice" component="div" className="text-red-500" />
                  </div>
                </div>

                {/* Summary Area on the right */}
                <div className="md:col-span-1 flex justify-center mt-6">
                  <div className="w-80 h-40 p-3 border border-gray-300 rounded-md bg-gray-50 flex flex-col justify-center items-start">
                    <h3 className="text-lg font-semibold mb-2">Auction Summary</h3>
                    {auctionFormat == 'auction' ? (
                      <>
                        <p className="mb-1">
                          <strong>Start:</strong>{' '}
                          <Field name="auctionStartDateTime" component="span" />
                        </p>
                        <p className="mb-1">
                          <strong>Duration:</strong>{' '}
                          <Field name="auctionDuration" component="span" />
                        </p>
                      </>
                    ) : (
                      <p className="mb-1 text-gray-500">Buy It Now.</p>
                    )}

                    <p className="mb-1">
                      <strong>Reserve:</strong> <Field name="reservePrice" component="span" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Shipping Details */}
            <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
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

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Shipping Cost:</label>
                  <Field
                    name="shippingCost"
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="shippingCost" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
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

                <div className="mb-4">
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
                className={`w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center ${isAddProductLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                // disabled={isAddProductLoading}
              >
                {isAddProductLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12c0-4.418 3.582-8 8-8 1.516 0 2.934.447 4.118 1.207L15.118 8.82A6.001 6.001 0 0012 6c-3.314 0-6 2.686-6 6 0 1.172.373 2.253.936 3.177l-1.103 1.372A7.958 7.958 0 014 12z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductListingForm;
