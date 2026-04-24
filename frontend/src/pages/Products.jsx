import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
    // 👇 هنا تكتب الفلترة
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getProducts(search);
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // نحول الشكل ليتوافق مع مشروعك
const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const formatted = data.products.map((item) => ({
    _id: item.id,
    name: item.title,
    description: item.description,
    price: item.price,
    image: item.images[0], // 🔥 أهم سطر
    rating: item.rating
  }));

  setProducts(formatted);
};
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          Discover Amazing Products 🛍️
        </h1>

        <p className="text-teal-500">Best deals. Best quality. Shop now.</p>
      </div>

      {/* Search */}
     <div className="flex gap-2 mb-6">
        <input
          placeholder="🔍 Search products..."
          className="flex-1 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={fetchProducts}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-full"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">No products found</p>
      )}

      {/* Products */}
      {!loading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
