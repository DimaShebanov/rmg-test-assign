// for sake of readability
export type ImgUrl = string;
export type ProductSku = string;

export interface Product {
  sku: ProductSku;
  title: string;
  description: string;
  price: number;
  thumbnail: ImgUrl;
}

// intentionally ignoring all other fields from API as they are unrelated for specific task
export interface ProductsGetResponse {
  products: Product[];
}

export interface ProductsListContextType {
  products: Product[];
  productsMap: Record<ProductSku, Product>;
  isLoading: boolean;
  isError: boolean;
}
