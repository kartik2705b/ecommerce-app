import { Product } from "@/lib/product";
import { createContext, useContext } from "react";

interface CartContextType {
  cartOpen: boolean;
  setCartOpen: Function;
  addProductToCart: Function;
  cartProducts: Product[];
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
