import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart, clearCart } = useCart();
const [user, setUser] = useState(null);
const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const token = localStorage.getItem("token");
useEffect(() => {
  const fetchUser = async () => {
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUser(data);
  };

  fetchUser();
}, [token]);
const handleLogout = () => {
  localStorage.removeItem("token");
  clearCart(); // 🔥 هذا هو الحل
  navigate("/");
};
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">Aya's store</h1>

<div className="flex items-center gap-6">

  <Link to="/">Products</Link>

 <Link to="/cart" className="relative">
  🛒

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
      {cartCount}
    </span>
  )}
</Link>

  {/* 👇 زر Orders */}
{token && (
  <Link to="/orders">
    <button className="bg-purple-500 text-white px-3 py-1 rounded">
      Orders
    </button>
  </Link>
)}

  {token ? (
    <>
    <Link to="/profile">
  <span className="cursor-pointer font-semibold">
    👤 {user?.name}
  </span>
</Link>

  <button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
>
  Logout
</button>
    </>
  ) : (
    <>
      <Link to="/login">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Login
        </button>
      </Link>

      <Link to="/register">
        <button className="bg-green-500 text-white px-3 py-1 rounded">
          Register
        </button>
      </Link>
    </>
  )}

</div>
      </div>
    </div>
  );
}
