import { useEffect, useState } from "react";
import api from "../lib/api";

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  // Add more fields as needed
};

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = () => {
    console.log("Fetching customers...");
    api.get<Customer[]>("/customers")
      .then(res => {
        console.log("Customers response:", res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Customers error:", err);
        setError("Failed to fetch customers");
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, loading, error, refetch: fetchCustomers };
}