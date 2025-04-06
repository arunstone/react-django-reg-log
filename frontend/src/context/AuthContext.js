// import React, { createContext, useState, useEffect } from "react";
// import { login, refreshToken } from "../api/auth";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(localStorage.getItem("access") || "");

//   useEffect(() => {
//     if (accessToken) {
//       setUser({ username: localStorage.getItem("username") });
//     }
//   }, [accessToken]);

//   const handleLogin = async (credentials) => {
//     try {
//       const response = await login(credentials);
//       setAccessToken(response.data.access);
//       localStorage.setItem("access", response.data.access);
//       localStorage.setItem("refresh", response.data.refresh);
//       localStorage.setItem("username", credentials.username);
//       setUser({ username: credentials.username });
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const handleLogout = () => {
//     setAccessToken("");
//     setUser(null);
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("username");
//   };

//   return (
//     <AuthContext.Provider value={{ user, accessToken, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import { login, refreshToken } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access") || "");

  useEffect(() => {
    if (accessToken) {
      setUser({ username: localStorage.getItem("username") });

      // Refresh token every 4 minutes
      const interval = setInterval(async () => {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
          try {
            const response = await refreshToken(refresh);
            setAccessToken(response.data.access);
            localStorage.setItem("access", response.data.access);
          } catch (error) {
            console.error("Session expired, logging out...");
            handleLogout();
          }
        }
      }, 240000); // 4 minutes

      return () => clearInterval(interval);
    }
  }, [accessToken]);

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      setAccessToken(response.data.access);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("username", credentials.username);
      setUser({ username: credentials.username });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    setAccessToken("");
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
