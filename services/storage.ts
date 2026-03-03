import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
} as const;

// Helper to check if we are on web
const isWeb = Platform.OS === "web";

export const storage = {
  /**
   * Saves the auth token securely.
   */
  setToken: async (token: string): Promise<void> => {
    if (isWeb) {
      localStorage.setItem(KEYS.AUTH_TOKEN, token);
      return;
    }
    await SecureStore.setItemAsync(KEYS.AUTH_TOKEN, token);
  },

  /**
   * Retrieves the auth token.
   */
  getToken: async (): Promise<string | null> => {
    if (isWeb) {
      return localStorage.getItem(KEYS.AUTH_TOKEN);
    }
    return await SecureStore.getItemAsync(KEYS.AUTH_TOKEN);
  },

  /**
   * Removes the auth token.
   */
  removeToken: async (): Promise<void> => {
    if (isWeb) {
      localStorage.removeItem(KEYS.AUTH_TOKEN);
      return;
    }
    await SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN);
  },

  /**
   * Saves user data.
   */
  setUserData: async (userData: any): Promise<void> => {
    const data = JSON.stringify(userData);
    if (isWeb) {
      localStorage.setItem(KEYS.USER_DATA, data);
      return;
    }
    await SecureStore.setItemAsync(KEYS.USER_DATA, data);
  },

  /**
   * Retrieves user data.
   */
  getUserData: async (): Promise<any | null> => {
    const data = isWeb
      ? localStorage.getItem(KEYS.USER_DATA)
      : await SecureStore.getItemAsync(KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Clears all session data.
   */
  clearSession: async (): Promise<void> => {
    if (isWeb) {
      localStorage.removeItem(KEYS.AUTH_TOKEN);
      localStorage.removeItem(KEYS.USER_DATA);
      return;
    }
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN),
      SecureStore.deleteItemAsync(KEYS.USER_DATA),
    ]);
  },
};
