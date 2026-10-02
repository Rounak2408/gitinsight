import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authApi } from '../services/api/gitInsightServices';
import { isMockMode } from '../services/api/apiClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mockMode: boolean;
  setMockModeState: (enabled: boolean) => void;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mockMode, setMockMode] = useState<boolean>(isMockMode());

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('gitinsight_token');
        if (storedToken || isMockMode()) {
          const fetchedUser = await authApi.getCurrentUser();
          setUser(fetchedUser);
        }
      } catch (e) {
        console.error('Auth initialization error:', e);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleSetMockMode = (enabled: boolean) => {
    setMockMode(enabled);
    localStorage.setItem('gitinsight_mock_mode', String(enabled));
  };

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(email);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, username: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.register(name, email, username);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('gitinsight_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        mockMode,
        setMockModeState: handleSetMockMode,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
