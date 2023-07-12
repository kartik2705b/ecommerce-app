import { Product } from "@/lib/product";
import React from "react";

const CartCard = ({ product, id }: { product: Product; id: number }) => {
  return (
    <>
      <div className="flex">
        <img src={product.url} alt="" className="w-20 h-24" />
        <div className="px-3">
          <h1 className="text-gray-500">{product.product_name}</h1>
          <p>${product.price}</p>
          <div className="border-2 border-black mt-2 flex items-center justify-center">
            <button className="text-base font-bold px-2 py-1">-</button>
            <input
              type="number"
              name=""
              id=""
              placeholder="1"
              className="focus:outline-none w-8"
            />
            <button className="text-base font-bold px-2 py-1">+</button>
          </div>
        </div>
      </div>
      <hr className="my-6" />
    </>
  );
};

export default CartCard;
