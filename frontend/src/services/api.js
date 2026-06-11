const API_URL = "https://e-commerce-5xtf.vercel.app/api";

// 📥 get products
export const getProducts = async (search = "") => {
  const res = await fetch(`${API_URL}/products?search=${search}`);
  return res.json();
};

// 📄 get product by id
export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
};