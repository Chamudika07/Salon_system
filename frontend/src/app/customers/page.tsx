import React, { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";

interface Customer {
  id: number;
  name: string;
  email: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiRequest<Customer[]>("/api/customers")
      .then(setCustomers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!loading && !error && (
        <table className="min-w-full bg-primaryBlack border border-primaryGreen rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-primaryGreen text-left">ID</th>
              <th className="py-2 px-4 border-b border-primaryGreen text-left">Name</th>
              <th className="py-2 px-4 border-b border-primaryGreen text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-primaryGreen/10">
                <td className="py-2 px-4 border-b border-primaryGreen">{customer.id}</td>
                <td className="py-2 px-4 border-b border-primaryGreen">{customer.name}</td>
                <td className="py-2 px-4 border-b border-primaryGreen">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
