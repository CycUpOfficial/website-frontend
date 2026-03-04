import { HomePageTemplate } from "@/components/atomic/templates";
import {
  buildSearchItemsQuery,
  mapItemsToSampleProducts,
} from "@/lib/search-items";
import { SearchParamValue } from "@/lib/utils";
import { getCategories, getCities, searchItems } from "@/services";
import { ItemCategory, ItemCity } from "@/types";

interface HomePageProps {
  searchParams: Promise<Record<string, SearchParamValue>>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const { query, currentPage } = buildSearchItemsQuery(params);

  const [itemsResponse, categoriesResponse, citiesResponse] = await Promise.all(
    [searchItems(query), getCategories(), getCities()],
  );

  const products = itemsResponse.success
    ? mapItemsToSampleProducts(itemsResponse.data.items)
    : [];
  const itemProps = itemsResponse.success
    ? itemsResponse.data.props
    : { minPrice: 0, maxPrice: 5000 };
  const totalPages = itemsResponse.success
    ? itemsResponse.data.pagination.totalPages
    : 1;
  const page = itemsResponse.success
    ? itemsResponse.data.pagination.page
    : currentPage;

  const categories: ItemCategory[] = categoriesResponse.success
    ? categoriesResponse.data.categories
    : [];
  const cities: ItemCity[] = citiesResponse.success
    ? citiesResponse.data.cities
    : [];

  return (
    <HomePageTemplate
      title="Marketplace Gallery"
      description="Discover unique artwork from talented vendors around the world"
      products={products}
      categories={categories}
      cities={cities}
      itemProps={itemProps}
      currentPage={page}
      totalPages={totalPages}
      columns={4}
      gap="md"
    />
  );
}
