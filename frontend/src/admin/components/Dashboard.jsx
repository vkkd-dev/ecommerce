import { useEffect, useState } from "react";
import { dummyUsers } from "../../data/dummyUser";
import { dummyOrders } from "../../data/dummyOrders";
import axios from "axios";

const UsersTable = ({ users }) => {
  // Calculate total number of users
  const totalUsers = users.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">
        Total Customers
      </h2>
      <div className="p-6">
        <p className="text-lg font-semibold">Total Users: {totalUsers}</p>
      </div>
    </div>
  );
};

const ProductsTable = ({ products }) => {
  // Calculate total number of products
  const totalProducts = products.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">
        Total Products
      </h2>
      <div className="p-6">
        <p className="text-lg font-semibold">Total Products: {totalProducts}</p>
      </div>
    </div>
  );
};

const OrdersTable = ({ orders }) => {
  // Calculate total number of orders
  const totalOrders = orders.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">Total Orders</h2>
      <div className="p-6">
        <p className="text-lg font-semibold">Total Orders: {totalOrders}</p>
      </div>
    </div>
  );
};

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-4 flex flex-wrap justify-around">
        <div className="max-w-md mb-8">
          <UsersTable users={dummyUsers} />
        </div>
        <div className="max-w-md mb-8">
          <ProductsTable products={products} />
        </div>
        <div className="max-w-md mb-8">
          <OrdersTable orders={dummyOrders} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
