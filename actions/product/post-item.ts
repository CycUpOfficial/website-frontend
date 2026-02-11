// src/actions/post-item.ts
"use server";

import { z } from "zod";

// Define validation schema mirroring the form structure
const schema = z.object({
  title: z.string().min(5),
  // Using strings for Select inputs initially for simplicity
  category: z.string().min(1),
  priceType: z.enum(["giveaway", "selling", "lending"]),
  // Price is optional if giveaway, coerced to number otherwise
  price: z.coerce.number().optional(),
  durationRate: z.enum(["minutely", "hourly", "daily", "weekly"]).optional(),
  // ... add other fields: address, city, description, etc.
  // Images are usually handled separately via FormData
});

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
  success?: boolean;
} | null;

export async function createPostItem(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Extract raw data
  const rawData = Object.fromEntries(formData.entries());

  // 2. Validate
  const validatedFields = schema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation Error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const photos = formData.getAll("photos") as File[];

  // Optional: Validate number of files
  if (photos.length > 3) {
    return {
      success: false,
      message: "Too many photos uploaded",
      errors: { photos: ["You can upload up to 3 photos"] },
      values: rawValues,
    };
  }

  // Optional: Validate file type/size
  for (const file of photos) {
    if (!file.type.startsWith("image/")) {
      return {
        success: false,
        message: "Invalid file type",
        errors: { photos: ["Only images are allowed"] },
        values: rawValues,
      };
    }
    if (file.size > 5_000_000) {
      // 5MB limit
      return {
        success: false,
        message: "File too large",
        errors: { photos: ["Each photo must be <= 5MB"] },
        values: rawValues,
      };
    }
  }

  // 3. Mutate DB (Simulated delay)
  console.log("Saving to DB:", validatedFields.data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 4. Revalidate paths if necessary and return success
  // revalidatePath('/items');
  return { success: true, message: "Item posted successfully!" };
}
