"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { clearAuthSession } from "@/lib/auth-session";
import { logoutUser } from "@/services";
import { Button, Icon, Text } from "../atoms";
import ProfileSidebarCard from "../molecules/ProfileSidebarCard";
import ProfileUserCard from "../molecules/ProfileUserCard";
import Link from "next/link";
import { profileItems } from "@/config/constants";
import { ArrowDownSVG } from "@/components/icons";

interface ProfileSidebarProps {
  className?: string;
  username?: string;
  phoneNumber?: string;
  profileImage?: string;
}

const ProfileSidebar = ({
  className,
  username,
  phoneNumber,
  profileImage,
}: ProfileSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState<string>();
  const [logoutSuccess, setLogoutSuccess] = useState<boolean | undefined>();
  const isSettingsRoute = pathname === "/profile/settings";
  const isProfileRoute = pathname === "/profile";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutMessage(undefined);
    setLogoutSuccess(undefined);

    const response = await logoutUser();

    if (response.success) {
      clearAuthSession();
      setLogoutSuccess(true);
      setLogoutMessage("Logged out successfully.");
      window.location.replace("/");
      return;
    }

    setLogoutSuccess(false);
    setLogoutMessage(response.error || "Failed to log out.");
    setIsLoggingOut(false);
  };

  return (
    <aside className={cn("flex flex-col gap-[30px]", className)}>
      {!isSettingsRoute ? (
        <>
          <ProfileUserCard
            username={username}
            phoneNumber={phoneNumber}
            profileImage={profileImage}
            isProfileRoute={isProfileRoute}
          />
          {isProfileRoute && (
            <ProfileSidebarCard className="h-[395px] justify-center items-center">
              <ul className="flex flex-col">
                {profileItems.map((item, index) => (
                  <li
                    key={index}
                    className="border-b-[1px] border-[#A1A1A157] last-of-type:border-b-[0]"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-2.5 font-medium text-base py-4"
                    >
                      <Icon>{item.icon}</Icon>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ProfileSidebarCard>
          )}
        </>
      ) : (
        <>
          <ProfileSidebarCard className="h-[410px] flex p-10  px-20 relative pt-20">
            <Link
              href="/profile"
              className="flex items-center gap-4 underline self-start absolute top-6 left-6"
              aria-label="Open settings"
            >
              <Icon className="rotate-90">
                <ArrowDownSVG />
              </Icon>
              <Button className="text-md font-medium text-black">
                Profile
              </Button>
            </Link>

            <div className="self-start pb-4 border-b-[1px] w-full border-gray-300">
              <Text type="h3">Personal Details</Text>
            </div>
            <div className="self-start mt-10 w-full">
              <Text type="p" className="text-xl">
                You can update your information here!
              </Text>
            </div>
          </ProfileSidebarCard>
          {/* <ProfileSidebarCard>2</ProfileSidebarCard> */}
          <ProfileSidebarCard className="h-[240px] flex p-10 px-20 relative pt-20">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="self-start pb-4 border-b-[1px] w-full border-gray-300">
                <Text type="h3">Session</Text>
              </div>

              {logoutMessage && (
                <Text
                  type="p"
                  className={cn(
                    "text-sm",
                    logoutSuccess ? "text-green-700" : "text-red-700",
                  )}
                >
                  {logoutMessage}
                </Text>
              )}

              <Button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </ProfileSidebarCard>
        </>
      )}
    </aside>
  );
};

export default ProfileSidebar;
