import { cookies } from "next/headers";
import { z } from "zod";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export const postItemSchema = z
  .object({
    title: z.string().min(5).max(100),
    categoryId: z.string().trim().min(1),
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

    if (data.itemType === "selling" && data.sellingPrice === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sellingPrice"],
        message: "Selling price is required.",
      });
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

export type RawPostItemValues = {
  title: string;
  categoryId: string;
  brandName: string;
  condition: string;
  description: string;
  address: string;
  cityId: string;
  itemType: string;
  sellingPrice: string | undefined;
  lendingPrice: string | undefined;
  rentUnit: string | undefined;
  mainPhotoIndex: string | undefined;
  openToNegotiation: string | undefined;
};

export function extractRawValues(formData: FormData): RawPostItemValues {
  return {
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
}

export function validatePhotos(
  photos: File[],
  rawValues: RawPostItemValues,
  options: { min?: number; max: number },
): FormState {
  const { min = 0, max } = options;

  if (photos.length < min || photos.length > max) {
    return {
      success: false,
      message: "Invalid number of photos",
      errors: {
        photos: [
          min > 0
            ? `Upload between ${min} and ${max} photos`
            : `Upload up to ${max} photos`,
        ],
      },
      values: rawValues,
    };
  }

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
      return {
        success: false,
        message: "File too large",
        errors: { photos: ["Each photo must be <= 5MB"] },
        values: rawValues,
      };
    }
  }

  return null;
}

export function buildItemPayload(
  data: z.infer<typeof postItemSchema>,
  photos: File[],
) {
  const payload = new FormData();
  payload.append("title", data.title);
  payload.append("categoryId", String(data.categoryId));
  payload.append("brandName", data.brandName);
  payload.append("condition", data.condition);
  payload.append("description", data.description);
  payload.append("address", data.address);
  payload.append("cityId", String(data.cityId));
  payload.append("itemType", data.itemType);

  if (data.sellingPrice !== undefined) {
    payload.append("sellingPrice", String(data.sellingPrice));
  }

  if (data.lendingPrice !== undefined) {
    payload.append("lendingPrice", String(data.lendingPrice));
  }

  if (data.rentUnit) {
    payload.append("rentUnit", data.rentUnit);
  }

  if (data.mainPhotoIndex !== undefined) {
    payload.append("mainPhotoIndex", String(data.mainPhotoIndex));
  }

  for (const photo of photos) {
    payload.append("photos", photo);
  }

  return payload;
}

export async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function canEditItem(itemId: string): Promise<boolean> {
  if (!API_URL) {
    return false;
  }

  const headers = await getAuthHeaders();

  const [meResponse, itemResponse] = await Promise.all([
    fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers,
    }),
    fetch(`${API_URL}/items/${itemId}`, {
      method: "GET",
      headers,
    }),
  ]);

  if (!meResponse.ok || !itemResponse.ok) {
    return false;
  }

  const me = await meResponse.json();
  const item = await itemResponse.json();

  return String(item?.owner?.id) === String(me?.id);
}

export async function resolveApiErrorMessage(
  response: Response,
  fallback: string,
) {
  let message = fallback;

  try {
    const errorBody = await response.json();
    if (typeof errorBody?.message === "string") {
      message = errorBody.message;
    }
  } catch (error) {
    message = response.status === 401 ? "Unauthorized" : fallback;
  }

  return message;
}
