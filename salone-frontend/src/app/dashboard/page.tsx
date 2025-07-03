"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null; // Or a loading spinner

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Your dashboard content */}
    </div>
  );
}
