import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function AdminDashboard() {
  // Example: you can fetch stats from Redux or an API
  const { productItems, orders } = useSelector((state) => state.product);
  const { users } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-amber-600 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-amber-500">{productItems?.length || 0}</span>
            <span className="mt-2 text-gray-700">Products</span>
            <Link to="/admin/products" className="mt-4 text-amber-600 underline text-sm">Manage Products</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-amber-500">{orders?.length || 0}</span>
            <span className="mt-2 text-gray-700">Orders</span>
            <Link to="/admin/orders" className="mt-4 text-amber-600 underline text-sm">View Orders</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-amber-500">{users?.length || 0}</span>
            <span className="mt-2 text-gray-700">Users</span>
            <Link to="/admin/users" className="mt-4 text-amber-600 underline text-sm">Manage Users</Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-amber-500">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/products/new" className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">Add Product</Link>
            <Link to="/admin/notifications" className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">Send Notification</Link>
            <Link to="/admin/coupons" className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">Manage Coupons</Link>
          </div>
        </div>
      </div>
    </div>
  );
}