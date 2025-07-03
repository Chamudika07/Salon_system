"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookings } from "@/hooks/useBookings";

export default function DashboardPage() {
  const { token } = useAuth();
  const router = useRouter();
  const { bookings, loading, error } = useBookings();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

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
            {bookings.slice(0, 5).map((booking) => (
              <li key={booking.id} className="mb-2">
                <span className="font-medium">ID:</span> {booking.id} <br />
                <span className="font-medium">Status:</span> {booking.status} <br />
                <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded shadow">Employees</div>
        <div className="bg-white p-6 rounded shadow">Products</div>
      </div>
    </div>
  );
}
