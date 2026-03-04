"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";

import { requestPasswordReset } from "@/services";
import { Button, Input, Text } from "../atoms";
import { AuthFormCard, FormField } from "../molecules";

interface AuthForgotPasswordFormProps {
  onBackToLogin?: () => void;
}

const AuthForgotPasswordForm = ({
  onBackToLogin,
}: AuthForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(undefined);
    setIsSuccess(undefined);

    const response = await requestPasswordReset({ email });
    if (response.success) {
      setIsSuccess(true);
      setMessage(
        response.data.message ||
          "Password reset link has been sent to your email.",
      );
    } else {
      setIsSuccess(false);
      setMessage(response.error || "Password reset request failed.");
    }

    setIsSubmitting(false);
  };

  return (
    <AuthFormCard
      title="Reset password"
      message={message}
      isSuccess={isSuccess}
      onSubmit={handleRequest}
    >
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
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary/90 disabled:opacity-50"
      >
        {isSubmitting ? "Sending link..." : "Send reset link"}
      </Button>
      <div className="text-sm text-center text-gray-600">
        {onBackToLogin ? (
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-primary font-medium"
          >
            Back to login
          </button>
        ) : (
          <Link className="text-primary font-medium" href="/auth/login">
            Back to login
          </Link>
        )}
      </div>
    </AuthFormCard>
  );
};

export default AuthForgotPasswordForm;
