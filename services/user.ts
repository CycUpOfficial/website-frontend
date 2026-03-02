import type {
  ApiResponse,
  UpdateUserProfileRequest,
  UserProfile,
} from "@/types";
import { requestJson } from "./request";

export async function getCurrentUserProfile(): Promise<
  ApiResponse<UserProfile>
> {
  return requestJson<UserProfile>("/users/profile", {
    method: "GET",
  });
}

export async function updateUserProfile(
  input: UpdateUserProfileRequest,
): Promise<ApiResponse<UserProfile>> {
  return requestJson<UserProfile>("/users/profile", {
    method: "PUT",
    body: JSON.stringify(input),
  });
}
