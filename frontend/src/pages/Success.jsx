export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        ✅ Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mb-4">
        Thank you for your purchase 🎉
      </p>

      <a
        href="/"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </a>
    </div>
  );
}