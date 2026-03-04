"use client";

import { useEffect, useState } from "react";

import AuthForgotPasswordForm from "./AuthForgotPasswordForm";
import AuthLoginForm from "./AuthLoginForm";
import AuthRegisterForm from "./AuthRegisterForm";
import AuthResetPasswordForm from "./AuthResetPasswordForm";
import Modal from "./Modal";
import { Text } from "../atoms";

export type AuthView = "login" | "register" | "forgot" | "reset";

interface AuthModalProps {
  isOpen: boolean;
  initialView?: AuthView;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const AuthModal = ({
  isOpen,
  initialView = "login",
  onClose,
  onLoginSuccess,
}: AuthModalProps) => {
  const [view, setView] = useState<AuthView>(initialView);

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [initialView, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {view === "login" && (
        <AuthLoginForm
          onForgotPassword={() => setView("forgot")}
          onRegister={() => setView("register")}
          onSuccess={onLoginSuccess}
        />
      )}
      {view === "register" && (
        <AuthRegisterForm onLogin={() => setView("login")} />
      )}
      {view === "forgot" && (
        <AuthForgotPasswordForm onBackToLogin={() => setView("login")} />
      )}
      {view === "reset" && (
        <AuthResetPasswordForm onBackToLogin={() => setView("login")} />
      )}
      {view === "reset" && (
        <Text type="p" className="mt-4 text-center text-xs text-gray-500">
          If you do not have a reset token, request a new link.
        </Text>
      )}
    </Modal>
  );
};

export default AuthModal;
