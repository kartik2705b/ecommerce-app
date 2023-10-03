import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/utils/axios";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setToken, setLoggedIn, user, setUser } = useAuthContext();
  const router = useRouter();

  const handleLogin = async (data: any) => {
    // e.preventDefault();
    try {
      const { email, password } = data;
      const output = (await api.post("/user/login", { email, password })).data;
      const token = output.token;
      console.log(token);
      setToken(token);
      setLoggedIn(true);
      setUser(output.user);
      api.defaults.headers.common = { Authorization: token };
      console.log(token, output.user, output);
      localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));

      await router.push("/");
      toast.success("Logged in successfully!");
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("User not authorized to login");
        return;
      }
      toast.error("Some error occured!");
    }
    // console.log("form submitted", email, password);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: true,
                    pattern: RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
                  })}
                />
                {errors.email && (
                  <span className="block bg-red-900 text-white px-3 py-1 rounded-sm my-2">
                    Email required
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password && (
                  <span className="block bg-red-900 text-white px-3 py-1 rounded-sm my-2">
                    Password required with min length 8
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                {/* <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href={"/signup"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
