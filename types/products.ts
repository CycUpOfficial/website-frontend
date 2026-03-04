export interface IProduct {
  id: string;
  title: string;
  categoryId: string;
  category: string;
  brandName: string;
  condition: "used" | "new";
  description: string;
  address: string;
  cityId: string;
  city: string;
  itemType: "selling" | "lending" | "giveaway";
  sellingPrice: number;
  lendingPrice: number;
  rentUnit: "month" | "week" | "day" | "hour";
  photos: {
    url: string;
    isMain: boolean;
  }[];
  status: "published" | "pending";
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    firstName: string;
    familyName: string;
    email: string;
  };
}

export type ItemType = "selling" | "lending" | "giveaway";
export type ItemCondition = "used" | "new";

export interface ItemSummary {
  id: number;
  title: string;
  mainImage: string;
  sellingPrice: number;
  lendingPrice: number;
  itemType: string;
  rentUnit: string;
  city: string;
  createdAt: string;
}

export interface ItemPhoto {
  url: string;
  isMain: boolean;
}

export interface ItemOwner {
  id: number;
  firstName: string;
  familyName: string;
  email: string;
}

export interface ItemDetail {
  id: string;
  title: string;
  categoryId: string;
  category: string;
  brandName: string;
  condition: ItemCondition;
  description: string;
  address: string;
  cityId: number;
  city: string;
  itemType: ItemType;
  sellingPrice: number;
  lendingPrice: number;
  rentUnit: "month" | "week" | "day" | "hour";
  photos: ItemPhoto[];
  status: "published" | "pending";
  createdAt: string;
  updatedAt: string;
  owner: ItemOwner;
}

export interface ProductDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
  price: number;
  location: string;
  owner: {
    username: string;
    profilePic: string;
    university: string;
    location: string;
  };
}

export interface ItemsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchItemsQuery {
  search?: string;
  categoryId?: string;
  city?: string;
  itemType?: ItemType;
  condition?: ItemCondition;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "date";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface SearchItemsResponse {
  items: ItemSummary[];
  pagination: ItemsPagination;
  props: ItemProps;
}

export interface ItemProps {
  minPrice: number;
  maxPrice: number;
}

export interface ItemCategory {
  id: string;
  name: string;
  children: CategoryChildren[];
}
export interface CategoryChildren {
  id: string;
  name: string;
}

export interface ItemCity {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  categories: ItemCategory[];
}

export interface CitiesResponse {
  cities: ItemCity[];
}

export interface SampleProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: IProductImages[];
  price: number;
  location: string;
  owner: IProductOwner;
}

export interface IProductImages {
  src: string;
  alt: string;
}

export interface IProductOwner {
  username: string;
  profilePic: string;
  university: string;
  location: string;
}

export interface ICreateProductInput {
  title: string;
  categoryId: string;
  brandName: string;
  condition: "used" | "new";
  description: string;
  address: string;
  cityId: string;
  itemType: "selling" | "lending" | "giveaway";
  sellingPrice?: number;
  lendingPrice?: number;
  rentUnit?: "month" | "week" | "day" | "hour";
  photos?: string[];
  mainPhotoIndex?: 0 | 1 | 2;
}

export interface IUpdateProductInput extends Partial<ICreateProductInput> {
  id: string;
}
