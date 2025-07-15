import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const STORAGE_KEY = "hackernews-user";

// Generate a placeholder user from email
export function createUserFromEmail(email: string): User {
  const name = email.split("@")[0];
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    id: crypto.randomUUID(),
    name: formattedName,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=ea580c&color=fff&size=32`,
  };
}

// Save user to localStorage
export function saveUser(user: User): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// Get user from localStorage
export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Remove user from localStorage
export function removeUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = getStoredUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    const newUser = createUserFromEmail(email);
    saveUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for auth state management
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}