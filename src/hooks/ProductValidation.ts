import * as Yup from 'yup';
export const productListSchema = Yup.object().shape({
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
  auctionDuration: Yup.string()
    .required('Auction Duration is required'),
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
    images:Yup.array().of(Yup.string()
    .url('Invalid image URL'))
    .min(4,'At least one image is required')
})
