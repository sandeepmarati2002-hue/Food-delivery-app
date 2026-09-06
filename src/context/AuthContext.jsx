import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken, removeAuthToken, getAuthToken } from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getAuthToken());
  const [loading, setLoading] = useState(true);

  // Check stored auth token on startup
  useEffect(() => {
    async function loadUser() {
      const storedToken = getAuthToken();
      if (storedToken) {
        try {
          const res = await api.getProfile();
          setUser(res.user);
        } catch (err) {
          console.error('Failed to load profile from backend:', err);
          removeAuthToken();
          setToken(null);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    // This will throw if credentials are wrong or server is unreachable.
    // The caller (AuthModal) is responsible for catching and displaying the error.
    const res = await api.login({ email, password });
    setAuthToken(res.token);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const signup = async (email, password, name, role = 'CUSTOMER') => {
    const res = await api.signup({ email, password, name, role });
    setAuthToken(res.token);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    removeAuthToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
