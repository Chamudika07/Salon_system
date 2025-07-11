"use client";
import { useBookings } from "@/hooks/useBookings";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const { token, isInitialized } = useAuth();
  const router = useRouter();
  const { bookings, loading, error } = useBookings();

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
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id} className="mb-4 border-b pb-2">
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
  );
}
