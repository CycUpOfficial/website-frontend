"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";

import { registerUser, verifyUser } from "@/services";
import { Button, Input, Text } from "../atoms";
import { AuthFormCard, FormField } from "../molecules";

type RegisterStep = "register" | "verify" | "done";

interface AuthRegisterFormProps {
  onLogin?: () => void;
}

const AuthRegisterForm = ({ onLogin }: AuthRegisterFormProps) => {
  const [step, setStep] = useState<RegisterStep>("register");
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pinHint, setPinHint] = useState<string | undefined>();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(undefined);
    setIsSuccess(undefined);

    const response = await registerUser({ email });
    if (response.success) {
      setIsSuccess(true);
      setMessage(
        response.data.message ||
          "Registration successful. Check your email for the PIN.",
      );
      setPinHint(response.data.pinCode);
      setStep("verify");
    } else {
      setIsSuccess(false);
      setMessage(response.error || "Registration failed.");
    }

    setIsSubmitting(false);
  };

  const handleVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(undefined);
    setIsSuccess(undefined);

    const response = await verifyUser({
      email,
      pinCode,
      password,
      passwordConfirmation,
    });

    if (response.success) {
      setIsSuccess(true);
      setMessage(response.data.message || "Email verified successfully.");
      setStep("done");
    } else {
      setIsSuccess(false);
      setMessage(response.error || "Verification failed.");
    }

    setIsSubmitting(false);
  };

  const renderStep = () => {
    if (step === "done") {
      return (
        <div className="space-y-4 text-center">
          <Text type="p" className="text-gray-700">
            Your account is verified. Please log in to continue.
          </Text>
          {onLogin ? (
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white"
            >
              Go to login
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white"
            >
              Go to login
            </Link>
          )}
        </div>
      );
    }

    if (step === "verify") {
      return (
        <>
          <Text type="p" className="text-sm text-gray-600">
            Enter the PIN sent to your email and set your password.
          </Text>
          {pinHint && (
            <div className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
              PIN code: {pinHint}
            </div>
          )}
          <FormField htmlFor="pinCode" required>
            <Input
              id="pinCode"
              name="pinCode"
              placeholder="PIN code"
              value={pinCode}
              onChange={(event) => setPinCode(event.target.value)}
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
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify and set password"}
          </Button>
        </>
      );
    }

    return (
      <>
        <Text type="p" className="text-sm text-gray-600">
          Use your Finnish university email to receive a verification PIN.
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
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50"
        >
          {isSubmitting ? "Sending PIN..." : "Send verification PIN"}
        </Button>
        <div className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          {onLogin ? (
            <button
              type="button"
              onClick={onLogin}
              className="text-primary font-medium"
            >
              Log in
            </button>
          ) : (
            <Link className="text-primary font-medium" href="/auth/login">
              Log in
            </Link>
          )}
        </div>
      </>
    );
  };

  const submitHandler =
    step === "verify"
      ? handleVerify
      : step === "register"
        ? handleRegister
        : undefined;

  return (
    <AuthFormCard
      title="Create your account"
      message={message}
      isSuccess={isSuccess}
      onSubmit={submitHandler}
    >
      {renderStep()}
    </AuthFormCard>
  );
};

export default AuthRegisterForm;
