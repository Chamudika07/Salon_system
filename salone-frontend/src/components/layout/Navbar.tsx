"use client";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6">
        <Link href="/dashboard" className="font-bold hover:underline">Dashboard</Link>
        <Link href="/bookings" className="hover:underline">Bookings</Link>
        <Link href="/customers" className="hover:underline">Customers</Link>
        <Link href="/employees" className="hover:underline">Employees</Link>
        <Link href="/products" className="hover:underline">Products</Link>
        <Link href="/test" className="hover:underline text-yellow-300">Debug Test</Link>
      </div>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Logout
      </button>
    </nav>
  );
}
