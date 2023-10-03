import { Product } from "@/lib/product";
import { api } from "@/utils/axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const fields = [
  "name",
  "description",
  "secondary_description",
  "price",
  "category",
];

const ProductModal = ({
  close,
  productId,
  product,
  fetchProducts,
}: {
  product: Product;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = async (data: any) => {
    try {
      const output = (await api.patch(`/product/${productId}`, data)).data;
      fetchProducts();
      close();
      toast.success("Product Updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-20 bg-gray-600 flex items-center justify-center">
      <div id="authentication-modal" aria-hidden="true" className="w-1/2">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => close()}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Update Product {productId}
            </h3>
            <form className="space-y-3" onSubmit={handleSubmit(handleUpdate)}>
              {fields.map((field) => {
                return (
                  <div key={field}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product {field}
                    </label>
                    <input
                      type="text"
                      id={field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      {...register(field, {
                        required: true,
                        value: product[field],
                      })}
                    />
                  </div>
                );
              })}

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
