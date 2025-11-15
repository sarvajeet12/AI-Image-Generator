import React, { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "@/lib/api.js";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await get("/api/users/me");
      setUser(data);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const loginWithGoogle = () => {
    const base = import.meta.env.VITE_API_BASE || "http://localhost:5000";
    try {
      // mark that the user initiated a login so we can show a success toast after redirect
      localStorage.setItem("justLoggedIn", "1");
    } catch (e) {
      // ignore
    }
    window.location.href = `${base}/api/auth/google`;
  };

  useEffect(() => {
    // show a success toast if the user just logged in via Google
    if (user) {
      try {
        const flag = localStorage.getItem("justLoggedIn");
        if (flag) {
          toast.success("Logged in successfully");
          localStorage.removeItem("justLoggedIn");
        }
      } catch (e) {
        // ignore
      }
    }
  }, [user]);

  const logout = async () => {
    await post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, refresh, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
