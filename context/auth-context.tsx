import { storage } from "@/services/storage";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  signIn: (token: string, user: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // @ts-ignore - segments might not be typed yet for new (auth) group
    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      // Redirect to login if NOT authenticated and NOT in auth group
      // @ts-ignore - route might not be typed yet
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      // @ts-ignore - route might not be typed yet
      router.replace("/(tabs)");
    }
  }, [token, segments, isLoading, router]);

  const loadSession = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        storage.getToken(),
        storage.getUserData(),
      ]);
      setToken(storedToken);
      setUser(storedUser);
    } catch (e) {
      console.error("Failed to load session", e);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (newToken: string, newUser: any) => {
    await storage.setToken(newToken);
    await storage.setUserData(newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const signOut = async () => {
    await storage.clearSession();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
