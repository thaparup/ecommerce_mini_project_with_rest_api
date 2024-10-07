export type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
};

export type TypeProductsRespnseObject = {
  products: Product[];
  limit: number;
  skip: number;
};
