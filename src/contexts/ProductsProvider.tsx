import React, { PropsWithChildren, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import product_data from "@/lib/product_data";
import { Product } from "@/lib/product";

const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(product_data);
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
