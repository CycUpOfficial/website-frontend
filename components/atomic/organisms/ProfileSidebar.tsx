"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icon } from "../atoms";
import ProfileSidebarCard from "../molecules/ProfileSidebarCard";
import ProfileUserCard from "../molecules/ProfileUserCard";
import Link from "next/link";
import { profileItems } from "@/config/constants";

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
  const isSettingsRoute = pathname === "/profile/settings";
  const isProfileRoute = pathname === "/profile";

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
          <ProfileSidebarCard>1</ProfileSidebarCard>
          <ProfileSidebarCard>2</ProfileSidebarCard>
          <ProfileSidebarCard>3</ProfileSidebarCard>
        </>
      )}
    </aside>
  );
};

export default ProfileSidebar;
