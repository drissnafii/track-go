// services/api.ts — Centralized API Client

import { API_BASE_URL, API_TOKEN } from "@/constants/api";

interface ApiOptions {
  headers?: Record<string, string>;
}

function buildHeaders(options?: ApiOptions): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (API_TOKEN && !headers.Authorization) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  return headers;
}

if (!API_TOKEN) {
  console.warn(
    "API_TOKEN is not set. Authenticated requests will be sent without Authorization header.",
  );
}

async function handleResponse<T>(response: Response): Promise<T> {
  const cloned = response.clone();
  let responseBody: string | undefined;

  try {
    responseBody = await cloned.text();
  } catch {
    responseBody = undefined;
  }

  console.log("API Response", {
    url: response.url,
    status: response.status,
    ok: response.ok,
    body: responseBody,
  });

  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${responseBody ?? ""}`);
  }
  return response.json() as Promise<T>;
}

export const apiClient = {
  get: async <T>(endpoint: string, options?: ApiOptions): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = buildHeaders(options);

    console.log("API Request", {
      method: "GET",
      url,
      headers,
    });

    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    return handleResponse<T>(response);
  },

  post: async <T>(
    endpoint: string,
    data: unknown,
    options?: ApiOptions,
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = buildHeaders(options);

    console.log("API Request", {
      method: "POST",
      url,
      headers,
      body: data,
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(
    endpoint: string,
    data: unknown,
    options?: ApiOptions,
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = buildHeaders(options);

    console.log("API Request", {
      method: "PATCH",
      url,
      headers,
      body: data,
    });

    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },
};
