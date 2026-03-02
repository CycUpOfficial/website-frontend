import Link from "next/link";

import { cn } from "@/lib/utils";
import { SettingsSVG } from "@/components/icons";
import { Button, Icon, Image, Text } from "../atoms";
import ProfileSidebarCard from "./ProfileSidebarCard";

interface ProfileUserCardProps {
  username?: string;
  phoneNumber?: string;
  profileImage?: string;
  className?: string;
}

const ProfileUserCard = ({
  username = "Username",
  phoneNumber = "Phone number",
  profileImage = "/placeholder.svg",
  className,
}: ProfileUserCardProps) => {
  return (
    <ProfileSidebarCard
      className={cn("h-[410px] items-center justify-center", className)}
    >
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
      <div className="h-[100px] w-[100px]">
        <Image src={profileImage} alt="Profile" aspectRatio="square" />
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
