"use client";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const { token, isInitialized } = useAuth();
  const router = useRouter();
  const { products, loading, error } = useProducts();

  useEffect(() => {
    if (isInitialized && !token) {
      router.push("/login");
    }
  }, [token, router, isInitialized]);

  // Show loading while auth is initializing
  if (!isInitialized) {
    return <div className="p-8">Loading...</div>;
  }

  // Don't render anything if not authenticated
  if (!token) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {products && products.length > 0 ? (
          products.map((prod) => (
            <li key={prod.id} className="mb-4 border-b pb-2">
              <span className="font-medium">Name:</span> {prod.name} <br />
              <span className="font-medium">Price:</span> ${prod.price} <br />
              <span className="font-medium">Quantity:</span> {prod.quantity}
            </li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
}
