import { useEffect, useState } from "react";
import api from "../lib/api";

export type Employee = {
  id: number;
  name: string;
  email: string;
  role?: string;
  // Add more fields as needed
};

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = () => {
    api.get<Employee[]>("/employees")
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch employees");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, refetch: fetchEmployees };
}
