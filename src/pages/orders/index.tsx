import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/utils/axios";
import { data } from "autoprefixer";
import { error } from "console";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any>([]);
  const { token, loggedIn } = useAuthContext();

  const fetchOrders = async () => {
    try {
      console.log(token, loggedIn);
      const orders = (await api.get("/order")).data;
      console.log(orders);

      setOrders([...orders]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      console.log(token, loggedIn);
      fetchOrders();
    }
  }, [token]);

  const cancelOrder = async (id: string) => {
    try {
      const output = (await api.delete(`/order/${id}`)).data;
      console.log(output);
      fetchOrders();
      toast.success("Order cancelled successfully");
    } catch (err) {
      console.log(err);
      toast.error("Some error occured");
    }
  };
  return (
    <div>
      <h1 className="font-bold text-3xl mt-6">Your Orders</h1>
      <p className="mb-6">
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>
      {orders.map((order, idx) => {
        let style;

        if (order?.status === "cancelled") {
          style = " bg-red-700 text-white px-3 py-1";
        } else if (order?.status === "delivered") {
          style = " bg-green-700 text-white px-3 py-1";
        } else {
          style = " ";
        }
        return (
          <>
            <div className={" px-10 py-10 border my-2 rounded-sm shadow-xl"}>
              <div className="flex justify-between">
                <div className="flex gap-8">
                  <div className="flex gap-1 flex-col">
                    <div className="font-bold">Order Number</div>
                    <div className="">{order._id}</div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <div className="font-bold">Date Placed</div>
                    <div className="">{order.order_date}</div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <div className="font-bold">Total amount</div>
                    <div className="">${order.total_amount}</div>
                  </div>
                  <div className={"flex gap-1 flex-col"}>
                    <div className="font-bold">Status</div>
                    <div className={style + ""}>{order.status}</div>
                  </div>
                </div>

                {order.status !== "cancelled" &&
                  order.status !== "delivered" && (
                    <button
                      className="bg-red-700 h-10 text-white px-3 py-2 rounded-lg"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel order
                    </button>
                  )}
              </div>

              {order.order_items?.map((order_item, idx) => {
                return (
                  <div key={idx} className="py-2 ">
                    <hr className="" />
                    <div className="py-5 flex">
                      <img
                        src={order_item?.product?.images[0].url}
                        alt=""
                        className="w-40 h-40 border object-cover"
                      />

                      <div className="flex-1 px-4">
                        <div className="flex justify-between">
                          <h1 className="font-bold">
                            {order_item?.product?.name}
                          </h1>
                          <p className="font-bold">
                            Price : ${order_item?.product?.price}
                            <br />
                            Quantity: {order_item?.quantity}
                          </p>
                        </div>
                        <p className="mb-5">
                          {order_item?.product?.description}
                        </p>
                        <Link
                          href={`/details/${order_item?.product?._id}`}
                          className="text-primary-600 font-medium"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default OrdersPage;
