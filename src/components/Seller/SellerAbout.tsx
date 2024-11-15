<<<<<<< HEAD
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Edit2, Save, Camera } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import {
  useUpdateSellerProfileMutation,
  useFetchSellerByIdQuery,
} from '../../services/apis/sellerApi';
import { SellerInfo } from '../../interface/sellerTypes/sellerApiTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import toast from 'react-hot-toast';
import { sellerValidationSchema } from '../../validations/sellerValidations';

export default function SellerAboutPage() {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  console.log(sellerId,'this is for the sellerId')
  const { data: sellerData, error, isLoading } = useFetchSellerByIdQuery(sellerId);
  
  const [updateProfile, { isLoading: isUpdating }] = useUpdateSellerProfileMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    about: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Load seller data
  useEffect(() => {
    if (sellerData?.seller) {
      setSellerInfo({
        companyName: sellerData.seller.companyName || '',
        email: sellerData.seller.email || '',
        phone: sellerData.seller.phone || '',
        address: sellerData.seller.address || '',
        about: sellerData.seller.about || '',
        image: sellerData.seller.profile || '', 
      });
    }
  }, [sellerData]);
  console.log(sellerData,'sellerInfo============================================');
  // Handle image change
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file); 
      setSellerInfo((prev) => ({ ...prev, image: imageUrl }));
      setFieldValue('image', imageUrl);
    }
  };

  // Form submission
  const handleFormSubmit = async (values: FormikValues) => {
    const formData = new FormData();
    formData.append('_id', sellerId);

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await updateProfile(formData).unwrap();
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
      console.error('Update profile error:', error);
    }
  };

=======
// import React from 'react';
// import { useState, useRef, ChangeEvent } from 'react';
// import { Edit2, Save, Camera } from 'lucide-react';
// import { Image } from '@nextui-org/react';
// import { useUpdatescellerprofileMutation ,useFetchSellerQuery} from '../../services/apis/sellerApi';
// import { SellerInfo } from '../../interface/sellerTypes/sellerApiTypes';
// import { RootState } from '../../store/Store';
// import { useSelector } from 'react-redux';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { sellerValidationSchema } from '../../validations/sellerValidations'; 
// export default function SellerAboutPage() {
//   const sellerId = useSelector((state: RootState) => state.Seller.sellerId);

