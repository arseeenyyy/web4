import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("id"); 
    if (token) {
      setIsAuthenticated(true);
      setUser(token);
    }
  }, []);

  const loginUser = (id) => {
    localStorage.setItem("id", id); 
    setIsAuthenticated(true);
    setUser(id);
  };

  const logoutUser = () => {
    localStorage.removeItem("id"); 
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;