import { Product } from "@/lib/product";
import { createContext, useContext } from "react";

interface CartContextType {
  cartOpen: boolean;
  setCartOpen: Function;
  addProductToCart: Function;
  cartProducts: Product[];
  removeFromCart: Function;
}

export const CartContext = createContext<CartContextType>({
  cartOpen: false,
  setCartOpen: () => {},
  addProductToCart: () => {},
  cartProducts: [],
  removeFromCart: () => {},
});

export const useCartContext = () => useContext(CartContext);
