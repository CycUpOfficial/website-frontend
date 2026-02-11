"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth-session";
import { ProfileSVG } from "@/components/icons";
import { Logo, Searchbar } from "../molecules";
import AuthModal, { type AuthView } from "./AuthModal";
import { Button, Icon } from "../atoms";

interface IHeaderProps {
  classname?: string;
}

const Header = ({ classname }: IHeaderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const syncAuthState = () => {
      const session = getAuthSession();
      setIsAuthenticated(!!session?.authenticated);
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-session-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-session-changed", syncAuthState);
    };
  }, []);

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
        <Button
          type="button"
          onClick={() => {
            if (isAuthenticated) {
              router.push("/profile");
              return;
            }
            setAuthView("login");
            setIsAuthOpen(true);
          }}
          className="flex items-center"
          aria-label={isAuthenticated ? "Go to profile" : "Open login modal"}
        >
          <Icon>
            <ProfileSVG />
          </Icon>
        </Button>

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
