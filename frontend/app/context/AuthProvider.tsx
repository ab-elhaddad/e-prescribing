"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

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

  useEffect(() => setUser(!!Cookies.get('authorization')), []);

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
