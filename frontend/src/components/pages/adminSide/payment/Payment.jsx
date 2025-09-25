import { useSelector } from "react-redux";
import { fetchPayments } from "../../../../store/adminside/adminSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import Loading from "../../../../utils/loading/Loading";
import { formatCurrency } from "../../../../utils/formatCurrency";


export default function Payment() {
  const { payments, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [selectedSorting, setSelectedSorting] = useState("all");
  const [filteredAndSorted, setFilteredAndSorted] = useState([]);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  // filter payments for this week and this month
  useEffect(() => {
    let sorted = [...payments];

    if (selectedSorting === "thisWeek") {
      sorted = sorted.filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return paymentDate >= weekStart && paymentDate <= weekEnd;
      });
    } else if (selectedSorting === "thisMonth") {
      sorted = sorted.filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        const monthStart = new Date();
        monthStart.setDate(1);
        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        return paymentDate >= monthStart && paymentDate < monthEnd;
      });
    }
    setFilteredAndSorted(sorted.reverse());
  }, [payments, selectedSorting]);

  if(loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="max-w-[1200px] w-full ml-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 w-full gap-2">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
            <CreditCard className="inline-block bg-orange-100 text-orange-400 rounded-md p-2 size-10" />{" "}
            {selectedSorting === "all" && "All Payments"}
            {selectedSorting === "thisWeek" && "Payments This Week"}
            {selectedSorting === "thisMonth" && "Payments This Month"}
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

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto border-1 border-gray-100 rounded-md shadow">
          <table className="w-full">
            <thead className="h-10 px-4">
              <tr className="text-left">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Method</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length > 0 &&
                filteredAndSorted.map((payment) => (
                  <tr
                    key={payment.id}
                    className="text-left capitalize font-medium"
                  >
                    <td className="py-2 px-4">{payment.id}</td>
                    <td className="py-2 px-4">
                      {payment.order?.user?.fullName}
                    </td>
                    <td className="py-2 px-4 text-green-600">{formatCurrency(payment.amount, "ETB", "eng-ET")}</td>
                    <td className="py-2 px-4">{payment.method}</td>
                    <td className="py-2 px-4">
                      <span
                        className={
                          payment.status === "paid"
                            ? "text-green-500 font-semibold"
                            : "text-yellow-500 font-semibold"
                        }
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden flex flex-col gap-3">
          {filteredAndSorted.length > 0 &&
            filteredAndSorted.map((payment) => (
              <div
                key={payment.id}
                className="bg-white rounded shadow p-4 flex flex-col gap-2 text-sm"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">User:</span>
                  <span>{payment.order?.user?.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Amount:</span>
                  <span>{payment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Method:</span>
                  <span>{payment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={
                      payment.status === "Completed"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {payment.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>
                    {new Date(payment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}