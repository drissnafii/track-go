// services/api.ts — Centralized API Client

import { API_BASE_URL } from "@/constants/api";

interface ApiOptions {
  headers?: Record<string, string>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error ${response.status}: ${error}`);
  }
  return response.json() as Promise<T>;
}

export const apiClient = {
  get: async <T>(endpoint: string, options?: ApiOptions): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    return handleResponse<T>(response);
  },

  post: async <T>(
    endpoint: string,
    data: unknown,
    options?: ApiOptions,
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(
    endpoint: string,
    data: unknown,
    options?: ApiOptions,
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },
};
