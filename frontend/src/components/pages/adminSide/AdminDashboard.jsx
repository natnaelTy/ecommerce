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


// chartjs components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { users, products, orders, loading, error, admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()), dispatch(fetchProducts()), dispatch(fetchOrders());
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
          users?.length * 100 || 0,
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

  console.log("Users:", users);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] w-full ml-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center space-x-4">
            <Users className="text-purple-500 bg-purple-100 rounded-md p-2 size-12" />
            <div className="flex flex-col items-start">
              <span className="text-2xl md:text-3xl font-semibold">
                {users?.length}
              </span>
              <span className="text-gray-500">Total Users</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center space-x-4">
            <Armchair className="text-pink-500 bg-pink-100 rounded-md p-2 size-12" />
            <div className="flex flex-col items-start">
              <span className="text-2xl md:text-3xl font-semibold">
                {products?.length}
              </span>
              <span className="text-gray-500">Total Products</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center space-x-4">
            <Box className="text-yellow-500 bg-yellow-100 rounded-md p-2 size-12" />
            <div className="flex flex-col items-start">
              <span className="text-2xl md:text-3xl font-semibold">
                {orders?.length}
              </span>
              <span className="text-gray-500">All Orders</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center space-x-4">
            <ChartNoAxesCombined className="text-green-500 bg-green-100 rounded-md p-2 size-12" />
            <div className="flex flex-col items-start">
              <span className="text-2xl md:text-3xl font-semibold">
                {users?.length}
              </span>
              <span className="text-gray-500">Total Revenue</span>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-lg shadow p-6 h-96">
            <h2 className="text-lg font-semibold mb-4 ">Overview Bar Chart</h2>
            <Bar data={barData} />
          </div>
          <div className="bg-white rounded-lg shadow p-6 h-96">
            <h2 className="text-lg font-semibold mb-4 ">Users vs Products</h2>
            <Pie data={pieData} />
          </div>
        </div>

        <Orders />
      </div>
    </div>
  );
}