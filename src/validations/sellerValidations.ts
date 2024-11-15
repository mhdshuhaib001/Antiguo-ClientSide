import * as Yup from 'yup';

export const sellerValidationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
<<<<<<< HEAD
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  about: Yup.string().required('About section is required'),
});
=======
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  about: Yup.string().required('About information is required'),
});

>>>>>>> admin/category
