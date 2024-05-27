"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: false,
  login: () => {},
  logout: () => {},
});
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => setUser(!!localStorage.getItem("user")), []);

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
