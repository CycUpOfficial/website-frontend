"use client";

import { useMemo, useState } from "react";

import { NotificationItem } from "@/types";
import NotificationsWrapper from "../organisms/NotificationsWrapper";
import { ProfileCommonWrapper } from "../organisms";
import { Button, Text } from "../atoms";
import { markAllNotificationAsRead, markNotificationAsRead } from "@/services";

interface INotificationsPageProps {
  notifications?: NotificationItem[];
}

const NotificationsPage = ({ notifications }: INotificationsPageProps) => {
  const [items, setItems] = useState<NotificationItem[]>(notifications ?? []);
  const unreadCount = useMemo(
    () => items.filter((notification) => !notification.isRead).length,
    [items],
  );

  const handleRead = (id: number) => {
    setItems((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
    void markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    setItems((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
    void markAllNotificationAsRead();
  };

  return (
    <section className="h-[640px] overflow-hidden rounded-[15px] bg-white">
      <ProfileCommonWrapper
        title="Notifications"
        stickyHeader
        className="h-full"
        contentClassName="flex-1 overflow-y-auto px-6 pb-8"
        handlers={
          <div className="flex items-center gap-4">
            <Text type="span" className="text-sm text-textSecondary">
              {unreadCount} unread
            </Text>
            <Button onClick={handleMarkAllAsRead}>Mark all as read</Button>
          </div>
        }
      >
        <NotificationsWrapper notifications={items} onRead={handleRead} />
      </ProfileCommonWrapper>
    </section>
  );
};

export default NotificationsPage;
