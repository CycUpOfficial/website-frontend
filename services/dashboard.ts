import type {
  ApiResponse,
  DashboardAnalytics,
  DashboardItemsQuery,
  DashboardItemsResponse,
  DashboardRatingsResponse,
} from "@/types";
import { buildQuery, requestJson } from "./request";

export async function getUserAnalytics(
  options?: RequestInit,
): Promise<ApiResponse<DashboardAnalytics>> {
  return requestJson<DashboardAnalytics>("/dashboard/analytics", {
    method: "GET",
    cache: "no-store",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}

export async function getUserItems(
  query?: DashboardItemsQuery,
  options?: RequestInit,
): Promise<ApiResponse<DashboardItemsResponse>> {
  const search = buildQuery(query);
  return requestJson<DashboardItemsResponse>(`/dashboard/items${search}`, {
    method: "GET",
    cache: "no-store",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}

export async function getUserRatings(
  options?: RequestInit,
): Promise<
  ApiResponse<DashboardRatingsResponse>
> {
  return requestJson<DashboardRatingsResponse>("/dashboard/ratings", {
    method: "GET",
    cache: "no-store",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}
