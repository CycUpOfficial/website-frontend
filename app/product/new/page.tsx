import { NewProductTemplate } from "@/components/atomic/templates";
import { getCategories, getCities } from "@/services";

export default async function NewProductPage() {
  const [categoriesResponse, citiesResponse] = await Promise.all([
    getCategories(),
    getCities(),
  ]);

  const categories = categoriesResponse.success
    ? categoriesResponse.data.categories
    : [];
  const cities = citiesResponse.success ? citiesResponse.data.cities : [];

  return <NewProductTemplate categories={categories} cities={cities} />;
}
