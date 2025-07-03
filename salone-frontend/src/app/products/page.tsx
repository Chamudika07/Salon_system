"use client";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {products.map((prod) => (
          <li key={prod.id} className="mb-4 border-b pb-2">
            <span className="font-medium">Name:</span> {prod.name} <br />
            <span className="font-medium">Price:</span> ${prod.price} <br />
            <span className="font-medium">Quantity:</span> {prod.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
