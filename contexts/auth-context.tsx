import { authService } from "@/services/auth.service";
import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login(email, password);
      // In a real app, you would also save a JWT token here
      setUser({
        id: userData.id,
        email: userData.email,
        nom: userData.nom,
        prenom: userData.prenom,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
