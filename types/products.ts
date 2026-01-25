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
  itemType: "selling" | "renting";
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
  sellingPrice?: number;
  lendingPrice?: number;
  rentUnit?: "month" | "week" | "day" | "hour";
  photos?: string[];
  mainPhotoIndex?: 0 | 1 | 2;
}

export interface IUpdateProductInput extends Partial<ICreateProductInput> {
  id: string;
}
