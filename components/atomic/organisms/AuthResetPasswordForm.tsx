"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { confirmPasswordReset } from "@/services";
import { Button, Input, Text } from "../atoms";
import { AuthFormCard, FormField } from "../molecules";

interface AuthResetPasswordFormProps {
  onBackToLogin?: () => void;
}

const AuthResetPasswordForm = ({
  onBackToLogin,
}: AuthResetPasswordFormProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setIsSuccess(false);
      setMessage("Reset token is missing. Please request a new link.");
      return;
    }

    setIsSubmitting(true);
    setMessage(undefined);
    setIsSuccess(undefined);

    const response = await confirmPasswordReset({
      token,
      newPassword,
      passwordConfirmation,
    });

    if (response.success) {
      setIsSuccess(true);
      setMessage(response.message || "Password reset successful.");
    } else {
      setIsSuccess(false);
      setMessage(response.error || "Password reset failed.");
    }

    setIsSubmitting(false);
  };

  return (
    <AuthFormCard
      title="Set new password"
      message={message}
      isSuccess={isSuccess}
      onSubmit={handleReset}
    >
      <Text type="p" className="text-sm text-gray-600">
        Set a new password for your account.
      </Text>
      <FormField htmlFor="newPassword" required>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
        />
      </FormField>
      <FormField htmlFor="passwordConfirmation" required>
        <Input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          placeholder="Confirm password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
        />
      </FormField>
      <Button
        type="submit"
        disabled={isSubmitting || !token}
        className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50"
      >
        {isSubmitting ? "Resetting..." : "Reset password"}
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

export default AuthResetPasswordForm;
