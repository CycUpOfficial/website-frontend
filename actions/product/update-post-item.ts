"use server";

import {
  API_URL,
  buildItemPayload,
  canEditItem,
  extractRawValues,
  FormState,
  getAuthHeaders,
  postItemSchema,
  resolveApiErrorMessage,
  validatePhotos,
} from "./post-item.shared";

export async function updatePostItem(
  itemId: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!API_URL) {
    return {
      success: false,
      message: "API URL is not configured",
    };
  }

  const allowed = await canEditItem(itemId);
  if (!allowed) {
    return {
      success: false,
      message: "You are not authorized to edit this item.",
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
  const photoValidation = validatePhotos(photos, rawValues, { max: 3 });
  if (photoValidation) {
    return photoValidation;
  }

  const payload = buildItemPayload(validatedFields.data, photos);

  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: "PUT",
      headers: await getAuthHeaders(),
      body: payload,
    });

    if (!response.ok) {
      const message = await resolveApiErrorMessage(
        response,
        "Failed to update item",
      );

      return {
        success: false,
        message,
        values: rawValues,
      };
    }

    return { success: true, message: "Item updated successfully!" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update item",
      values: rawValues,
    };
  }
}
