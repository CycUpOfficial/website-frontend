"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { ProfileSVG } from "@/components/icons";
import { Logo, Searchbar } from "../molecules";
import AuthModal, { type AuthView } from "./AuthModal";

interface IHeaderProps {
  classname?: string;
}

const Header = ({ classname }: IHeaderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");

  const isHomeRoute = pathname === "/";

  useEffect(() => {
    const requestedView = searchParams.get("auth");
    if (
      requestedView === "login" ||
      requestedView === "register" ||
      requestedView === "forgot" ||
      requestedView === "reset"
    ) {
      setAuthView(requestedView);
      setIsAuthOpen(true);
    }
  }, [searchParams]);

  return (
    <header
      className={cn(
        "w-full fixed flex justify-between items-center py-4 px-20 bg-primary shadow-[#00000026] shadow-md z-50",
        classname,
      )}
    >
      <Logo />
      {!isHomeRoute && <Searchbar placeholder="What are you looking for?" />}

      <div className="flex items-center justify-between gap-10">
        <ProfileSVG />
        <button
          type="button"
          onClick={() => {
            setAuthView("login");
            setIsAuthOpen(true);
          }}
          className="border border-secondary px-4 py-2 text-sm font-bold text-secondary"
        >
          Log in
        </button>
        <Link
          className="bg-secondary px-4 py-2 text-sm font-bold text-white"
          href="/product/new"
        >
          Post Item
        </Link>
      </div>
      <AuthModal
        isOpen={isAuthOpen}
        initialView={authView}
        onClose={() => setIsAuthOpen(false)}
      />
    </header>
  );
};

export default Header;
