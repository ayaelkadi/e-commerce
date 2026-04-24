import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow p-4 rounded mb-4"
        >
          <p className="font-bold mb-2">
            Order ID: {order._id}
          </p>

          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>${item.price * item.qty}</span>
            </div>
          ))}

          <p className="mt-2 font-bold text-blue-500">
            Total: ${order.total}
          </p>
        </div>
      ))}
    </div>
  );
}