import { useEffect, useState } from "react";
import api from "@/lib/api";

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  // Add more fields as needed
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Product[]>("/products")
      .then(res => {
        setProducts(res.data as Product[]);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
