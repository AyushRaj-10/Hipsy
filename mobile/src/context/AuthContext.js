import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  saveToken,
  getToken,
  removeToken,
} from "../storage/tokenStorage";
import { getProfile } from "../api/user.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await getToken();

        if (storedToken) {
          setToken(storedToken);
          const profile = await getProfile();
          setUser(profile);
        }
      } catch (error) {
        console.log("Bootstrap error:", error);
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          await removeToken();
          setToken(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  // Login
  const login = async (data) => {
    try {
      if (!data || !data.token) {
        throw new Error("Invalid login response");
      }

      setUser(data.user);
      setToken(data.token);

      await saveToken(data.token);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await removeToken();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
