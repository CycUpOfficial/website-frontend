import type {
  ApiResponse,
  CurrentUser,
  LoginRequest,
  LoginResponse,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  RegisterRequest,
  RegisterResponse,
  VerifyRequest,
  VerifyResponse,
} from "@/types";
import { requestJson } from "./request";

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

export async function getCurrentUser(
  options?: RequestInit,
): Promise<ApiResponse<CurrentUser>> {
  return requestJson<CurrentUser>("/auth/me", {
    method: "GET",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}
