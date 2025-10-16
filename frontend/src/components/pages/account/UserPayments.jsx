import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/formatCurrency";
import Loading from "../../../utils/loading/Loading";
import { fetchUserPayments } from "../../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { Banknote } from "lucide-react";

export default function UserPayments() {
  const { user, loading, payments, error } = useSelector((state) => state.user);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPayments(user.id));
    }
  }, [user, dispatch]);

  const paymentsList = [...payments].reverse();

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {" "}
          <Banknote className="inline-block size-6 mr-2 text-green-600" />
          Payment History
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <ul className="space-y-3">
          {paymentsList.map((p) => (
            <li
              key={p.id || p.paymentId || `${p.orderId}-${p.amount}`}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                    })}
                  </div>
                  <div className="text-sm text-gray-400">•</div>
                  <div className="text-sm font-medium capitalize">
                    {p.payment.method}
                  </div>
                </div>
                <div className="mt-2 text-lg text-green-600 font-semibold">
                  {formatCurrency(
                    p.amount || p.total || p.price,
                    "ETB",
                    "en-ET"
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Status:{" "}
                  <span
                    className={`font-medium px-2 rounded-lg capitalize ${
                      p.payment.status === "paid" 
                        ? "text-green-500 bg-green-100"
                        : "text-amber-500 bg-amber-100"
                    }`}
                  >
                    {p.payment.status}
                  </span>
                </div>
                {p.orderId && (
                  <div className="text-sm text-gray-500 mt-1">
                    Order: <span className="font-medium">{p.orderId}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 md:mt-0 md:ml-4 flex items-center gap-2">
                <button
                  className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-amber-600"
                  onClick={() => setSelected(p)}
                >
                  View
                </button>
                {p.receiptUrl && (
                  <a
                    href={p.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    Receipt
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={() => setSelected(null)}
            />
            <div className="bg-white rounded-lg shadow-lg z-10 max-w-lg w-full p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div>
                  <strong>Amount:</strong> {formatCurrency(selected.total)}
                </div>
                <div>
                  <strong>Method:</strong> {selected.payment.method}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  {selected.status || selected.paymentStatus}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(selected.createdAt).toLocaleString("en-US", {
                     dateStyle: "medium",
                  })}
                </div>
                {selected.orderId && (
                  <div>
                    <strong>Order:</strong> {selected.orderId}
                  </div>
                )}
                {selected.receiptUrl && (
                  <div className="mt-3">
                    <a
                      className="text-blue-600 underline text-sm"
                      href={selected.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open receipt
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
