import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decode = jwtDecode(token);
        setUser({
          role: decode.role,
          userId: decode.userId,
          authorId: decode.authorId,
          email: decode.email,
        });
      } else {
        setUser(null);
      }
    };

    updateUser();

    // listen for event changes
    window.addEventListener("storage", updateUser);

    // cleanup changes
    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
