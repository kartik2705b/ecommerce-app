import { api } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const UpdateUserPage = () => {
  const [phone, setPhone] = useState(0);
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const data = await api.patch("/user/update", {
        phone: phone,
      });

      console.log(data);
      toast.success("User details updated successfully!");
      await router.push("/account");
      await router.reload();
    } catch (err) {
      console.log(err);
      toast.error("some error occured");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update User Data
            </h2>
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                onChange={(e) => setPhone(parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleUpdate}
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPage;
