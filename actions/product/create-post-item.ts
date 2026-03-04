"use server";

import {
  API_URL,
  buildItemPayload,
  extractRawValues,
  FormState,
  getAuthHeaders,
  postItemSchema,
  resolveApiErrorMessage,
  validatePhotos,
} from "./post-item.shared";

export async function createPostItem(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!API_URL) {
    return {
      success: false,
      message: "API URL is not configured",
    };
  }

  const rawValues = extractRawValues(formData);
  const validatedFields = postItemSchema.safeParse(rawValues);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation Error",
      errors: validatedFields.error.flatten().fieldErrors,
      values: rawValues,
    };
  }

  const photos = formData.getAll("photos") as File[];
  const photoValidation = validatePhotos(photos, rawValues, { min: 1, max: 3 });
  if (photoValidation) {
    return photoValidation;
  }

  const payload = buildItemPayload(validatedFields.data, photos);

  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: payload,
    });

    if (!response.ok) {
      const message = await resolveApiErrorMessage(
        response,
        "Failed to create item",
      );

      return {
        success: false,
        message,
        values: rawValues,
      };
    }

    return { success: true, message: "Item posted successfully!" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create item",
      values: rawValues,
    };
  }
}
