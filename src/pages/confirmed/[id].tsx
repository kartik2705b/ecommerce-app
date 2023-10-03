import { api } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ConfirmedPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order_id = router.query.id;
        const orderData = (await api.get(`/order/${order_id}`)).data;
        console.log(orderData);
        setOrderDetails(orderData);
      } catch (err) {
        console.log(err);
      }
    };

    if (router.query.id) {
      fetchOrder();
    }
  }, [router.query.id]);

  if (!orderDetails) {
    return "err";
  }

  return (
    <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 flex gap-5  text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
        Your order is confirmed
      </h1>
      <div className="flex mt-5 justify-start item-start space-y-2 flex-col ">
        <h1 className="text-xl lg:text-xl font-semibold leading-7 lg:leading-9  text-gray-800">
          Order #{orderDetails._id}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600">
          {/* {orderDetails.createdAt} */}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Order Items
            </p>
            {orderDetails?.order_items.map((data) => {
              const product = data.product;
              const quantity = data.quantity;
              return (
                <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      className="w-full block"
                      src={product.images[0].url}
                      alt="dress"
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl xl:text-xl font-semibold leading-6 text-gray-800">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        ${product.price}
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        {quantity}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                        ${product.price * quantity}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">
                    ${orderDetails.total_amount}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">$0.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  ${orderDetails.total_amount}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 font-semibold text-gray-800">
                      Free Delivery
                      <br />
                      <span className="font-normal">
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 text-gray-800">
                  $0.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedPage;
