import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { confirmOrder, fetchOrders } from "../../../../store/adminside/adminSlice";
import toast from "react-hot-toast";


export default function ConfirmOrder({ selectedOrder, setSelectedOrder }) {

    const dispatch = useDispatch();

    const confirmSelectedOrder = async () => {
        if (!selectedOrder) return;
        try {
            await dispatch(confirmOrder(selectedOrder.id)).unwrap();
            toast.success("Order confirmed successfully!");
            setSelectedOrder(null);
            dispatch(fetchOrders());
        } catch (err) {
            toast.error("Failed to confirm order: " + err);
        }
    };


  return (
    <div>
          {selectedOrder && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedOrder(null)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">
                Order #{selectedOrder.id} Details
              </h3>
              <div className="mb-2">
                <strong>Customer:</strong> {selectedOrder.user.fullName}
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {selectedOrder.status}
              </div>
              <div className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </div>
              <div className="mb-2">
                <strong>Total:</strong>{" "}
                {formatCurrency(selectedOrder.total, "ETB", "en-ET")}
              </div>
              <div className="mb-2">
                <strong>Items:</strong>
                <ul className="list-disc ml-5">
                  {selectedOrder.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product.productName} x {item.quantity} (
                      {formatCurrency(item.product.price, "ETB", "en-ET")})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Address:</strong><br />{" "}
                <p> Street: <span className="text-gray-700">{selectedOrder.address ? selectedOrder.address.street : "N/A"}</span></p>
                <p> City: <span className="text-gray-700">{selectedOrder.address ? selectedOrder.address.city : "N/A"}</span></p>
                <p> Country: <span className="text-gray-700">{selectedOrder.address ? selectedOrder.address.country : "N/A"}</span></p>
              </div>
              {selectedOrder.status !== "confirmed" && (
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => confirmSelectedOrder()}
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        )}
    </div>
  )
}
