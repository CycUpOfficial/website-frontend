import type {
  ApiResponse,
  CategoriesResponse,
  CitiesResponse,
  SearchItemsQuery,
  SearchItemsResponse,
} from "@/types";
import { buildQuery, requestJson } from "./request";

export async function searchItems(
  query?: SearchItemsQuery,
): Promise<ApiResponse<SearchItemsResponse>> {
  const search = buildQuery(query);
  return requestJson<SearchItemsResponse>(`/items${search}`, {
    method: "GET",
    cache: "no-store",
  });
}

export async function getCategories(): Promise<
  ApiResponse<CategoriesResponse>
> {
  return requestJson<CategoriesResponse>("/categories", {
    method: "GET",
    cache: "force-cache",
  });
}

export async function getCities(
  options?: RequestInit,
): Promise<ApiResponse<CitiesResponse>> {
  return requestJson<CitiesResponse>("/cities", {
    method: "GET",
    cache: "force-cache",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}
