"use client";

import { NotificationItem } from "@/types";
import { NotificationItemCard } from "../molecules";
import { Text } from "../atoms";
import { cn } from "@/lib/utils";

interface NotificationsWrapperProps {
  notifications: NotificationItem[];
  onRead?: (id: number) => void;
  className?: string;
}

const NotificationsWrapper = ({
  notifications,
  onRead,
  className,
}: NotificationsWrapperProps) => {
  if (!notifications.length) {
    return (
      <div
        className={cn(
          "flex min-h-[220px] items-center justify-center rounded-[16px] border border-textSecondary/20 bg-white",
          className,
        )}
      >
        <Text type="p" className="text-sm text-textSecondary">
          No notifications yet.
        </Text>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {notifications.map((notification) => (
        <NotificationItemCard
          key={notification.id}
          notification={notification}
          onRead={onRead}
        />
      ))}
    </div>
  );
};

export default NotificationsWrapper;
