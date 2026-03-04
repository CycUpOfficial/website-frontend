import type {
  ApiResponse,
  CategoriesResponse,
  CitiesResponse,
  ItemDetail,
  ProductDetail,
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

export async function getItemById(
  itemId: string,
): Promise<ApiResponse<ProductDetail>> {
  return requestJson<ProductDetail>(`/items/${itemId}`, {
    method: "GET",
    cache: "no-store",
  });
}

export async function getItemDetailById(
  itemId: string,
): Promise<ApiResponse<ItemDetail>> {
  return requestJson<ItemDetail>(`/items/${itemId}`, {
    method: "GET",
    cache: "no-store",
  });
}

export interface UpdateItemInput {
  title?: string;
  description?: string;
  sellingPrice?: number;
  lendingPrice?: number;
  status?: "published" | "deleted" | "expired" | "sold";
}

export async function updateItem(
  itemId: string,
  input: UpdateItemInput,
  options?: RequestInit,
): Promise<ApiResponse<ItemDetail>> {
  return requestJson<ItemDetail>(`/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify(input),
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}

export async function deleteItem(
  itemId: string,
  options?: RequestInit,
): Promise<ApiResponse<{ message?: string }>> {
  return requestJson<{ message?: string }>(`/items/${itemId}`, {
    method: "DELETE",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}
