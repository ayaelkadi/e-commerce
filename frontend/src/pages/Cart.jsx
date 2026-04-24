import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Cart</h2>

      {cart.length === 0 && <p className="text-gray-500">Cart is empty</p>}

      <div className="space-y-3">
       {cart.map((item) => (
  <div
    key={item._id}
    className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-3"
  >

    {/* Left */}
    <div>
      <p className="font-bold">{item.name}</p>

      {/* 🔥 هنا + و - */}
      <div className="flex items-center gap-2 mt-2">

        <button
          onClick={() => decreaseQty(item._id)}
          className="bg-gray-200 px-2 rounded"
        >
          -
        </button>

        <span>{item.qty}</span>

        <button
          onClick={() => increaseQty(item._id)}
          className="bg-gray-200 px-2 rounded"
        >
          +
        </button>

      </div>
    </div>

    {/* Right */}
    <div className="text-right">
      <p className="font-bold">
        ${item.price * item.qty}
      </p>

      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-500 text-sm"
      >
        Remove
      </button>
    </div>

  </div>
))}
      </div>

      <h3 className="mt-6 text-xl font-bold">Total: ${total}</h3>
      <Link to="/checkout">
        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
          Checkout
        </button>
      </Link>
    </div>
  );
}
