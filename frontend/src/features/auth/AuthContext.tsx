import { createContext, useEffect, useState } from "react";
import api from "@/lib/axios";

type User = {
  id: number;
  username: string;
  name?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  avatar: string | null;
  setUser: (user: User | null) => void;
  loadUser: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      (async () => {
        await loadUser();
      })();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, avatar: user?.avatar || null, setUser, loadUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
