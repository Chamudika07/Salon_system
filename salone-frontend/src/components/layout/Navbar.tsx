import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-6">
      <Link href="/dashboard" className="font-bold hover:underline">Dashboard</Link>
      <Link href="/bookings" className="hover:underline">Bookings</Link>
      <Link href="/employees" className="hover:underline">Employees</Link>
      <Link href="/products" className="hover:underline">Products</Link>
      <Link href="/test" className="hover:underline text-yellow-300">Debug Test</Link>
      {/* Add more links as needed */}
    </nav>
  );
}
