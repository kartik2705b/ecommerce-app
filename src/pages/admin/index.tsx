import AdminNavbar from "@/components/AdminNavbar";
import useRoleMiddleware from "@/components/ProtectedRoute";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AdminPage = () => {
  const [active, setActive] = useState("users");
  const { user } = useAuthContext();
  useRoleMiddleware("admin");

  return (
    <>
      <AdminNavbar></AdminNavbar>
      {/* <nav className="bg-gray-800"> */}
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div>
                <button
                  onClick={() => setActive("users")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Users
                </button>
                <button
                  onClick={() => setActive("products")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Products
                </button>
              </div>
              <div>
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Create User
                </button>
              </div>
            </div>
          </div>
        </nav>

        <header className="bg-white shadow">{data[active]}</header>
        <main></main> */}
      {/* </div> */}
    </>
  );
};

export default AdminPage;
