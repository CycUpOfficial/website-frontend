"use server";

import {
  ApiResponse,
  ICreateProductInput,
  IProduct,
  IUpdateProductInput,
} from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function createProduct(
  input: ICreateProductInput
): Promise<ApiResponse<IProduct>> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        data: null as unknown as IProduct,
        error: error.message,
      };
    }

    const data = await response.json();

    // Revalidate products list
    revalidateTag("products", "max");

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      data: null as unknown as IProduct,
      error:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

// Update a product (vendor only)
export async function updateProduct(
  input: IUpdateProductInput
): Promise<ApiResponse<IProduct>> {
  try {
    const { id, ...updateData } = input;

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: await getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        data: null as unknown as IProduct,
        error: error.message,
      };
    }

    const data = await response.json();

    // Revalidate specific product and list
    revalidateTag(`product-${id}`, "max");
    revalidateTag("products", "max");

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      data: null as unknown as IProduct,
      error:
        error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

// Delete a product (vendor only)
export async function deleteProduct(
  productId: string
): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, data: null, error: error.message };
    }

    // Revalidate products list
    revalidateTag("products", "max");
    revalidateTag(`product-${productId}`, "max");

    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

// export async function filterProducts(
//   filters: ProductFilters,
//   page = 1,
//   pageSize = 12
// ): Promise<PaginatedResponse<Product>> {
//   const params = new URLSearchParams({
//     page: String(page),
//     pageSize: String(pageSize),
//   });

//   if (filters.search) params.set("search", filters.search);
//   if (filters.category) params.set("category", filters.category);
//   if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
//   if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));
//   if (filters.rating) params.set("rating", String(filters.rating));
//   if (filters.sortBy) params.set("sortBy", filters.sortBy);
//   if (filters.tags?.length) params.set("tags", filters.tags.join(","));

//   const response = await fetch(`${API_URL}/products?${params}`, {
//     headers: await getAuthHeaders(),
//     cache: "no-store", // Always fresh for filtered results
//   });

//   if (!response.ok) {
//     throw new Error("Failed to filter products");
//   }

//   return response.json();
// }
