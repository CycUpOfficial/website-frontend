"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";

import { loginUser } from "@/services";
import { Button, Input, Text } from "../atoms";
import { AuthFormCard, FormField } from "../molecules";

interface AuthLoginFormProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

const AuthLoginForm = ({
  onForgotPassword,
  onRegister,
}: AuthLoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(undefined);
    setIsSuccess(undefined);

    const response = await loginUser({ email, password });
    if (response.success) {
      setIsSuccess(true);
      setMessage("Login successful.");
    } else {
      setIsSuccess(false);
      setMessage(response.error || "Login failed.");
    }

    setIsSubmitting(false);
  };

  return (
    <AuthFormCard
      title="Log in"
      message={message}
      isSuccess={isSuccess}
      onSubmit={handleLogin}
    >
      <Text type="p" className="text-sm text-gray-600">
        Log in with your university email and password.
      </Text>
      <FormField htmlFor="email" required>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="student@university.fi"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </FormField>
      <FormField htmlFor="password" required>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </FormField>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>
      <div className="space-y-2 text-sm text-center text-gray-600">
        {onForgotPassword ? (
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-primary font-medium"
          >
            Forgot password?
          </button>
        ) : (
          <Link
            className="text-primary font-medium"
            href="/auth/forgot-password"
          >
            Forgot password?
          </Link>
        )}
        {onRegister ? (
          <div>
            New here?{" "}
            <button
              type="button"
              onClick={onRegister}
              className="text-primary font-medium"
            >
              Create an account
            </button>
          </div>
        ) : (
          <div>
            New here?{" "}
            <Link className="text-primary font-medium" href="/auth/register">
              Create an account
            </Link>
          </div>
        )}
      </div>
    </AuthFormCard>
  );
};

export default AuthLoginForm;
