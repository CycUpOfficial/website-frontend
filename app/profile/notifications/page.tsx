import { NotificationTemplate } from "@/components/atomic/templates";
import { getQueryValue, parsePositiveInt, SearchParamValue } from "@/lib/utils";
import { getNotifications } from "@/services";
import { cookies } from "next/headers";

interface NotificationsPageProps {
  searchParams: Promise<Record<string, SearchParamValue>>;
}

function parseUnreadOnly(value: string | undefined): boolean | undefined {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

export default async function NotificationsPage({
  searchParams,
}: NotificationsPageProps) {
  const params = await searchParams;
  const cookieHeader = (await cookies()).toString();

  const page = parsePositiveInt(getQueryValue(params.page));
  const limit = parsePositiveInt(getQueryValue(params.limit));
  const unreadOnly = parseUnreadOnly(getQueryValue(params.unreadOnly));

  const notificationsResponse = await getNotifications(
    {
      unreadOnly,
      page: page ?? 1,
      limit: limit && limit <= 100 ? limit : 20,
    },
    {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    },
  );

  const notifications = notificationsResponse.success
    ? notificationsResponse.data.notifications
    : [];

  return <NotificationTemplate notifications={notifications} />;
}
