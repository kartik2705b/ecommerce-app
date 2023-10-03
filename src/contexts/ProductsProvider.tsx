import React, { PropsWithChildren, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import product_data from "@/lib/product_data";
import { Product } from "@/lib/product";
import { api } from "@/utils/axios";
import useFetch from "@/hooks/useFetch";

const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, error, loading } = useFetch({
    url: "/product",
  });

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
