import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  RegisterRequest,
  RegisterResponse,
  VerifyRequest,
  VerifyResponse,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function requestJson<T>(
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
    console.log("🚀 ~ requestJson ~ response:", response);

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

export async function registerUser(
  input: RegisterRequest,
): Promise<ApiResponse<RegisterResponse>> {
  return requestJson<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function verifyUser(
  input: VerifyRequest,
): Promise<ApiResponse<VerifyResponse>> {
  return requestJson<VerifyResponse>("/auth/verify", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function loginUser(
  input: LoginRequest,
): Promise<ApiResponse<LoginResponse>> {
  return requestJson<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function logoutUser(): Promise<ApiResponse<null>> {
  return requestJson<null>("/auth/logout", {
    method: "POST",
  });
}

export async function requestPasswordReset(
  input: PasswordResetRequest,
): Promise<ApiResponse<{ message: string }>> {
  return requestJson<{ message: string }>("/auth/password/reset", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function confirmPasswordReset(
  input: PasswordResetConfirmRequest,
): Promise<ApiResponse<{ message?: string }>> {
  return requestJson<{ message?: string }>("/auth/password/reset/confirm", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
