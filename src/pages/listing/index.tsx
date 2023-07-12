import LetsChatButton from "@/components/LetsChatButton";
import ProductCard from "@/components/ProductCard";
import { useProductsContext } from "@/contexts/ProductsContext";
import product_data from "@/lib/product_data";
import React from "react";

const ListingPage = () => {
  const { products } = useProductsContext();

  return (
    <>
      <div className="my-20 flex flex-col justify-center items-center">
        <div className="bg-orange-600 w-60 h-2 relative">
          <h1 className="absolute left-12 -top-7 text-center font-bold text-4xl text-black ">
            WOMEN
          </h1>
        </div>
      </div>
      <div className="absolute right-12 top-80 hidden lg:block z-10">
        <LetsChatButton></LetsChatButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-16">
        {products.map((product, idx) => {
          return (
            <ProductCard key={idx} product={product} id={idx}></ProductCard>
          );
        })}
      </div>
    </>
  );
};

export default ListingPage;
