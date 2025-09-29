import { fetchOrders } from "../../../../store/adminside/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../../utils/formatCurrency";
import Loading from "../../../../utils/loading/Loading";
import toast from "react-hot-toast";
import { Box } from "lucide-react";
import { confirmOrder } from "../../../../store/adminside/adminSlice";
import ConfirmOrder from "./ConfirmOrder";




export default function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);
  const [selectedSorting, setSelectedSorting] = useState("all");
  const [filteredAndSorted, setFilteredAndSorted] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // filter orders for this week and this month
  useEffect(() => {
    let sorted = [...orders];

    if (selectedSorting === "thisWeek") {
      sorted = sorted.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return orderDate >= weekStart && orderDate <= weekEnd;
      });
    } else if (selectedSorting === "thisMonth") {
      sorted = sorted.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const monthStart = new Date();
        monthStart.setDate(1);
        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        return orderDate >= monthStart && orderDate < monthEnd;
      });
    } else if (selectedSorting === "all") {
      [...sorted];
    }

    setFilteredAndSorted(sorted.reverse());
  }, [orders, selectedSorting]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  console.log(orders);

  return (
    <div className="min-h-screen max-w-[1250px] w-full px-5 ml-auto">
      <div className="flex items-center justify-between mb-3 w-full">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          <Box className="inline-block bg-orange-100 text-orange-400 rounded-md p-2 size-10" />{" "}
          {selectedSorting === "all" && "All Orders"}
          {selectedSorting === "thisWeek" && "Orders This Week"}
          {selectedSorting === "thisMonth" && "Orders This Month"}
        </h2>
        <select
          className="border border-gray-300 rounded-md px-4 py-2 shadow-xs"
          onChange={(e) => setSelectedSorting(e.target.value)}
          value={selectedSorting}
        >
          <option value="all">All</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>
      </div>
      <div className="overflow-x-auto border-gray-100 border-1 shadow rounded-lg bg-white">
        <table className="w-full">
          <thead className="h-10 px-4">
            <tr className="text-left">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((order) => (
                <tr key={order.id} className="text-left capitalize font-medium">
                  <td className="px-4 py-2">
                    <img
                      src={order.orderItems?.[0]?.product?.image}
                      alt={order.orderItems?.[0]?.product?.productName}
                      className="w-8 h-8 object-cover rounded-sm"
                    />
                  </td>
                  <td className="px-4 py-2">#{order.id}</td>
                  <td className="px-4 py-2">{order.user.fullName}</td>
                  <td className="px-4 py-2 text-green-600 font-semibold">
                    {formatCurrency(order.total, "ETB", "en-ET")}
                  </td>
                  <td
                    className={`px-4 rounded-2xl ${
                      order.payment.status === "paid"
                        ? "text-green-500"
                        : "text-yellow-500 "
                    }`}
                  >
                    {order.payment.status}
                  </td>
                  <td
                    className={`px-4 rounded-2xl ${
                      order.status === "confirmed"
                        ? "text-green-500" || order.status === "cancelled"
                        : order.status === "cancelled"
                        ? "text-red-500"
                        : "text-yellow-500 "
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ConfirmOrder selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      </div>
    </div>
  );
}
