import type {
  ApiResponse,
  NotificationsQuery,
  NotificationsResponse,
} from "@/types";
import { buildQuery, requestJson } from "./request";

export async function getNotifications(
  query?: NotificationsQuery,
  options?: RequestInit,
): Promise<ApiResponse<NotificationsResponse>> {
  const search = buildQuery(query);
  return requestJson<NotificationsResponse>(`/notifications${search}`, {
    method: "GET",
    cache: "no-store",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}

export async function markNotificationAsRead(
  notificationId: number,
): Promise<ApiResponse<null>> {
  return requestJson<null>(`/notifications/${notificationId}/read`, {
    method: "PUT",
  });
}

export async function markAllNotificationAsRead(): Promise<ApiResponse<null>> {
  return requestJson<null>(`/notifications/read-all`, {
    method: "PUT",
  });
}
