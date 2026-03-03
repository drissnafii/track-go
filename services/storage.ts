import * as SecureStore from "expo-secure-store";

const KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
} as const;

export const storage = {
  /**
   * Saves the auth token securely.
   */
  setToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(KEYS.AUTH_TOKEN, token);
  },

  /**
   * Retrieves the auth token.
   */
  getToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(KEYS.AUTH_TOKEN);
  },

  /**
   * Removes the auth token.
   */
  removeToken: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN);
  },

  /**
   * Saves user data.
   */
  setUserData: async (userData: any): Promise<void> => {
    await SecureStore.setItemAsync(KEYS.USER_DATA, JSON.stringify(userData));
  },

  /**
   * Retrieves user data.
   */
  getUserData: async (): Promise<any | null> => {
    const data = await SecureStore.getItemAsync(KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Clears all session data.
   */
  clearSession: async (): Promise<void> => {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN),
      SecureStore.deleteItemAsync(KEYS.USER_DATA),
    ]);
  },
};
