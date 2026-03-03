// constants/api.ts — API Configuration

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||"http://172.16.9.108:3000";

export const Endpoints = {
  AUTH_LOGIN: "/auth/login",
  LIVREURS: "/livreurs",
  TOURNEES: "/tournees",
  COLIS: "/colis",
  PROOFS: "/proofs",
  INCIDENTS: "/incidents",
} as const;
