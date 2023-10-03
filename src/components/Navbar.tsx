import { useAuthContext } from "@/contexts/AuthContext";
import { useCartContext } from "@/contexts/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const [visible, setVisible] = useState(false);
  const { cartOpen, setCartOpen, cartProducts, quantity } = useCartContext();
  const { loggedIn, setLoggedIn, setUser, user, setToken } = useAuthContext();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setToken("");
    localStorage.removeItem("token");

    router.push("/login");
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("search");
    await router.push(`/listing?search=${search}&page=1`);
  };

  return (
    <>
      <nav className=" pb-2 mt-8 flex flex-row justify-between items-center lg:justify-between lg:items-center lg:flex-row  font-medium text-gray-500">
        <div className="flex">
          <span className="bg-black text-white px-2 py-2 font-medium tracking-wider">
            <Link href="/">NOUS</Link>
          </span>
          <div className="flex items-center ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="20"
              width="20"
            >
              {" "}
              <path
                fill="var(--ci-primary-color, currentColor)"
                d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"
              />{" "}
            </svg>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                className="ml-1 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="flex gap-10 text-sm flex-col lg:flex-row items-center justify-center mt-10 lg:mt-0 ">
          <ul className="flex gap-4 flex-col lg:flex-row">
            <li>
              <Link href="/listing">Shop All</Link>
            </li>
            <li>
              <Link href="/listing?category=women">Women</Link>
            </li>
            <li>
              <Link href="/listing?category=men">Men</Link>
            </li>
            <li>Sale</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <div className="flex">
            <div className="flex gap-2 items-center flex-row mr-4 mb-2 lg:mb-0">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="20"
                width="20"
              >
                {" "}
                <g>
                  {" "}
                  <path fill="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{" "}
                </g>{" "}
              </svg> */}
              {loggedIn ? (
                <div className="flex gap-3">
                  <Link
                    href={"/orders"}
                    className="bg-orange-700 text-white px-2 py-1 rounded-sm shadow-lg"
                  >
                    Orders
                  </Link>
                  <Link
                    href={"/account"}
                    className="bg-orange-700 text-white px-2 py-1 rounded-sm shadow-lg"
                  >
                    Account
                  </Link>
                </div>
              ) : (
                <Link
                  href={"/login"}
                  className="bg-orange-700 text-white px-2 py-1 rounded-sm shadow-lg"
                >
                  Log In
                </Link>
              )}

              {user?.role === "admin" && (
                <Link
                  href={"/admin/products"}
                  className="bg-orange-700 text-white px-2 py-1 rounded-sm shadow-lg"
                >
                  Admin
                </Link>
              )}
              {loggedIn && (
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 text-white px-2 py-1 rounded-sm shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
            {loggedIn && (
              <div
                onClick={() => setCartOpen(!cartOpen)}
                className="relative w-12 h-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="text-black left-0 top-0"
                >
                  {" "}
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />{" "}
                </svg>
                <div className="bg-black text-white w-5 h-5 flex items-center justify-center font-bold rounded-full absolute top-0 right-0">
                  {quantity}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
