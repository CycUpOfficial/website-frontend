import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowDownSVG, ProfileSVG, SettingsSVG } from "@/components/icons";
import { Button, Icon, Text } from "../atoms";
import ProfileSidebarCard from "./ProfileSidebarCard";

interface ProfileUserCardProps {
  username?: string;
  phoneNumber?: string;
  profileImage?: string;
  className?: string;
  isProfileRoute?: boolean;
}

const ProfileUserCard = ({
  username = "Username",
  phoneNumber = "Phone number",
  profileImage,
  className,
  isProfileRoute,
}: ProfileUserCardProps) => {
  return (
    <ProfileSidebarCard
      className={cn("h-[410px] items-center justify-center", className)}
    >
      {!isProfileRoute ? (
        <div className="flex absolute top-5 w-full px-10 justify-between items-center">
          <Link
            href="/profile"
            className="flex items-center gap-4 underline"
            aria-label="Open settings"
          >
            <Icon className="rotate-90">
              <ArrowDownSVG />
            </Icon>
            <Button className="text-md font-medium text-black">Profile</Button>
          </Link>
          <Link
            href="/profile/settings"
            className="flex items-center gap-1.5"
            aria-label="Open settings"
          >
            <Icon>
              <SettingsSVG />
            </Icon>
            <Button className="text-xs font-medium text-black">Settings</Button>
          </Link>
        </div>
      ) : (
        <Link
          href="/profile/settings"
          className="absolute right-4 top-4 flex items-center gap-1.5"
          aria-label="Open settings"
        >
          <Icon>
            <SettingsSVG />
          </Icon>
          <Button className="text-xs font-medium text-black">Settings</Button>
        </Link>
      )}

      <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border border-textSecondary/20 bg-primary">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <ProfileSVG width={56} height={56} />
        )}
      </div>
      <Text
        type="h3"
        className="mt-[25px] text-[20px] font-semibold text-textPrimary"
      >
        {username}
      </Text>
      <Text type="p" className="text-base font-medium text-textSecondary">
        {phoneNumber}
      </Text>
    </ProfileSidebarCard>
  );
};

export default ProfileUserCard;
