import React from 'react';
import { useFormik } from 'formik';
import { categoryValidationSchema } from '../../validations/categoryValidation';

type CategoryFormProps = {
  onSave: (data: { name: string; image: File | null; icon: File | null }) => void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({ onSave }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      image: null as File | null,
      icon: null as File | null,
    },
    validationSchema: categoryValidationSchema,
    onSubmit: (values) => {
      console.log('Form Submitted', values);
      onSave(values);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;
    formik.setFieldValue('image', file);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;
    formik.setFieldValue('icon', file);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Category Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          name="name" 
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-2"
          placeholder="Enter category name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-600 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      {/* Category Image Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category Image</label>
        {formik.values.image && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Category preview"
              className="w-24 h-24 object-cover rounded-md"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="text-red-600 text-sm">{formik.errors.image}</div>
        ) : null}
      </div>

      {/* SVG Icon Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category Icon (SVG)</label>
        {formik.values.icon && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(formik.values.icon)}
              alt="Category Icon"
              className="w-12 h-12"
            />
          </div>
        )}
        <input
          type="file"
          accept=".svg"
          onChange={handleIconChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {formik.touched.icon && formik.errors.icon ? (
          <div className="text-red-600 text-sm">{formik.errors.icon}</div>
        ) : null}
      </div>

      {/* Save Button */}
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
