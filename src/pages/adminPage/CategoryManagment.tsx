import React, { useState } from 'react';
import CategoryModal from '../../components/Admin/CategoryModal';
import {
  useAddCategoryMutation,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from '../../services/apis/adminApi';
import toast from 'react-hot-toast';
import { Category, UploadCategory } from '../../interface/adminTypes/adminApiTypes'; // Updated import

const AdminCategoryTable: React.FC = () => {
  const { data, error, isLoading } = useFetchCategoryQuery();
  const categories = data?.categories || [];
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null); // For editing
  const [isEditMode, setIsEditMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPages = 5;
  const totalPages = Math.ceil(categories?.length / itemsPages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => setIsModalOpen(false);

  const indexOfLastItem = currentPage * itemsPages;
  const indexOfFirstItem = indexOfLastItem - itemsPages;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleCategorySubmit = async (data: UploadCategory) => {
    console.log(data);
    const formData = new FormData();

  
    formData.append('name', data.name);
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.icon) {
      formData.append('icon', data.icon);
    }

    try {
      console.log(formData, 'form data');
      const response =
        isEditMode && currentCategory
          ? await updateCategory({ id: currentCategory._id, formData }).unwrap()
          : await addCategory(formData).unwrap();
      console.log(response, 'jkfsgbkvsjdbfjgbvjhfgjhgbfjhjk');
      if (response) {
        toast.success('Category added successfully!');
        setIsModalOpen(false);
      } else {
        console.log('Category not added correctly');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  const handleAddCategoryClick = () => {
    setIsEditMode(false); // Set to add mode
    setCurrentCategory(null); // No category data for adding
    setIsModalOpen(true);
  };

  const handleEditCategoryClick = (category: Category) => {
    setIsEditMode(true); // Set to edit mode
    setCurrentCategory(category); // Pass the category to the modal for editing
    setIsModalOpen(true);
  };
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Category</h2>
        <button
          onClick={() => handleAddCategoryClick()}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-3 rounded"
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Icon
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.categories.map((category, index) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />{' '}
                  {/* Use imageUrl */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={category.iconUrl} className="w-9 h-9" />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditCategoryClick(category)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px "
          aria-label="Pagination"
        >
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 roudned-1-md border border-gray-300  bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
        </nav>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
              currentPage === index + 1
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleCategorySubmit}
        category={currentCategory}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default AdminCategoryTable;
