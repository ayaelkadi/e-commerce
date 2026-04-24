import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // 🔥 مهم
  const { wishlist, toggleWishlist } = useWishlist();

  const isLiked = wishlist.find((item) => item._id === product._id);
  return (
    <div
      className="bg-white rounded-2xl shadow 
hover:shadow-2xl 
transition duration-300 
hover:-translate-y-2 hover:scale-105 
overflow-hidden relative"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover rounded-lg mb-2 hover:scale-105 transition"
      />
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow transition transform hover:scale-125"
      >
        {isLiked ? "❤️" : "🤍"}
      </button>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>

        <div className="flex items-center mb-2 text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>{product.rating >= star ? "★" : "☆"}</span>
          ))}
          <span className="ml-2 text-gray-500 text-sm">({product.rating})</span>
        </div>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">
            ${product.price}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition hover:scale-110"
            >
              Add
            </button>

            <Link to={`/product/${product._id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
