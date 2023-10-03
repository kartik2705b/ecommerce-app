import React, { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "@/utils/axios";
import { useCartContext } from "./CartContext";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { updateCart } = useCartContext();

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token") || "";

      const currUser = (
        await api.get("/user/me", {
          headers: {
            Authorization: token,
          },
        })
      ).data;

      setUser(currUser);
      updateCart(currUser.cart);
      setLoggedIn(true);
      setToken(token);
      api.defaults.headers.common = { Authorization: token };
    } catch (err) {
      console.log("not auth");
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, loggedIn, setLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
