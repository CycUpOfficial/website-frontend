import { cn } from "@/lib/utils";
import { NotificationItem } from "@/types";
import { Button, Text } from "../atoms";

interface NotificationItemCardProps {
  notification: NotificationItem;
  onRead?: (id: number) => void;
  className?: string;
}

const NotificationItemCard = ({
  notification,
  onRead,
  className,
}: NotificationItemCardProps) => {
  const isRead = Boolean(notification.isRead);
  const title = notification.title || "Notification";
  const message = notification.message || "You have a new notification.";
  const createdAt = notification.createdAt
    ? new Date(notification.createdAt).toLocaleString()
    : "Just now";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[16px] border px-5 py-4",
        isRead
          ? "border-textSecondary/20 bg-white"
          : "border-green-200 bg-green-50",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Text type="h4" className="text-base font-semibold text-textPrimary">
          {title}
        </Text>
        <Text type="span" className="text-xs text-textSecondary">
          {createdAt}
        </Text>
      </div>
      <Text type="p" className="text-sm text-textSecondary">
        {message}
      </Text>
      <Button
        className={cn(
          "w-full rounded-full border px-4 py-2 text-sm font-medium",
          isRead
            ? "border-textSecondary/30 text-textSecondary"
            : "border-green-500 text-green-700",
        )}
        onClick={() => onRead?.(notification.id)}
        disabled={isRead}
      >
        Read
      </Button>
    </div>
  );
};

export default NotificationItemCard;
