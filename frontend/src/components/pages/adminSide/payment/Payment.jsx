import { useSelector } from "react-redux";
import { fetchPayments } from "../../../../store/adminside/adminSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../../../../utils/loading/Loading";

export default function Payment() {

  const { payments } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  console.log("Payments:", payments);
  return (
    <div>
      <h1>Payment Page</h1>
      <div className="max-w-[1200px] w-full ml-auto">
        <h1 className="text-2xl font-bold mb-4">Payments</h1>
        <div className="overflow-x-auto border-1 border-gray-100 rounded-md shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 ">#</th>
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Method</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments && payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-2 px-4">{payment.id}</td>
                  <td className="py-2 px-4">{payment.order?.user?.fullName}</td>
                  <td className="py-2 px-4">${payment.amount}</td>
                  <td className="py-2 px-4">{payment.method}</td>
                  <td className="py-2 px-4">
                    <span
                      className={
                        payment.status === "Completed"
                          ? "text-green-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                      }
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{payment.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
