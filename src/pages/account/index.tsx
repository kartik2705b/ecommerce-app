import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/utils/axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";

const AccountPage = () => {
  const router = useRouter();
  console.log(router.pathname);
  const { user, setLoggedIn, setUser, setToken } = useAuthContext();
  console.log(user);

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setToken("");
    localStorage.removeItem("token");

    router.push("/login");
  };

  const handleDelete = async () => {
    try {
      const data = (await api.delete("/user/delete")).data;
      toast.success("User deleted");

      handleLogout();
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div>
      <h2 className="mt-6 mx-10 text-3xl font-extrabold text-gray-900">
        Account
      </h2>
      <div className="container p-8">
        <div className="max-w-lg  bg-white rounded p-8 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-4">User Information</h1>
            <button
              onClick={() => router.push("/account/update")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update User Details
            </button>
          </div>
          <div className="mb-4">
            <span className="text-gray-600">ID:</span>
            <p className="text-gray-800">{user?._id}</p>
          </div>
          <div className="mb-4">
            <span className="text-gray-600">Email:</span>
            <p className="text-gray-800">{user?.email}</p>
          </div>
          <div className="mb-4">
            <span className="text-gray-600">Phone:</span>
            <p className="text-gray-800">{user?.phone}</p>
          </div>
          <div className="mb-4">
            <span className="text-gray-600">Role:</span>
            <p className="text-gray-800">{user?.role}</p>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-gray-600">Deleted:</span>
              <p className="text-gray-800">{user?.isDeleted ? "Yes" : "No"}</p>
            </div>

            <button
              className="bg-red-800 text-white px-3 py-1"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
