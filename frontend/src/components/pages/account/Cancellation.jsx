import { useSelector, useDispatch } from "react-redux"
import { fetchOrders } from "../../../store/product/productSlice"
import { useEffect } from "react"
import { formatCurrency } from "../../../utils/formatCurrency";
import  {RouteOff } from "lucide-react";



export default function Cancellation() {
    const {orders, loading} = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

  
  useEffect(() => {
    if (user) {
      dispatch(fetchOrders(user.id));
    }
  }, [user, dispatch]);

    const cancelledOrders = orders.filter(order => order.status === "cancelled");

  return (
    <div className="max-w-[1000px] mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6"><RouteOff  className="inline-block bg-orange-100 text-orange-400 rounded-md p-2 size-10 mr-2"/>My Cancellation</h1>
      {cancelledOrders && cancelledOrders.length > 0 ? (
        <div className="space-y-6">
          {cancelledOrders.map((order) => (
            <div
              key={order.id}
              className="border-1 border-gray-200 rounded-lg p-4 shadow-xs bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Order #{order.id}</span>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`capitalize px-4 py-1 rounded-full ${
                    order.status === "delivered" || order.status === "cancelled" ? "bg-red-200"
                      : order.status === "confirmed" ? "bg-green-200"
                      : "bg-yellow-200"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div>
                <span className="font-medium">Items:</span>
                <ul className="mt-1 list-disc space-y-4">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.product?.image}
                          alt={item.product?.productName}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span>{item.product?.productName}</span>
                        <span className="text-gray-500 text-sm">
                          x {item.quantity}
                        </span>
                            <button type="button"
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-red-500 hover:underline"
                        >
                          Cancel Order
                        </button>
                        <span className="ml-auto font-semibold">
                          {formatCurrency(item.product?.price, "ETB", "en-ET")}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="mt-2 flex justify-end">
                <span className="font-bold ">
                  Total:{" "}
                  <span className="text-green-600">
                    {formatCurrency(order.total, "ETB", "en-ET")}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  )
}
