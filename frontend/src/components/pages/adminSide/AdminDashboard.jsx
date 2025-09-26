import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Armchair, Users, Box, ChartNoAxesCombined } from "lucide-react";
import { fetchUsers, fetchProducts, fetchOrders } from "../../../store/adminside/adminSlice";
import { useDispatch } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Orders from "./Orders";
import { fetchPayments } from "../../../store/adminside/adminSlice";


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { users, products, orders, loading, error, admin, payments } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()), dispatch(fetchProducts()), dispatch(fetchOrders()), dispatch(fetchPayments());
  }, [admin, dispatch]);

  const barData = {
    labels: ["Users", "Products", "Orders", "Revenue"],
    datasets: [
      {
        label: "Statistics",
        data: [
          users?.length || 0,
          products?.length || 0,
          orders?.length || 0,
          payments?.reduce((total, payment) => total + payment.amount, 0),
        ],
        backgroundColor: [
          "#a78bfa",
          "#f472b6",
          "#facc15",
          "#4ade80",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Users", "Products"],
    datasets: [
      {
        data: [users?.length || 0, products?.length || 0],
        backgroundColor: ["#a78bfa", "#f472b6"],
        hoverOffset: 4,
      },
    ],
  };


  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      <div className="max-w-[1200px] w-full mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-10">
          <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center justify-center space-x-3 md:space-x-4">
            <Users className="text-purple-500 bg-purple-100 rounded-md p-2 size-10 md:size-12" />
            <div className="flex flex-col items-start">
              <span className="text-xl md:text-3xl font-semibold">
                {users?.length}
              </span>
              <span className="text-gray-500 text-xs md:text-base">Total Users</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center justify-center space-x-3 md:space-x-4">
            <Armchair className="text-pink-500 bg-pink-100 rounded-md p-2 size-10 md:size-12" />
            <div className="flex flex-col items-start">
              <span className="text-xl md:text-3xl font-semibold">
                {products?.length}
              </span>
              <span className="text-gray-500 text-xs md:text-base">Total Products</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center justify-center space-x-3 md:space-x-4">
            <Box className="text-yellow-500 bg-yellow-100 rounded-md p-2 size-10 md:size-12" />
            <div className="flex flex-col items-start">
              <span className="text-xl md:text-3xl font-semibold">
                {orders?.length}
              </span>
              <span className="text-gray-500 text-xs md:text-base">All Orders</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center justify-center space-x-3 md:space-x-4">
            <ChartNoAxesCombined className="text-green-500 bg-green-100 rounded-md p-2 size-10 md:size-12" />
            <div className="flex flex-col items-start">
              <span className="text-xl font-semibold">
                {payments?.reduce((total, payment) => total + payment.amount, 0).toLocaleString("en-ET", {
                  style: "currency",
                  currency: "ETB",
                })}
              </span>
              <span className="text-gray-500 text-xs md:text-base">Total Revenue</span>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-10">
          <div className="bg-white rounded-lg shadow p-4 md:p-6 h-72 md:h-96">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Overview Bar Chart</h2>
            <Bar data={barData} />
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 h-72 md:h-96">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Users vs Products</h2>
            <Pie data={pieData} />
          </div>
        </div>
        {/* Orders Table */}
        <div className="mt-6 md:mt-10">
          <Orders />
        </div>
      </div>
    </div>
  );
}