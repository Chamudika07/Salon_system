"use client";
import { useEmployees } from "@/hooks/useEmployees";

export default function EmployeesPage() {
  const { employees, loading, error } = useEmployees();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Employees</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {employees.map((emp) => (
          <li key={emp.id} className="mb-4 border-b pb-2">
            <span className="font-medium">Name:</span> {emp.name} <br />
            <span className="font-medium">Email:</span> {emp.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
