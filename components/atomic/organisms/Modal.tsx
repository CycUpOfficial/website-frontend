"use client";

import type { ReactNode } from "react";

import { Icon } from "../atoms";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  contentClassName,
  showCloseButton = true,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4",
        className,
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={cn(
          "relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl",
          contentClassName,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <Icon className="text-2xl">×</Icon>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
