import React, {
  createContext,
  useEffect,
  useState
} from "react";

import {
  saveToken,
  removeToken,
  getToken
} from "../storage/tokenStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const bootstrapSession = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log(error);
      }
    };

    bootstrapSession();
  }, []);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    saveToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};