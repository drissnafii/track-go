// constants/api.ts — API Configuration

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

// Optional static token for authenticated requests.
// Set EXPO_PUBLIC_API_TOKEN in your .env to enable this.
export const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN || 'token';

export const Endpoints = {
  AUTH_LOGIN: "/auth/login",
  LIVREURS: "/livreurs",
  TOURNEES: "/tournees",
  COLIS: "/colis",
  PROOFS: "/proofs",
  INCIDENTS: "/incidents",
} as const;
