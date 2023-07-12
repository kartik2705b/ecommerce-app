import { useCartContext } from "@/contexts/CartContext";
import { Product } from "@/lib/product";
import React from "react";

const CheckoutCard: React.FC<{ product: Product; id: number }> = ({
  product,
  id,
}) => {
  const { removeFromCart } = useCartContext();

  const remove = () => {
    removeFromCart(id);
  };

  return (
    <div>
      <div className="flex gap-5 my-5">
        <img src={product.url} alt="" className="w-40 h-48" />
        <div className="flex-1 flex flex-col sm:flex-row justify-between">
          <div>
            <p className="mb-4">{product.product_name}</p>
            <p>$31</p>
            <p className="text-gray-600 text-sm">Size: Medium</p>
          </div>
          <div>
            <div className="flex items-center gap-10">
              <div className="border-2 border-black">
                <button className="text-base font-bold px-2 py-1">-</button>
                <input
                  type="number"
                  name=""
                  id=""
                  className="focus:outline-none w-8"
                />
                <button className="text-base font-bold px-2 py-1">+</button>
              </div>
              <h1>${product.price}</h1>
              <button className="w-7 h-7" onClick={remove}>
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CheckoutCard;
