import AdminNavbar from "@/components/AdminNavbar";
import CreateProductsModal from "@/components/CreateProductsModal";
import Modal from "@/components/Modal";
import ProductModal from "@/components/ProductModal";
import useRoleMiddleware from "@/components/ProtectedRoute";
import { Product } from "@/lib/product";
import { api } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProductsPage = () => {
  useRoleMiddleware("admin");

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateID] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const { handleSubmit, control } = useForm();
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const data = (await api.get(`/product?page=${page}`)).data;
      setProducts([...data.products]);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.log("error occcured");
      toast.error("Some error occured");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const data = (await api.delete(`/product/${id}`)).data;
      await fetchProducts();
      toast.success("Product Deleted Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Some error occured");
    }
  };

  const updateProduct = async (id: string) => {
    try {
    } catch (err) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      {/* <CreateProductsModal></CreateProductsModal> */}
      {open && (
        <ProductModal
          close={() => setOpen(!open)}
          productId={updateId}
          product={updatedProduct}
          fetchProducts={fetchProducts}
        ></ProductModal>
      )}
      <AdminNavbar></AdminNavbar>
      {/* <CreateProductsModal></CreateProductsModal> */}
      {/* h2 class=>Payments tool for companies</h2> */}

      <h1 className="text-4xl font-extrabold dark:text-white">Products</h1>

      <div className="flex items-center justify-between mt-5">
        <h1 className="text-xl">Page : {page}</h1>
        <button
          onClick={() => router.push("/admin/products/create")}
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Product
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                SKU
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr
                  key={product._id}
                  className="bg-white z-0 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    <img
                      className="h-12 w-12 flex-none object-cover bg-gray-50"
                      src={product.images[0].url}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.sku_id}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-600 font-bold px-1 py-1 text-white rounded-md"
                      onClick={() => {
                        setUpdateID(product._id);
                        setUpdatedProduct(product);
                        setOpen(true);
                      }}
                    >
                      Update Product
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-600 font-bold px-1 py-1 text-white rounded-md"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete Product
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <ul role="list" className="divide-y divide-gray-100 px-10 py-5">
        {products.map((product) => {
          return (
            <li
              key={product._id}
              className="flex justify-between gap-x-6 py-5 shadow-xl p-5 my-5"
            >
              <div className="flex gap-x-4">
                <img
                  className="h-12 w-12 flex-none bg-gray-50"
                  src={product.images[0].url}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {product.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    SKU : {product.sku_id}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    Price ${product.price}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 text-xs leading-5 flex gap-x-10 text-gray-500">
                  <button
                    className="bg-blue-600 font-bold px-5 py-1 text-white rounded-2xl"
                    onClick={() => {
                      setUpdateID(product._id);
                      setUpdatedProduct(product);
                      setOpen(true);
                    }}
                  >
                    Update Product
                  </button>
                  <button
                    className="bg-red-600 font-bold px-5 py-1 text-white rounded-2xl"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete Product
                  </button>
                </p>
              </div>
            </li>
          );
        })}
        <hr className="border-black border-2" />
      </ul> */}
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
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between z-0">
          <div></div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {Array.from({ length: total_pages }, (_, i) => i + 1).map(
                (val, idx) => {
                  return (
                    <button
                      onClick={() => setPage(val)}
                      key={idx}
                      // href={`/listing?search=${search}&category=${category}&page=${val}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      {val}
                    </button>
                  );
                }
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
