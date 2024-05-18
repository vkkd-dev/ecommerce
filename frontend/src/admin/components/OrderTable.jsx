import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id, orderStatus) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/update-order",
        {
          id,
          orderStatus,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatusToggle = (index) => {
    const updatedOrder = { ...orders[index] };
    const statusShipped = "Shipped";
    const statusDelivered = "Delivered";
    const statusProcessing = "Processing";
    switch (updatedOrder.orderStatus) {
      case "Processing":
        updatedOrder.orderStatus = statusShipped;
        updateOrderStatus(updatedOrder._id, statusShipped);
        break;
      case "Shipped":
        updatedOrder.orderStatus = statusDelivered;
        updateOrderStatus(updatedOrder._id, statusDelivered);
        break;
      case "Delivered":
        updatedOrder.orderStatus = statusProcessing;
        updateOrderStatus(updatedOrder._id, statusProcessing);
        break;
      default:
        updatedOrder.orderStatus = "Processing";
    }
    const newOrders = [...orders];
    newOrders[index] = updatedOrder;
    setOrders(newOrders);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Id</th>
              <th className="py-2 px-4 border-b text-left">Customer</th>
              <th className="py-2 px-4 border-b text-left">Products</th>
              <th className="py-2 px-4 border-b text-left">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Payment Method</th>
              <th className="py-2 px-4 border-b text-left">Payment Status</th>
              <th className="py-2 px-4 border-b text-left">Shipping Address</th>
              <th className="py-2 px-4 border-b text-left">Order Status</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.customer}</td>
                <td className="py-2 px-4 border-b">
                  <ul>
                    {order.products.map((product) => (
                      <li key={product._id}>
                        {product.product} - Quantity: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">{order.totalAmount}</td>
                <td className="py-2 px-4 border-b">{order.paymentMethod}</td>
                <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
                <td className="py-2 px-4 border-b">{order.shippingAddress}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleStatusToggle(index)}
                  >
                    {order.orderStatus}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{order.orderDate}</td>
                <td className="py-2 px-4 border-b">{order.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
