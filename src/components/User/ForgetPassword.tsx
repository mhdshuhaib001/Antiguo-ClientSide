import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords don't match")
    .required("Required"),
});

const ForgetPassword = () => {
  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={ForgetPasswordSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form className="w-full max-w-md mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
          
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
            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>

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
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default ForgetPassword;
