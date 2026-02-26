import { JSX } from "react/jsx-runtime";

export interface shipping {
  details: string ;
  phone: string ;
  city: string ;
}

export interface Root {
  results: number
  metadata: Metadata
  data: ProductType[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface ProductType {
  sold?: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: categoryType
  brand: BrandType
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export type categoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type BrandType = {
  id: string;
  name: string;
  slug: string;
  image: string;
};
