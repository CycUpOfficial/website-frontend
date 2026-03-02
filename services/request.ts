import type { ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
};

export function buildQuery(
  params?: Record<string, string | number | boolean | undefined | null>,
) {
  if (!params) {
    return "";
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function requestJson<T>(
  path: string,
  options: RequestInit,
): Promise<ApiResponse<T>> {
  if (!API_URL) {
    return {
      success: false,
      data: null as T,
      error: "API URL is not configured.",
    };
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers ?? {}),
      },
      credentials: "include",
    });
    let payload: any = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      return {
        success: false,
        data: null as T,
        error:
          payload?.message || `Request failed with status ${response.status}.`,
      };
    }

    return {
      success: true,
      data: payload as T,
      message: payload?.message,
    };
  } catch (error) {
    return {
      success: false,
      data: null as T,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
