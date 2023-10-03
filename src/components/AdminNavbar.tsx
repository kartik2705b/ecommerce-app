import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="my-5 z-0">
      {/* <div className="flex gap-2"> */}
      <Link
        href="/admin/products"
        className="bg-gray-900 mx-2 text-white rounded-md px-3 py-2 text-sm font-medium -z-10"
        aria-current="page"
      >
        Products
      </Link>
      <Link
        href="/admin/users"
        className="bg-gray-900 mx-2 text-white rounded-md px-3 py-2 text-sm font-medium -z-10"
        aria-current="page"
      >
        Users
      </Link>
      <Link
        href="/admin/orders"
        className="bg-gray-900 mx-2 text-white rounded-md px-3 py-2 text-sm font-medium -z-10"
        aria-current="page"
      >
        Orders
      </Link>
      {/* </div> */}
    </nav>
  );
};

export default AdminNavbar;
