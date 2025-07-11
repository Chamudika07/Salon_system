"use client";
import { useEmployees } from "@/hooks/useEmployees";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const { token, isInitialized } = useAuth();
  const router = useRouter();
  const { employees, loading, error } = useEmployees();

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
      <h1 className="text-2xl font-bold mb-6">All Employees</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {employees && employees.length > 0 ? (
          employees.map((emp) => (
            <li key={emp.id} className="mb-4 border-b pb-2">
              <span className="font-medium">Name:</span> {emp.name} <br />
              <span className="font-medium">Email:</span> {emp.email}
            </li>
          ))
        ) : (
          <li>No employees found</li>
        )}
      </ul>
    </div>
  );
}
