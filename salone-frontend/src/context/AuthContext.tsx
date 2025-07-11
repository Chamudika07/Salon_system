"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isInitialized: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // On mount, check for token in localStorage
      const storedToken = localStorage.getItem("token");
      console.log("AuthContext - Stored token:", storedToken ? "Present" : "Missing");
      if (storedToken) {
        setToken(storedToken);
        // Optionally, fetch user info from backend using the token
        // For now, you can decode the JWT or store user info in localStorage after login
      }
      setIsInitialized(true);
    }
  }, []);

  const login = (newToken: string) => {
    console.log("AuthContext - Login called with token:", newToken ? "Present" : "Missing");
    setToken(newToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem("token", newToken);
      console.log("AuthContext - Token saved to localStorage");
    }
    // Optionally, fetch user info here
  };

  const logout = () => {
    console.log("AuthContext - Logout called");
    setToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
