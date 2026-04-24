import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // 👇 Loading
  if (!product) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* 👇 الصورة الكبيرة */}
    <img
      src={product.images?.[0]}
      className="w-64 mb-4 rounded"
    />

    {/* 👇 هنا تضع الصور الصغيرة */}
    <div className="flex gap-2 mb-4">
      {product.images.map((img) => (
        <img
          key={img}
          src={img}
          className="w-20 h-20 object-cover rounded cursor-pointer"
        />
      ))}
    </div>

      <h1 className="text-2xl font-bold">{product.title}</h1>

      <p className="text-gray-500">{product.description}</p>

      <p className="text-blue-500 font-bold mt-2">
        ${product.price}
      </p>
    </div>
  );
}