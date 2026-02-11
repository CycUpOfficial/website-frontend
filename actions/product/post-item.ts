// src/actions/post-item.ts
"use server";

import { z } from "zod";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define validation schema mirroring the form structure
const optionalNumber = () =>
  z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number(),
  );

const optionalEnum = <T extends [string, ...string[]]>(values: T) =>
  z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.enum(values),
  );

const schema = z
  .object({
    title: z.string().min(5).max(100),
    categoryId: z.coerce.number().int().positive(),
    brandName: z.string().min(1),
    condition: z.enum(["new", "used"]),
    description: z.string().min(10).max(1000),
    address: z.string().min(1),
    cityId: z.coerce.number().int().positive(),
    itemType: z.enum(["giveaway", "selling", "lending"]),
    sellingPrice: optionalNumber().optional(),
    lendingPrice: optionalNumber().optional(),
    rentUnit: optionalEnum(["hour", "day", "week", "month"]).optional(),
    mainPhotoIndex: z
      .preprocess(
        (value) => (value === "" || value === null ? undefined : value),
        z.coerce.number().int().min(0).max(2),
      )
      .optional(),
    openToNegotiation: optionalEnum(["yes", "no"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.description.length <= data.title.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["description"],
        message: "Description should be longer than the title.",
      });
    }

    if (data.itemType === "selling") {
      if (data.sellingPrice === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sellingPrice"],
          message: "Selling price is required.",
        });
      }
    }

    if (data.itemType === "lending") {
      if (data.lendingPrice === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["lendingPrice"],
          message: "Lending price is required.",
        });
      }
      if (!data.rentUnit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["rentUnit"],
          message: "Rent unit is required.",
        });
      }
    }
  });

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
  success?: boolean;
  values?: Record<string, string | undefined>;
} | null;

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

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
  // 1. Extract raw data
  const rawValues = {
    title: formData.get("title")?.toString() ?? "",
    categoryId: formData.get("categoryId")?.toString() ?? "",
    brandName: formData.get("brandName")?.toString() ?? "",
    condition: formData.get("condition")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    address: formData.get("address")?.toString() ?? "",
    cityId: formData.get("cityId")?.toString() ?? "",
    itemType: formData.get("itemType")?.toString() ?? "",
    sellingPrice: formData.get("sellingPrice")?.toString(),
    lendingPrice: formData.get("lendingPrice")?.toString(),
    rentUnit: formData.get("rentUnit")?.toString(),
    mainPhotoIndex: formData.get("mainPhotoIndex")?.toString(),
    openToNegotiation: formData.get("openToNegotiation")?.toString(),
  };

  // 2. Validate
  const validatedFields = schema.safeParse(rawValues);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation Error",
      errors: validatedFields.error.flatten().fieldErrors,
      values: rawValues,
    };
  }

  const photos = formData.getAll("photos") as File[];

  // Optional: Validate number of files
  if (photos.length < 1 || photos.length > 3) {
    return {
      success: false,
      message: "Invalid number of photos",
      errors: { photos: ["Upload between 1 and 3 photos"] },
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

  const payload = new FormData();
  payload.append("title", validatedFields.data.title);
  payload.append("categoryId", String(validatedFields.data.categoryId));
  payload.append("brandName", validatedFields.data.brandName);
  payload.append("condition", validatedFields.data.condition);
  payload.append("description", validatedFields.data.description);
  payload.append("address", validatedFields.data.address);
  payload.append("cityId", String(validatedFields.data.cityId));
  payload.append("itemType", validatedFields.data.itemType);

  if (validatedFields.data.sellingPrice !== undefined) {
    payload.append("sellingPrice", String(validatedFields.data.sellingPrice));
  }

  if (validatedFields.data.lendingPrice !== undefined) {
    payload.append("lendingPrice", String(validatedFields.data.lendingPrice));
  }

  if (validatedFields.data.rentUnit) {
    payload.append("rentUnit", validatedFields.data.rentUnit);
  }

  if (validatedFields.data.mainPhotoIndex !== undefined) {
    payload.append(
      "mainPhotoIndex",
      String(validatedFields.data.mainPhotoIndex),
    );
  }

  for (const photo of photos) {
    payload.append("photos", photo);
  }

  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: payload,
    });

    if (!response.ok) {
      let message = "Failed to create item";

      try {
        const errorBody = await response.json();
        if (typeof errorBody?.message === "string") {
          message = errorBody.message;
        }
      } catch (error) {
        message = response.status === 401 ? "Unauthorized" : message;
      }

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
