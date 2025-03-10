"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      setToken("Bearer " + token);
    }
  }, []);
  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      setUserID(userID);
      console.log("userID:", userID);
    }
  }, []);
  const login = (token) => {
    localStorage.getItem("accessToken", token, {
      expires: 1, // Set expiration in days
      secure: true,
      sameSite: "Strict",
    });
    setIsLoggedIn(true);
  };
  

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout , userID, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
