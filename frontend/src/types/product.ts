export type ProductData = {
  id: number;
  product_id: string;
  product_url: ProductImage[];
  product_name: string;
  product_price: number;
  documentId: string;
};

export type ProductImage = {
  width: number;
  height: number;
  size: number;
  url: string;
};