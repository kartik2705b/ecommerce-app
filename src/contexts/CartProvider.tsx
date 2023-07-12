import React, { PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { Product } from "@/lib/product";

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const addProductToCart = (product: Product) => {
    console.log(product);
    setCartProducts([...cartProducts, product]);
  };

  const removeFromCart = (id: number) => {
    const remProducts = cartProducts.filter((product, idx) => idx !== id);
    setCartProducts(remProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        addProductToCart,
        cartProducts,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
