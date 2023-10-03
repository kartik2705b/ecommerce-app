export type Product = {
  _id: string;
  name: string;
  sku_id: string;
  description: string;
  secondary_description: string;
  price: number;
  images: Array<{ url: string }>;
  category: "men" | "women";
  bestseller: boolean;
  has_discount: boolean;
  discounted_price: number;
  colors: Array<string>;
  sizes: Array<string>;
  quantity_available: number;
  extra_fields: Array<{ title: string; description: string }>;
};
