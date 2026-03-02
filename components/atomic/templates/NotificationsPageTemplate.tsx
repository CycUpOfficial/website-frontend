"use client";

import { useMemo, useState } from "react";

import { NotificationItem } from "@/types";
import NotificationsWrapper from "../organisms/NotificationsWrapper";
import { ProfileCommonWrapper } from "../organisms";
import { Button, Text } from "../atoms";
import { markAllNotificationAsRead } from "@/services";

interface INotificationsPageProps {
  notifications?: NotificationItem[];
}

const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Offer accepted",
    message: "Your offer for the city bike was accepted.",
    isRead: false,
    createdAt: "2026-02-23T09:20:00Z",
  },
  {
    id: 2,
    title: "New message",
    message: "Sara sent you a message about the lamp listing.",
    isRead: false,
    createdAt: "2026-02-22T17:45:00Z",
  },
  {
    id: 3,
    title: "Listing expiring",
    message: "Your listing for the coffee table expires in 2 days.",
    isRead: true,
    createdAt: "2026-02-20T12:10:00Z",
  },
  {
    id: 3,
    title: "Listing expiring",
    message: "Your listing for the coffee table expires in 2 days.",
    isRead: true,
    createdAt: "2026-02-20T12:10:00Z",
  },
  {
    id: 3,
    title: "Listing expiring",
    message: "Your listing for the coffee table expires in 2 days.",
    isRead: true,
    createdAt: "2026-02-20T12:10:00Z",
  },
  {
    id: 3,
    title: "Listing expiring",
    message: "Your listing for the coffee table expires in 2 days.",
    isRead: true,
    createdAt: "2026-02-20T12:10:00Z",
  },
];

const NotificationsPage = ({ notifications }: INotificationsPageProps) => {
  const [items, setItems] = useState<NotificationItem[]>(
    notifications?.length ? notifications : mockNotifications,
  );
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
  };

  const handleMarkAllAsRead = () => {
    setItems((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
    markAllNotificationAsRead();
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
