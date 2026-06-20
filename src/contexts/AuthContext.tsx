import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const DEFAULT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
const AUTH_KEY = 'bouchangour-admin-auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredPassword(): string {
  try {
    return localStorage.getItem('bouchangour-admin-password') || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_KEY, isAuthenticated ? 'true' : 'false');
    } catch {}
  }, [isAuthenticated]);

  const login = (password: string): boolean => {
    const stored = getStoredPassword();
    if (password === stored) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    const stored = getStoredPassword();
    if (oldPassword !== stored) return false;
    try {
      localStorage.setItem('bouchangour-admin-password', newPassword);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
