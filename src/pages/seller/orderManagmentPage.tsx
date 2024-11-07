import React, { useEffect, useState } from 'react';
import { useFetchOrdersQuery, useUpdateOrderStatusMutation } from '../../services/apis/sellerApi';
import { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';

interface ShippingAddress {
  fullName?: string;
  phoneNumber?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface Order {
  id: string;
  buyerId: string;
  productId: string;
  productName?: string;
  productImage?: string;
  sellerId: string;
  orderDate: string;
  orderStatus: 'pending' | 'completed' | 'canceled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress?: ShippingAddress;
  bidAmount: number;
}

interface OrderResponse {
  success: boolean;
  message: string;
  orders: Order[];
}

export default function OrderManagementTable() {
  const userId = useSelector((state: RootState) => state.Seller.sellerId);
  const { data: responseData, isLoading, isError, error } = useFetchOrdersQuery(userId);
  console.log(responseData, 'haiii this is the response data ');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  useEffect(() => {
    if (responseData && responseData.status === 200 && Array.isArray(responseData.orders)) {
      const formattedOrders = responseData.orders.map((order: any) => ({
        id: order._id,
        buyerId: order.buyerId.name,
        productId: order.productId.itemTitle,
        productName: order.productId.itemTitle,
        productImage: order.productId.images[0],
        sellerId: order.sellerId,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        bidAmount: order.bidAmount,
      }));
      setOrders(formattedOrders);
    } else {
      console.error('Unexpected response format:', responseData);
    }
  }, [responseData]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    console.error('Error fetching orders:', error);
    return <div>Error loading orders.</div>;
  }

  async function handleStatusChange(
    id: string,
    newStatus: 'pending' | 'completed' | 'canceled',
  ): Promise<void> {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, orderStatus: newStatus } : order)),
    );

    try {
      console.log(setOrders, newStatus, 'id, newStatus');
      const result = await updateOrderStatus({ orderId: id, status: newStatus });
      console.log(result, 'result');
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  }

  function handleSelectOrder(id: string) {
    setSelectedOrderId(id);
  }

  return (
    <div className="container mx-auto p-6 bg-amber-50">
      <h1 className="text-3xl font-serif text-amber-900 mb-6 text-center">Order Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-4">
        <thead>
      <tr className="bg-amber-100">
        <th className="p-2 text-left font-serif text-amber-900 border border-amber-200 text-sm">#</th>
        <th className="p-2 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Order ID
        </th>
        <th className="p-2 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Buyer Name
        </th>
        <th className="p-3 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Product
        </th>
        <th className="p-3 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Bid Amount
        </th>
        <th className="p-3 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Order Date
        </th>
        <th className="p-3 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Payment Status
        </th>
        <th className="p-3 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Status
        </th>
        <th className="p-3 text-left font-serif text-amber-900 border border-amber-200 text-sm">
          Actions
        </th>
      </tr>
    </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order.id} className="bg-white hover:bg-amber-50 transition-colors">
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  {indexOfFirstOrder + index + 1} {/* Order Number */}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  #{order.id.slice(0, 4)}****{order.id.slice(-4)}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  {order.buyerId}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-16 h-16 object-cover"
                  />
                  <div>{order.productName}</div>
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  ${order.bidAmount}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  {order.orderDate}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.paymentStatus === 'pending'
                        ? 'bg-red-200 text-red-800'
                        : order.paymentStatus === 'completed'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.orderStatus === 'pending'
                        ? 'bg-amber-200 text-amber-800'
                        : order.orderStatus === 'completed'
                          ? 'bg-amber-300 text-amber-900'
                          : 'bg-amber-400 text-amber-900'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as 'pending' | 'completed' | 'canceled',
                      )
                    }
                    className="bg-amber-50 border border-amber-200 rounded px-2 py-1 text-amber-900"
                  >
                    <option value="pending">pending</option>
                    <option value="shipped">shipped</option>
                    <option value="deliverd">deliverd</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

          {/* <tbody>
            
            {currentOrders.map((order) => (
              <tr key={order.id} className="bg-white hover:bg-amber-50 transition-colors">
             
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  #{order.id}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  {order.buyerId}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  {order.productId}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  {order.orderDate}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.orderStatus === 'pending'
                        ? 'bg-amber-200 text-amber-800'
                        : order.orderStatus === 'completed'
                          ? 'bg-amber-300 text-amber-900'
                          : 'bg-amber-400 text-amber-900'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  {order.shippingAddress ? (
                    <div>
                      <div>{order.shippingAddress.fullName}</div>
                      <div>
                        {order.shippingAddress.streetAddress}, {order.shippingAddress.city},{' '}
                        {order.shippingAddress.state}, {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                      </div>
                      <div>Phone: {order.shippingAddress.phoneNumber}</div>
                    </div>
                  ) : (
                    <div>No Address Provided</div>
                  )}
                </td>
                <td className="p-3 font-serif text-amber-900 border border-amber-200">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as 'pending' | 'completed' | 'canceled',
                      )
                    }
                    className="bg-amber-50 border border-amber-200 rounded px-2 py-1 text-amber-900"
                  >
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                    <option value="canceled">canceled</option>
                    
                  </select>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              } ${i === 0 ? 'rounded-l-md' : ''} ${
                i === Math.ceil(orders.length / ordersPerPage) - 1 ? 'rounded-r-md' : ''
              } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
