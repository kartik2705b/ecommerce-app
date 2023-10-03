import LetsChatButton from "@/components/LetsChatButton";
import ProductCard from "@/components/ProductCard";
import { useProductsContext } from "@/contexts/ProductsContext";
import useFetch from "@/hooks/useFetch";
import { Product } from "@/lib/product";
import product_data from "@/lib/product_data";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const getServerSideProps: GetServerSideProps<{
  products: Product[];
  category: string;
  total_pages: number;
  page: number;
  search: string;
}> = async (context) => {
  const category = context.query.category || "";
  const page = context.query.page || 1;
  const search = context.query.search || "";

  console.log(category, page, search);

  console.log(page);

  const res = await fetch(
    `http://localhost:9001/product/search?search=${search}&page=${page}&category=${category}`
  );
  const data = await res.json();
  console.log(data);

  if (data) {
    return {
      props: {
        total_pages: data.total_pages,
        products: data.products,
        category,
        page,
        search,
      },
    };
  }
  return {
    props: {
      products: [],
      category: category,
      total_pages: 0,
      page,
      search,
    },
  };
};

function ListingPage({
  products,
  category,
  total_pages,
  page,
  search,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    console.log(category, total_pages, page, search);
  }, []);
  return (
    <>
      <div className="my-20 flex flex-col justify-center items-center">
        <div className="bg-orange-600 w-60 h-2 relative">
          <h1 className="absolute left-12 -top-7 text-center font-bold text-4xl text-black ">
            {category || "All"}
          </h1>
        </div>
      </div>
      <div className="absolute right-12 top-80 hidden lg:block z-10">
        <LetsChatButton></LetsChatButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-16">
        {products?.map((product, idx) => {
          return (
            <ProductCard
              key={idx}
              product={product}
              id={product._id}
            ></ProductCard>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t mt-10 border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
          <div></div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {Array.from({ length: total_pages }, (_, i) => i + 1).map(
                (val, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={`/listing?search=${search}&category=${category}&page=${val}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      {val}
                    </Link>
                  );
                }
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingPage;
