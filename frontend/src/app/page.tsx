import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <section className="bg-primaryGreen rounded-xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Salone System</h1>
          <p className="text-primaryWhite/80 text-lg max-w-xl">
            Manage your salon&apos;s bookings, customers, employees, products, sales, and payments all in one place.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          {/* Placeholder for a dashboard image or logo */}
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primaryBlack border border-primaryGreen rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-primaryWhite/70 mt-2">Bookings Today</span>
        </div>
        <div className="bg-primaryBlack border border-primaryGreen rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-primaryWhite/70 mt-2">Active Customers</span>
        </div>
        <div className="bg-primaryBlack border border-primaryGreen rounded-lg p-6 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-primaryWhite/70 mt-2">Employees Working</span>
        </div>
      </section>

      {/* Actions Section */}
      <section className="flex flex-wrap gap-4 mt-8">
        <a href="/bookings" className="bg-primaryGreen text-primaryWhite px-6 py-3 rounded-lg font-semibold shadow hover:bg-primaryGreen/90 transition">New Booking</a>
        <a href="/customers" className="bg-primaryWhite text-primaryBlack px-6 py-3 rounded-lg font-semibold shadow hover:bg-primaryWhite/90 transition">View Customers</a>
        <a href="/employees" className="bg-primaryWhite text-primaryBlack px-6 py-3 rounded-lg font-semibold shadow hover:bg-primaryWhite/90 transition">View Employees</a>
      </section>
    </div>
  );
}
