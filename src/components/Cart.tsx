import Link from "next/link";
import React from "react";
import CartCard from "./CartCard";
import { useCartContext } from "@/contexts/CartContext";

interface Props {}

const Cart: React.FC<Props> = ({}) => {
  const { cartOpen, setCartOpen, cartProducts, total } = useCartContext();

  return (
    <div
      className="relative w-full my-5 lg:my-0 
     lg:absolute lg:top-0 lg:right-28 lg:w-80 z-20 bg-white border"
    >
      <div className="bg-black text-white text-center  items-center flex justify-between px-3 py-3">
        <button className="px-2 py-2" onClick={() => setCartOpen(!cartOpen)}>
          {">"}
        </button>
        <p>Cart</p>
        <div></div>
      </div>
      <div className="px-3 py-3">
        {cartProducts.map((data, idx) => {
          return (
            <CartCard
              key={idx}
              product={data.product}
              id={data.product._id}
              quantity={data.quantity}
            ></CartCard>
          );
        })}

        <p className="mt-16">Subtotal</p>
        <p>${total}</p>
      </div>
      <hr />
      <Link
        href="/checkout"
        className="bg-orange-500 text-white text-center mx-6 my-6 px-4 py-2 block h-10 "
      >
        View Cart
      </Link>
    </div>
  );
};

export default Cart;
