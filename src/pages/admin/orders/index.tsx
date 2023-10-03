import AdminNavbar from "@/components/AdminNavbar";
import useRoleMiddleware from "@/components/ProtectedRoute";
import { api } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  useRoleMiddleware("admin");

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const output = (await api.get(`/order/allorders?page=${page}`)).data;
      const orders = output.orders;
      console.log(orders);
      setOrders([...orders]);
      setTotalPages(output.total_pages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <h1 className="text-4xl font-extrabold dark:text-white">Orders</h1>
      <h1 className="text-xl my-4">Page : {page}</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date Ordered
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              let style;

              if (order?.status === "cancelled") {
                style = " bg-red-500 text-white hover:bg-red-700 ";
              } else if (order?.status === "delivered") {
                style = " bg-green-500 text-white hover:bg-green-700 ";
              } else {
                style = " bg-white ";
              }

              return (
                <tr
                  key={order._id}
                  className={
                    " border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 " +
                    style
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order?._id}
                  </th>
                  <td className="px-6 py-4">{order?.total_amount}</td>
                  <td className="px-6 py-4">{order?.createdAt}</td>
                  <td className="px-6 py-4">{order?.status}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="px-3 py-1 bg-blue-700 text-white h-9"
                      onClick={() =>
                        router.push(`/admin/orders/update/${order._id}`)
                      }
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </>
  );
};

export default AdminOrders;
