import useRoleMiddleware from "@/components/ProtectedRoute";
import { api } from "@/utils/axios";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const CreateProductsPage = () => {
  useRoleMiddleware("admin");

  const { handleSubmit, control } = useForm();
  const router = useRouter();

  const handleFormSubmit = async (data) => {
    try {
      const images = data.images.split(",").map((value) => {
        return {
          url: value,
        };
      });

      data.images = images;
      data.sizes = [];
      data.extra_fields = [];
      console.log(data);

      const product = (await api.post("/product", data)).data;
      console.log(product);
      await router.push("/admin/products");
      toast.success("Product Created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Some error occured");
    }
  };

  return (
    <form
      className="space-y-3 w-1/2 shadow-lg p-5 mx-auto"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Create Product
      </h3>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name:
        </label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description:
        </label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Secondary Description:
        </label>
        <Controller
          name="secondary_description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Price:
        </label>
        <Controller
          name="price"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
              step="0.01"
            />
          )}
        />
      </div>

      {/* <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
Images:</label>
              <Controller
                name="images"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <input type="file" multiple {...field} />
                )}
              />
            </div> */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Images (comma separated)
        </label>
        <Controller
          name="images"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Category:
        </label>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Bestseller:
        </label>
        <Controller
          name="bestseller"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <input type="checkbox" className="mx-3" {...field} />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Has Discount:
        </label>
        <Controller
          name="has_discount"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <input type="checkbox" className="mx-3" {...field} />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Discounted Price:
        </label>
        <Controller
          name="discounted_price"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
              step="0.01"
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Quantity Available:
        </label>
        <Controller
          name="quantity_available"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...field}
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Product
      </button>
    </form>
  );
};

export default CreateProductsPage;
