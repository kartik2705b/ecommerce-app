import React, { PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { Product } from "@/lib/product";
import { api } from "@/utils/axios";

export type CartData = Array<{ product: Product; quantity: number }>;

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartData>([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const addProductToCart = async (product: Product, quantity: number) => {
    try {
      const data = (
        await api.post("/cart/add", {
          product: product._id,
          quantity: quantity,
        })
      ).data;

      console.log(product);
      setCartProducts([...cartProducts, { product, quantity }]);
      setQuantity((prev) => prev + quantity);
    } catch (err) {
      console.log("add to cart failed");
    }
  };

  const calculateTotal = () => {
    let currTotal = 0;
    cartProducts.forEach((data) => {
      currTotal += data.product.price * data.quantity;
    });
    setTotal(currTotal);
  };

  const removeFromCart = async (id: string) => {
    try {
      const data = await api.delete(`/cart/remove/${id}`);
      const remProducts = cartProducts.filter(
        (data) => data.product._id !== id
      );
      setCartProducts([...remProducts]);
      let total = 0;
      remProducts.forEach((curr) => {
        total += curr.quantity;
      });
      setQuantity(total);
    } catch (err) {
      console.log("err");
    }
    // const remProducts = cartProducts.filter((product, idx) => idx !== id);
    // setCartProducts(remProducts);
  };

  const updateCart = (cart: CartData) => {
    setCartProducts(cart);

    let total = 0;
    cart.forEach((curr) => {
      total += curr.quantity;
    });
    setQuantity(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        addProductToCart,
        cartProducts,
        removeFromCart,
        total,
        updateCart,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
