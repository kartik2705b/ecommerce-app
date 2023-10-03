import { Product } from "@/lib/product";
import React from "react";

const CartCard = ({
  product,
  id,
  quantity,
}: {
  product: Product;
  id: string;
  quantity: number;
}) => {
  return (
    <>
      <div className="flex">
        <img src={product.images[0].url} alt="" className="w-20 h-24" />
        <div className="px-3">
          <h1 className="text-gray-500">{product.name}</h1>
          <p>${product.price}</p>
          <div className="border-2 border-black mt-2 flex items-center justify-center">
            Quantity : {quantity}
          </div>
        </div>
      </div>
      <hr className="my-6" />
    </>
  );
};

export default CartCard;
