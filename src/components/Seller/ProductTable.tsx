import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import toast from 'react-hot-toast';
import { useFetchProductsQuery, useDeleteProductMutation } from '../../services/apis/sellerApi';
import ProductDetailsModal from '../commen/ProductDetailModal';

const ProductListTable: React.FC = () => {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const { data: productData, refetch } = useFetchProductsQuery(sellerId);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); 

  const handleImageClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); 
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
      refetch();
      toast.success(`Product deleted successfully`);
    } catch (error) {
      toast.error('Failed to delete the product. Please try again.');
      console.error('Failed to delete the product:', error);
    }
  };

  return (
    <div className="container font-serif mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-4 sm:mb-0">All Product List</h1>
        <button
          onClick={() => navigate('/profile/seller/addproduct')}
          className="bg-amber-300 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto"
        >
          List Item
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {productData?.products?.length ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-amber-100 text-amber-900 uppercase text-xs sm:text-sm leading-normal">
                <th className="py-3 px-2 sm:px-6 text-left">Product Name & Size</th>
                <th className="py-3 px-2 sm:px-6 text-left">Bid Price</th>
                <th className="py-3 px-2 sm:px-6 text-left">Category</th>
                <th className="py-3 px-2 sm:px-6 text-left">Status</th>
                <th className="py-3 px-2 sm:px-6 text-left">Auction Time</th>
                <th className="py-3 px-2 sm:px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-amber-900 text-xs sm:text-sm font-light">
              {productData.products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-amber-200 hover:bg-amber-50 transition duration-300"
                >
                  <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <img
                          src={product.images[0]}
                          alt={product.itemTitle}
                          width={40}
                          height={40}
                          onClick={() => handleImageClick(product)} 
                          className="rounded-full cursor-pointer"
                        />
                      </div>
                      <span className="font-medium uppercase text-sm">
  {product.itemTitle.length > 20 ? `${product.itemTitle.slice(0, 20)}...` : product.itemTitle}
</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">${product.reservePrice}</td>
                  <td className="py-3 px-2 sm:px-6 text-left uppercase">{product.category.name}</td>
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
                    {product.auctionFormat === 'auction' &&
                    product.auctionStartDateTime &&
                    product.auctionEndDateTime ? (
                      <div className="text-xs">
                        <span>
                          Start: {new Date(product.auctionStartDateTime).toLocaleString()}
                        </span>
                        <br />
                        <span>End: {new Date(product.auctionEndDateTime).toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No Auction</span>
                    )}
                  </td>
                  <td className="py-3 px-2 sm:px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/profile/seller/addproduct/${product._id}`)}
                        className="transform hover:text-amber-600 hover:scale-110 transition duration-300"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id ?? '')}
                        className="transform hover:text-amber-600 hover:scale-110 transition duration-300"
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
          <div className="text-center py-8 text-amber-900">
            <p>No products found. Please add some products.</p>
          </div>
        )}
      </div>

      {/* Modal Component */}
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct} // Pass the selected product to the modal
        />
      )}

      <div className="flex justify-end items-center mt-6 overflow-x-auto">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-amber-200 bg-white text-sm font-medium text-amber-900 hover:bg-amber-50 transition duration-300">
            Previous
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-amber-200 bg-amber-500 text-sm font-medium text-white hover:bg-amber-400 transition duration-300">
            1
          </button>

          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-amber-200 bg-white text-sm font-medium text-amber-900 hover:bg-amber-50 transition duration-300">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductListTable;
