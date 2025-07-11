"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function TestPage() {
  const { token, isInitialized } = useAuth();
  const [testResult, setTestResult] = useState<string>("");
  const [apiTestResult, setApiTestResult] = useState<string>("");

  useEffect(() => {
    // Test localStorage
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      setTestResult(`LocalStorage token: ${storedToken ? "Present" : "Missing"}`);
    }
  }, []);

  const testApi = async () => {
    try {
      const response = await api.get("/test");
      setApiTestResult(`API Test Success: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setApiTestResult(`API Test Error: ${error}`);
    }
  };

  const testAuthApi = async () => {
    try {
      const response = await api.get("/bookings");
      setApiTestResult(`Auth API Test Success: ${JSON.stringify(response.data)}`);
    } catch (error: unknown) {
      const err = error as { response?: { status?: number; data?: { detail?: string } }; message?: string };
      setApiTestResult(`Auth API Test Error: ${err.response?.status} - ${err.response?.data?.detail || err.message}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Test Page</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Auth Context State:</h2>
          <p>Is Initialized: {isInitialized ? "Yes" : "No"}</p>
          <p>Token: {token ? "Present" : "Missing"}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">LocalStorage Test:</h2>
          <p>{testResult}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">API Tests:</h2>
          <button 
            onClick={testApi}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Test Public API
          </button>
          <button 
            onClick={testAuthApi}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Test Auth API
          </button>
          <div className="mt-2">
            <p className="text-sm">{apiTestResult}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 