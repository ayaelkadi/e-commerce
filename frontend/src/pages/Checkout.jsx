import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
  const { cart } = useCart();
const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    alert("Order placed successfully 🎉");

    localStorage.removeItem("cart");
    window.location.href = "/";
  };

  const placeOrder = async () => {
  try {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        total,
      }),
    });

    navigate("/success");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          💳 Checkout
        </h2>

        {/* Form */}
        <div className="space-y-3">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

        </div>

        {/* Summary */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">Order Summary</h3>

          {cart.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span>{item.name} x{item.qty}</span>
              <span>${item.price * item.qty}</span>
            </div>
          ))}

          <h3 className="mt-3 font-bold">
            Total: ${total}
          </h3>
        </div>

        {/* Button */}
        {/* <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          Place Order
        </button> */}
<button onClick={placeOrder}>
  Place Order
</button>
      </div>

    </div>
  );
}