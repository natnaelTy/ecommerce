import {
  Armchair,
  LayoutDashboard,
  Users,
  Box,
  ShoppingCart,
  Bell,
  Settings,
  CreditCard,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { logoutAdmin } from "../../../../store/adminside/adminAuthSlice";
import { useDispatch } from "react-redux";

export default function SideBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const dispatch = useDispatch();



  // Overlay for mobile
  const Overlay = () =>
    menuOpen ? (
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-40 md:hidden"
        onClick={() => setMenuOpen(false)}
      />
    ) : null;

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white rounded-full p-2 shadow"
        onClick={() => setMenuOpen(true)}
        aria-label="Open sidebar"
        type="button"
      >
        <Menu className="size-6 text-orange-400" />
      </button>

      {/* Overlay for mobile */}
      <Overlay />

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md p-2 transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
        style={{ maxHeight: "100vh" }}
      >
        <h2 className="text-2xl font-semibold mb-8 px-4 mt-5 text-orange-400">
          <ShoppingCart className="inline-block mr-2 size-7" /> Mesay <span className="text-black">Fur.</span>
        </h2>
        <ul className="space-y-1 w-full text-sm font-medium flex flex-col h-[78vh]">
          <li
            onClick={() => {
              setActiveItem('dashboard');
              setMenuOpen(false);
            }}
            className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'dashboard' ? 'bg-orange-400 text-white' : ''}`}
          >
            <Link to="/admin/dashboard">
              <LayoutDashboard className="inline-block mr-2" />
              Dashboard
            </Link>
          </li>
          <li
            onClick={() => {
              setActiveItem('users');
              setMenuOpen(false);
            }}
            className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'users' ? 'bg-orange-400 text-white' : ''}`}
          >
            <Link to="/admin/users">
              <Users className="inline-block mr-2" />
              Users
            </Link>
          </li>
          <li
            onClick={() => {
              setActiveItem('products');
              setMenuOpen(false);
            }}
            className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'products' ? 'bg-orange-400 text-white' : ''}`}
          >
            <Link to="/admin/products">
              <Armchair className="inline-block mr-2" />
              Products
            </Link>
          </li>
          <li
            onClick={() => {
              setActiveItem('orders');
              setMenuOpen(false);
            }}
            className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'orders' ? 'bg-orange-400 text-white' : ''}`}
          >
            <Link to="/admin/orders">
              <Box className="inline-block mr-2" />
              Orders
            </Link>
          </li>
          <li
            onClick={() => {
              setActiveItem('payments');
              setMenuOpen(false);
            }}
            className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'payments' ? 'bg-orange-400 text-white' : ''}`}
          >
            <Link to="/admin/payments">
              <CreditCard className="inline-block mr-2" />
              Payments
            </Link>
          </li>
          <li
            onClick={() => {
              setActiveItem('settings');
              setMenuOpen(false);
            }}
            className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'settings' ? 'bg-orange-400 text-white' : ''}`}
          >
            <Link to="/admin/settings">
              <Settings className="inline-block mr-2" />
              Settings
            </Link>
          </li>
          <li
            onClick={() => {
              setActiveItem('notifications');
              setMenuOpen(false);
            }}
            className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'notifications' ? 'bg-orange-400 text-white' : ''}`}
          >
            <Link to="/admin/notifications">
              <Bell className="inline-block mr-2" />
              Notifications
            </Link>
          </li>
        </ul>
        <hr className="my-4 border-gray-300" />
        <span
          onClick={() => {
            dispatch(logoutAdmin());
            setMenuOpen(false);
          }}
          className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-400"
          title="Logout"
        >
          <LogOut className="inline-block mr-1" /> Logout
        </span>
      </nav>
    </>
  );
}