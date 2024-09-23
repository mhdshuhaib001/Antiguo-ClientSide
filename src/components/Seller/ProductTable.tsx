import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useFetchProductsQuery, useDeleteProductMutation } from '../../services/apis/sellerApi';

const ProductListTable: React.FC = () => {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const { data: productData, refetch } = useFetchProductsQuery(sellerId);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
      refetch();
      console.log(`Product with ID ${productId} deleted successfully`);
    } catch (error) {
      console.error('Failed to delete the product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">All Product List</h1>
        <button
          onClick={() => navigate('/profile/seller/addproduct')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto"
        >
          List Item
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {productData && productData.products.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                <th className="py-3 px-2 sm:px-6 text-left">Product Name & Size</th>
                <th className="py-3 px-2 sm:px-6 text-left">Bid Price</th>
                <th className="py-3 px-2 sm:px-6 text-left">Category</th>
                <th className="py-3 px-2 sm:px-6 text-left">Status</th>
                <th className="py-3 px-2 sm:px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs sm:text-sm font-light">
              {productData.products.map((product: any) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <img
                          src={product.images[0]}
                          alt={product.itemTitle}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <span className="font-medium">{product.itemTitle}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">${product.reservePrice}</td>
                  <td className="py-3 px-2 sm:px-6 text-left">{product.category}</td>
                  <td className="py-3 px-2 sm:px-6 text-left">
                    <span
                      className={`${
                        product.auctionFormat === 'Live'
                          ? 'bg-red-200 text-red-600'
                          : 'bg-blue-200 text-blue-600'
                      } py-1 px-2 rounded-full text-xs`}
                    >
                      {product.auctionFormat}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/profile/seller/editproduct/${product._id}`)}
                        className="transform hover:text-purple-500 hover:scale-110 transition duration-300"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id ?? '')}
                        className="transform hover:text-purple-500 hover:scale-110 transition duration-300"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <p>No products found. Please add some products.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end items-center mt-6 overflow-x-auto">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-300">
            Previous
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-orange-500 text-sm font-medium text-white hover:bg-orange-600 transition duration-300">
            1
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
            2
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
            3
          </button>
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-300">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductListTable;
