import AdminNavbar from "@/components/AdminNavbar";
import useRoleMiddleware from "@/components/ProtectedRoute";
import { api } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UsersPage = () => {
  useRoleMiddleware("admin");

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const output = (await api.get(`/user?page=${page}`)).data;
      const users = output.users;

      setUsers([...users]);
      setTotalPages(output.total_pages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const ouput = (await api.post(`/user/change/access/${id}`)).data;
      await fetchUsers();
      toast.success("Access updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Some error occured");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <h1 className="text-4xl font-extrabold dark:text-white">Users</h1>
      <h1 className="text-xl my-4">Page : {page}</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Access
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              let style = "";

              return (
                <tr
                  key={user._id}
                  className={
                    " border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600" +
                    style
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user?.email}
                  </th>
                  <td className="px-6 py-4">{user?.phone}</td>
                  <td className="px-6 py-4">{user?.role}</td>
                  <td className="px-6 py-4">
                    {user?.role !== "admin" && (
                      <button
                        className="bg-yellow-500 font-bold px-1 py-1 text-white rounded-md"
                        onClick={() => handleApprove(user?._id)}
                      >
                        Approve Admin Access
                      </button>
                    )}
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

export default UsersPage;
