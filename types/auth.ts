export interface AuthUser {
  id: number;
  email?: string;
}

export interface RegisterRequest {
  email: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
  pinCode?: string;
}

export interface VerifyRequest {
  email: string;
  pinCode: string;
  password: string;
  passwordConfirmation: string;
}

export interface VerifyResponse {
  message: string;
  verified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  newPassword: string;
  passwordConfirmation: string;
}
