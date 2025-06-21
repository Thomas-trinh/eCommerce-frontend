import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/checkToken", { credentials: "include" })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.username) {
          setIsLoggedIn(true);
          setIsAdmin(data.username === "admin");
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
