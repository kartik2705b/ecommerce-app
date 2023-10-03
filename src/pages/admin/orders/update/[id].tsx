// Assuming you have the "axios" library installed for making API calls

import React, { useState } from "react";
// import axios from 'axios';
import { api } from "@/utils/axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const OrderStatusPage = () => {
  const router = useRouter();
  const id = router.query.id;

  console.log(id);
  const [status, setStatus] = useState("");

  const handleStatusChange = async () => {
    try {
      if (!id) return;

      const orderId = id; // Replace with the actual order ID you want to update
      const response = await api.post(`/order/status/${orderId}`, { status });
      console.log("Updated status:", response.data);
      await router.push("/admin/orders");
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Order Status
          </h2>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                id="pending"
                value="pending"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "pending"}
                className="mr-2"
              />
              <label htmlFor="pending" className="text-gray-700">
                Pending
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                id="shipped"
                value="shipped"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "shipped"}
                className="mr-2"
              />
              <label htmlFor="shipped" className="text-gray-700">
                Shipped
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                id="delivered"
                value="delivered"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "delivered"}
                className="mr-2"
              />
              <label htmlFor="delivered" className="text-gray-700">
                Delivered
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                id="cancelled"
                value="cancelled"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "cancelled"}
                className="mr-2"
              />
              <label htmlFor="cancelled" className="text-gray-700">
                Cancelled
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleStatusChange}
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
