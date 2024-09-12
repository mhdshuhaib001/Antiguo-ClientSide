import React from 'react';
import { useFormik } from 'formik';
import { useLoginValidation } from '../../hooks/useLoginValidation';
import { useLoginMutation } from '../../services/apis/userApi';
import { AuthRequest, AuthResponse } from '../../interface/userTypes/apiTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';

interface LoginFormProps {
  onLogin: (data: AuthResponse) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginValidationScema } = useLoginValidation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationScema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      const user: AuthRequest = {
        email: values.email,
        password: values.password,
      };

      try {
        const result: any = await login(user).unwrap();
        const authToken = result.accessToken;
        localStorage.setItem('accessToken', authToken!);

        const userDetails = result.userData;
        dispatch(
          setUser({
            _id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            role: 'user',
          })
        );

        onLogin(result);
        navigate('/home');
      } catch (error: any) {
        if (error?.data?.errors) {
          Object.keys(error.data.errors).forEach((key) => {
            setFieldError(key, error.data.errors[key]);
          });
        } else if (error?.data?.message) {
          setFieldError('password', error.data.message);
        } else {
          setFieldError('password', 'Login failed. Please try again.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-400' : ''}`}
          placeholder="Your email"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.password && formik.errors.password ? 'border-red-400' : ''}`}
          placeholder="Your password"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 text-xs italic">
            {formik.errors.password}
          </p>
        ) : null}
      </div>

      <div className="mb-4 text-right">
        <a
          href="/forgot-password"
          className="text-black-500 hover:text-blue-700 text-sm"
        >
          Forgot Password?
        </a>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
