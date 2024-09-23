

import * as Yup from 'yup';

export const productListingSchema = Yup.object().shape({
  itemTitle: Yup.string()
    .required('Item Title is required'),
  category: Yup.string()
    .required('Category is required'),
  description: Yup.string()
    .required('Description is required'),
  condition: Yup.string()
    .required('Condition is required'),
  auctionFormat: Yup.string()
    .required('Auction Format is required'),
  // auctionDuration: Yup.string()
  //   .required('Auction Duration is required'), // Ensure this is needed
  reservePrice: Yup.number()
    .required('Reserve Price is required')
    .positive('Reserve Price must be a positive number'),
  shippingType: Yup.string()
    .required('Shipping Type is required'),
  shippingCost: Yup.number()
    .required('Shipping Cost is required')
    .positive('Shipping Cost must be a positive number'),
  handlingTime: Yup.string()
    .required('Handling Time is required'),
  returnPolicy: Yup.string()
    .required('Return Policy is required'),
  images: Yup.array()
    .min(1, 'At least one image is required'),
    auctionStartDateTime: Yup.date().required('Start date is required'),
    auctionEndDateTime: Yup.date().required('End date is required'),
    // auctionStartDateTime: Yup.date()
  //   .required('Auction Start Date & Time is required'),
  // auctionEndDateTime: Yup.date()
  //   .required('Auction End Date & Time is required')
  //   .min(Yup.ref('auctionStartDateTime'), 'End date must be after start date'),

});
