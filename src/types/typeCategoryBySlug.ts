import { SingleProductType } from "./typeSingleProduct";
export type CategoryBySlugType = {
  limit: number;
  products: SingleProductType[];
  skip: number;
  total: number;
};
