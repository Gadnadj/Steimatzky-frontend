import React from "react";
import { useGetOrdersByEmailQuery } from "../../redux/features/cart/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // Assurez-vous d'avoir react-router-dom installé

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersByEmailQuery(currentUser.email);

  if (isError) return <div>Error fetching orders ...</div>;
  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="border-b mb-4 pb-4">
              <p className="p-1 bg-secondary text-white w-10 rounded mb-1">
                # {index + 1}
              </p>
              <h2 className="font-bold">Order ID: {order._id}</h2>
              <p className="text-gray-600">Name: {order.name}</p>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <h3 className="font-semibold mt-2">Products:</h3>
              <ul>
                {order.productIds.map((product) => (
                  <li key={product._id} className="flex items-center mb-2 ">
                    <Link
                      to={`/books/${product._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
