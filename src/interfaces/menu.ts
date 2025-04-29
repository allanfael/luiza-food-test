import { Store } from "./store";

export type Size = {
  name: string;
  price: string;
  discountPrice?: string;
};

export type Food = {
  id: number;
  name: string;
  description: string;
  price?: number;
  discountPrice?: number;
  initialPrice?: number;
  type?: string;
  fullName?: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  fullName?: string;
  size?: Size[];
  foods?: Food[];
  isPortion?: boolean;
};

export type StoreWithProducts = {
  store: Store;
  products: Product[];
};
