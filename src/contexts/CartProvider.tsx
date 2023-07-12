import React, { PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { Product } from "@/lib/product";

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const addProductToCart = (product: Product) => {
    console.log(product);
    setCartProducts([...cartProducts, product]);
  };

  const calculateTotal = () => {
    let currTotal = 0;
    cartProducts.forEach((product) => {
      currTotal += product.price;
    });
    setTotal(currTotal);
  };

  const removeFromCart = (id: number) => {
    const remProducts = cartProducts.filter((product, idx) => idx !== id);
    setCartProducts(remProducts);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
