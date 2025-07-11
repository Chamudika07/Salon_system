"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookings } from "@/hooks/useBookings";
import { useEmployees } from "@/hooks/useEmployees";
import { useProducts } from "@/hooks/useProducts";

export default function DashboardPage() {
  const { token, isInitialized } = useAuth();
  const router = useRouter();
  const { bookings, loading, error } = useBookings();
  const { employees, loading: loadingEmployees, error: errorEmployees } = useEmployees();
  const { products, loading: loadingProducts, error: errorProducts } = useProducts();

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
      <h1 className="text-3xl font-bold mb-6">Salon Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          <ul>
            {bookings && bookings.length > 0 ? (
              bookings.slice(0, 5).map((booking) => (
                <li key={booking.id} className="mb-2">
                  <span className="font-medium">ID:</span> {booking.id} <br />
                  <span className="font-medium">Status:</span> {booking.status} <br />
                  <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleString()}
                </li>
              ))
            ) : (
              <li>No bookings found</li>
            )}
          </ul>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Employees</h2>
          {loadingEmployees && <div>Loading...</div>}
          {errorEmployees && <div className="text-red-500">{errorEmployees}</div>}
          <ul>
            {employees && employees.length > 0 ? (
              employees.slice(0, 5).map((emp) => (
                <li key={emp.id} className="mb-2">
                  <span className="font-medium">Name:</span> {emp.name} <br />
                  <span className="font-medium">Email:</span> {emp.email}
                </li>
              ))
            ) : (
              <li>No employees found</li>
            )}
          </ul>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {loadingProducts && <div>Loading...</div>}
          {errorProducts && <div className="text-red-500">{errorProducts}</div>}
          <ul>
            {products && products.length > 0 ? (
              products.slice(0, 5).map((prod) => (
                <li key={prod.id} className="mb-2">
                  <span className="font-medium">Name:</span> {prod.name} <br />
                  <span className="font-medium">Price:</span> ${prod.price}
                </li>
              ))
            ) : (
              <li>No products found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
