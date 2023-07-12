import CheckoutCard from "@/components/CheckoutCard";
import { useCartContext } from "@/contexts/CartContext";
import React from "react";

const CheckoutPage = () => {
  const { cartProducts, total } = useCartContext();

  return (
    <div className="flex justify-center text-sm text-gray-800">
      <div className="w-full  lg:w-4/5 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h1 className="text-lg mb-2">My Cart</h1>
            <hr />
            {cartProducts.map((product, idx) => {
              return (
                <CheckoutCard
                  key={idx}
                  product={product}
                  id={idx}
                ></CheckoutCard>
              );
            })}
            <div className="flex gap-3 text-orange-500 items-center mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
              </svg>
              <p>Enter a promo code</p>
            </div>

            <div className="flex gap-3 text-orange-500 items-center mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
              </svg>
              <p>Add a note</p>
            </div>
          </div>
          <div className="">
            <h1 className="text-lg mb-2">Order Summary</h1>
            <hr />
            <div className="mt-5 flex items-center justify-between">
              <h1>Subtotal</h1>
              <h1>${total}</h1>
            </div>
            <p className="underline my-3">Estimate Shipping</p>
            <hr />
            <div className="mt-5 mb-5 flex items-center justify-between">
              <h1>Total</h1>
              <h1>${total}</h1>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 block h-10 w-full">
              Checkout
            </button>
            <div className="text-center font-bold text-lg mt-3 flex items-cente justify-center">
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
