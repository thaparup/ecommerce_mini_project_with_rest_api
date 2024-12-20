import { SingleProductType } from "./typeSingleProduct";
export type SearchQueryType = {
  limit: number;
  products: SingleProductType[];
  skip: number;
  total: number;
};
