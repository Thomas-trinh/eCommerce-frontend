import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string | null;
  loading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
  setUsername: (value: string | null) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/user/checkToken", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const user = data?.user;
        if (user) {
          setIsLoggedIn(true);
          setIsAdmin(user.isAdmin);
          setUsername(user.username);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setUsername(null);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUsername(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, username, loading, setIsLoggedIn, setIsAdmin, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
