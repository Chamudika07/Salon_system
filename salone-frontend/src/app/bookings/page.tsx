"use client";
import { useBookings } from "@/hooks/useBookings";

export default function BookingsPage() {
  const { bookings, loading, error } = useBookings();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} className="mb-4 border-b pb-2">
            <span className="font-medium">ID:</span> {booking.id} <br />
            <span className="font-medium">Status:</span> {booking.status} <br />
            <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
