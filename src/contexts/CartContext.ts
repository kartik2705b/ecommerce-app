import { Product } from "@/lib/product";
import { createContext, useContext } from "react";
import { CartData } from "./CartProvider";

interface CartContextType {
  cartOpen: boolean;
  setCartOpen: Function;
  addProductToCart: Function;
  cartProducts: CartData;
  removeFromCart: Function;
  total: number;
}

export const CartContext = createContext<CartContextType>({
  cartOpen: false,
  setCartOpen: () => {},
  addProductToCart: () => {},
  cartProducts: [],
  removeFromCart: () => {},
  total: 0,
});

export const useCartContext = () => useContext(CartContext);
