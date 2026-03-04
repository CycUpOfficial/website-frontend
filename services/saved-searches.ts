import type {
  ApiResponse,
  CreateSavedSearchRequest,
  SavedSearch,
  SavedSearchesResponse,
  UpdateSavedSearchRequest,
} from "@/types";
import { requestJson } from "./request";

export async function getSavedSearches(
  options?: RequestInit,
): Promise<ApiResponse<SavedSearchesResponse>> {
  return requestJson<SavedSearchesResponse>("/saved-search", {
    method: "GET",
    cache: "no-store",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}

export async function createSavedSearch(
  input: CreateSavedSearchRequest,
): Promise<ApiResponse<SavedSearch>> {
  return requestJson<SavedSearch>("/saved-search", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateSavedSearch(
  searchId: number,
  input: UpdateSavedSearchRequest,
): Promise<ApiResponse<SavedSearch>> {
  return requestJson<SavedSearch>(`/saved-search/${searchId}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteSavedSearch(
  searchId: number,
): Promise<ApiResponse<null>> {
  return requestJson<null>(`/saved-search/${searchId}`, {
    method: "DELETE",
  });
}
