import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useForgetPasswordMutation } from '../../services/apis/userApi';
import toast from 'react-hot-toast';

const ForgetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], "Passwords don't match")
    .required('Required'),
});

const ForgetPassword = () => {
  const [status, setStatus] = useState<{ error?: string; success?: string }>({});
  const [token, setToken] = useState<string | null>(null);

  const [forgetPassword] = useForgetPasswordMutation();

  // Extract token from the URL query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setStatus({ error: 'No token found in the URL' });
    }
  }, []);

  const handleSubmit = async (values: { newPassword: string }, { setSubmitting }: any) => {
    if (token) {
      try {
        // Send the token and new password to the backend
        const response = await forgetPassword({
          token,
          newPassword: values.newPassword,
        }).unwrap();
        setStatus({ success: "Password reset successful!" });
        toast.success('Password change successful');
      } catch (error) {
        setStatus({ error: "Failed to reset password. Please try again." });
        toast.error('Password reset failed');
      } finally {
        setSubmitting(false);
      }
    } else {
      setStatus({ error: "No valid token found." });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={ForgetPasswordSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form className="w-full max-w-md mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

          {/* New Password Field */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">
              New Password:
            </label>
            <Field
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Confirm New Password:
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Success/Error Messages */}
          {status?.error && (
            <div className="text-red-500 text-sm mb-4">{status.error}</div>
          )}

          {status?.success && (
            <div className="text-green-500 text-sm mb-4">{status.success}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {/* Show global error */}
          {status?.error && (
            <div className="text-red-500 text-sm mt-4">
              {status.error || 'An error occurred.'}
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default ForgetPassword;
