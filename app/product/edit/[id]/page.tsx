import { NewItemForm } from "@/components/atomic/organisms";
import { Container } from "@/components/atomic/organisms";
import {
  getCategories,
  getCities,
  getCurrentUser,
  getItemDetailById,
} from "@/services";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieHeader = (await cookies()).toString();
  const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

  const [
    itemResponse,
    currentUserResponse,
    categoriesResponse,
    citiesResponse,
  ] = await Promise.all([
    getItemDetailById(id),
    getCurrentUser({ headers: authHeaders }),
    getCategories(),
    getCities(),
  ]);

  if (!itemResponse.success || !itemResponse.data) {
    notFound();
  }

  if (!currentUserResponse.success || !currentUserResponse.data) {
    notFound();
  }

  const item = itemResponse.data;
  const isOwner =
    String(item.owner?.id) === String(currentUserResponse.data.id);

  if (!isOwner) {
    notFound();
  }

  const initialValues = {
    title: item.title,
    categoryId: String(item.categoryId ?? ""),
    brandName: item.brandName,
    condition: item.condition,
    description: item.description,
    address: item.address,
    cityId: String(item.cityId ?? ""),
    itemType: item.itemType,
    sellingPrice:
      typeof item.sellingPrice === "number"
        ? String(item.sellingPrice)
        : undefined,
    lendingPrice:
      typeof item.lendingPrice === "number"
        ? String(item.lendingPrice)
        : undefined,
    rentUnit: item.rentUnit,
  };

  const categories = categoriesResponse.success
    ? categoriesResponse.data.categories
    : [];
  const cities = citiesResponse.success ? citiesResponse.data.cities : [];

  return (
    <Container>
      <section className="mt-[80px] w-full">
        <NewItemForm
          type="post"
          mode="edit"
          itemId={id}
          initialValues={initialValues}
          categories={categories}
          cities={cities}
        />
      </section>
    </Container>
  );
}
