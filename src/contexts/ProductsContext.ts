import { Product } from "@/lib/product";
import { createContext, useContext } from "react";

interface ProductsContextType {
  products: Product[];
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
});

export const useProductsContext = () => useContext(ProductsContext);
