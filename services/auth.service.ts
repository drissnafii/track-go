import { Endpoints } from "@/constants/api";
import { apiClient } from "./api";

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  vehicule?: string;
  zone?: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // In a real app, this would be a POST /auth/login
    // For json-server mock, we filter the livreurs resource
    const users = await apiClient.get<User[]>(
      `${Endpoints.LIVREURS}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    );

    if (users.length === 0) {
      throw new Error("Identifiants incorrects");
    }

    return users[0];
  },
};
