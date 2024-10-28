export type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
};

export type TypeProductsRespnse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};
