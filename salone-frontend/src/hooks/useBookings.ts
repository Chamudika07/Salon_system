import { useEffect, useState } from "react";
import api from "@/lib/api";

export type Booking = {
  id: number;
  employee_id: number;
  customer_id: number;
  date: string;
  status: string;
  // Add more fields as needed
};

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/bookings")
      .then(res => setBookings(res.data))
      .catch(err => setError("Failed to fetch bookings"))
      .finally(() => setLoading(false));
  }, []);

  return { bookings, loading, error };
}