//   const [updateProfile] = useUpdatescellerprofileMutation();
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [sellerInfo, setSellerInfo] = useState<SellerInfo>({
//     companyName: '',
//     email: '',
//     phone: '',
//     address: '',
//     about: '',
//     image: '',
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSellerInfo((prev) => ({ ...prev, image: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const saveChanges = async (values: SellerInfo) => {
//     const formData = new FormData();
//     formData.append('_id', sellerId);
//     formData.append('companyName', values.companyName);
//     formData.append('email', values.email);
//     formData.append('phone', values.phone);
//     formData.append('address', values.address);
//     formData.append('about', values.about);

//     const file = fileInputRef.current?.files?.[0];
//     if (file) {
//       formData.append('image', file);
//     }

//     try {
//       const response = await updateProfile(formData).unwrap();
//       console.log('Profile updated successfully:', response);
//       setIsEditing(false); // Turn off editing after successful save
//     } catch (error) {
//       console.error('Error updating seller:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fcfaee] py-4 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto bg-[#f5f0d0] shadow-lg rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-[#f5f0d0] border-b border-[#c2b370] flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#5c4f2c]">About the Seller</h1>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="px-4 py-2 bg-[#8c7851] text-white rounded hover:bg-[#6e5f41] transition duration-300 flex items-center"
//           >
//             {isEditing ? (
//               <Save className="w-4 h-4 mr-2" />
//             ) : (
//               <Edit2 className="w-4 h-4 mr-2" />
//             )}
//             {isEditing ? 'Save' : 'Edit'}
//           </button>
//         </div>

//         <Formik
//           initialValues={sellerInfo}
//           validationSchema={sellerValidationSchema}
//           onSubmit={saveChanges}
//           enableReinitialize
//         >
//           {({ setFieldValue }) => (
//             <Form className="p-6 space-y-6">
//               <div className="flex items-center space-x-6">
//                 <div className="relative w-32 h-32">
//                   <Image
//                     src={sellerInfo.image || '/placeholder.svg'}
//                     alt="Seller"
//                     className="rounded-full"
//                   />
//                   {isEditing && (
//                     <button
//                       type="button"
//                       onClick={() => fileInputRef.current?.click()}
//                       className="absolute bottom-0 right-0 p-2 bg-[#8c7851] text-white rounded-full hover:bg-[#6e5f41] transition duration-300"
//                     >
//                       <Camera className="w-5 h-5" />
//                     </button>
//                   )}
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={(e) => {
//                       handleImageChange(e);
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFieldValue('image', file);
//                       }
//                     }}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-[#5c4f2c]">
//                     {sellerInfo.companyName || 'Company Name'}
//                   </h2>
//                   <p className="text-[#3a3422]">{sellerInfo.email || 'Email Address'}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Company Name</label>
//                 <Field
//                   name="companyName"
//                   as="input"
//                   className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
//                   disabled={!isEditing}
//                 />
//                 <ErrorMessage name="companyName" component="div" className="text-red-600" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Email</label>
//                 <p className="text-[#3a3422]">{sellerInfo.email || 'Not Provided'}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Phone</label>
//                 <Field
//                   name="phone"
//                   as="input"
//                   className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
//                   disabled={!isEditing}
//                 />
//                 <ErrorMessage name="phone" component="div" className="text-red-600" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Address</label>
//                 <Field
//                   name="address"
//                   as="input"
//                   className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
//                   disabled={!isEditing}
//                 />
//                 <ErrorMessage name="address" component="div" className="text-red-600" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5c4f2c] mb-1">About</label>
//                 <Field
//                   name="about"
//                   as="textarea"
//                   rows={4}
//                   className="w-full p-4 border border-[#c2b370] bg-[#fcfaee] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
//                   disabled={!isEditing}
//                 />
//                 <ErrorMessage name="about" component="div" className="text-red-600" />
//               </div>

//               {isEditing && (
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#8c7851] text-white rounded hover:bg-[#6e5f41] transition duration-300"
//                 >
//                   Save Changes
//                 </button>
//               )}
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

























import React, { useState, useRef, ChangeEvent } from 'react';
import { Edit2, Save, Camera } from 'lucide-react';
import { Image } from '@nextui-org/react';
import { useUpdatescellerprofileMutation, useFetchSellerQuery } from '../../services/apis/sellerApi';
import { SellerInfo } from '../../interface/sellerTypes/sellerApiTypes';
import { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { sellerValidationSchema } from '../../validations/sellerValidations'; 

export default function SellerAboutPage() {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const { data: sellerData, error, isLoading } = useFetchSellerQuery(sellerId);
console.log(sellerData,'seller data on the fronern d')
  const [updateProfile] = useUpdatescellerprofileMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the image URL in Formik when an image is selected
        setFieldValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async (values: SellerInfo) => {
    const formData = new FormData();
    formData.append('_id', sellerId);
    formData.append('companyName', values.companyName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('about', values.about);

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append('image', file);
    }

    try {
      await updateProfile(formData).unwrap();
      setIsEditing(false);  // Disable editing after save
    } catch (error) {
      console.error('Error updating seller:', error);
    }
  };

  // Check for loading or error states
>>>>>>> admin/category
  if (isLoading) return <div>Loading seller data...</div>;
  if (error) return <div>Error fetching seller data: {(error as any).message}</div>;

  return (
    <div className="min-h-screen bg-[#fcfaee] py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-[#f5f0d0] shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-[#f5f0d0] border-b border-[#c2b370] flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#5c4f2c]">About the Seller</h1>
          <button
<<<<<<< HEAD
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#8c7851] text-white rounded hover:bg-[#6e5f41] transition duration-300 flex items-center"
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
=======
            onClick={toggleEdit}
            className="px-4 py-2 bg-[#8c7851] text-white rounded hover:bg-[#6e5f41] transition duration-300 flex items-center"
          >
            {isEditing ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <Edit2 className="w-4 h-4 mr-2" />
            )}
>>>>>>> admin/category
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <Formik
<<<<<<< HEAD
          initialValues={sellerInfo}
          enableReinitialize={true}
          validationSchema={sellerValidationSchema}
          onSubmit={handleFormSubmit}
=======
          initialValues={{
            companyName: sellerData?.companyName || '',
            email: sellerData?.email || '',
            phone: sellerData?.phone || '',
            address: sellerData?.address || '',
            about: sellerData?.about || '',
            image: sellerData?.image || '',
          }}
          validationSchema={sellerValidationSchema}
          onSubmit={saveChanges}
          enableReinitialize
>>>>>>> admin/category
        >
          {({ setFieldValue }) => (
            <Form className="p-6 space-y-6">
              <div className="flex items-center space-x-6">
<<<<<<< HEAD
                <div className="relative w-32 h-32 overflow-hidden rounded-full border border-[#c2b370]">
                  <img
                    src={sellerInfo.image || '/placeholder.svg'}
                    alt="Seller"
                    className="w-full h-full object-cover rounded-full"
=======
                <div className="relative w-32 h-32">
                  <Image
                    src={sellerData?.image || '/placeholder.svg'}
                    alt="Seller"
                    className="rounded-full"
>>>>>>> admin/category
                  />
                  {isEditing && (
                    <button
                      type="button"
<<<<<<< HEAD
                      onClick={() => document.getElementById('file-input')?.click()}
                      className="absolute bottom-0 right-0 p-2 bg-[#8c7851] text-white rounded-full hover:bg-[#6e5f41] transition duration-300"
                      style={{ transform: 'translate(50%, 50%)', zIndex: 10 }}
                    >
                      <Camera className="w-6 h-6" />
=======
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-2 bg-[#8c7851] text-white rounded-full hover:bg-[#6e5f41] transition duration-300"
                    >
                      <Camera className="w-5 h-5" />
>>>>>>> admin/category
                    </button>
                  )}
                  <input
                    type="file"
<<<<<<< HEAD
                    id="file-input"
=======
                    ref={fileInputRef}
>>>>>>> admin/category
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
<<<<<<< HEAD

                <div>
                  <h2 className="text-xl font-semibold text-[#5c4f2c]">
                    {sellerInfo.companyName || 'Company Name'}
                  </h2>
                  <p className="text-[#3a3422]">{sellerData?.seller.email || 'Email Address'}</p>
                </div>
              </div>

              {/* Company Name Field */}
              <div>
                <label className="block text-sm font-medium text-[#5c4f2c] mb-1">
                  Company Name
                </label>
=======
                <div>
                  <h2 className="text-xl font-semibold text-[#5c4f2c]">
                    {sellerData?.companyName || 'Company Name'}
                  </h2>
                  <p className="text-[#3a3422]">{sellerData?.email || 'Email Address'}</p>
                </div>
              </div>

              {/* Form fields with conditionally disabled inputs */}
              <div>
                <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Company Name</label>
>>>>>>> admin/category
                <Field
                  name="companyName"
                  as="input"
                  className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
                  disabled={!isEditing}
                />
                <ErrorMessage name="companyName" component="div" className="text-red-600" />
              </div>

<<<<<<< HEAD
              {/* Phone Field */}
=======
              <div>
                <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Email</label>
                <p className="text-[#3a3422]">{sellerData?.email || 'Not Provided'}</p>
              </div>

>>>>>>> admin/category
              <div>
                <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Phone</label>
                <Field
                  name="phone"
                  as="input"
                  className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
                  disabled={!isEditing}
                />
                <ErrorMessage name="phone" component="div" className="text-red-600" />
              </div>

<<<<<<< HEAD
              {/* Address Field */}
=======
>>>>>>> admin/category
              <div>
                <label className="block text-sm font-medium text-[#5c4f2c] mb-1">Address</label>
                <Field
                  name="address"
                  as="input"
                  className="w-full px-3 py-2 border border-[#c2b370] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
                  disabled={!isEditing}
                />
                <ErrorMessage name="address" component="div" className="text-red-600" />
              </div>

<<<<<<< HEAD
              {/* About Field */}
=======
>>>>>>> admin/category
              <div>
                <label className="block text-sm font-medium text-[#5c4f2c] mb-1">About</label>
                <Field
                  name="about"
                  as="textarea"
                  rows={4}
                  className="w-full p-4 border border-[#c2b370] bg-[#fcfaee] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c7851]"
                  disabled={!isEditing}
                />
                <ErrorMessage name="about" component="div" className="text-red-600" />
              </div>
<<<<<<< HEAD

              {/* Save Changes Button */}
              {isEditing && (
                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8c7851] text-white rounded hover:bg-[#6e5f41] transition duration-300"
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
=======
>>>>>>> admin/category
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
