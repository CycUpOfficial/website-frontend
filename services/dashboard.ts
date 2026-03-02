import type {
  ApiResponse,
  DashboardAnalytics,
  DashboardItemsQuery,
  DashboardItemsResponse,
  DashboardRatingsResponse,
} from "@/types";
import { buildQuery, requestJson } from "./request";

export async function getUserAnalytics(): Promise<
  ApiResponse<DashboardAnalytics>
> {
  return requestJson<DashboardAnalytics>("/dashboard/analytics", {
    method: "GET",
  });
}

export async function getUserItems(
  query?: DashboardItemsQuery,
): Promise<ApiResponse<DashboardItemsResponse>> {
  const search = buildQuery(query);
  return requestJson<DashboardItemsResponse>(`/dashboard/items${search}`, {
    method: "GET",
  });
}

export async function getUserRatings(): Promise<
  ApiResponse<DashboardRatingsResponse>
> {
  return requestJson<DashboardRatingsResponse>("/dashboard/ratings", {
    method: "GET",
  });
}
