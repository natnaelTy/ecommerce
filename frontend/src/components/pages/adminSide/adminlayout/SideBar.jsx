import {
  Armchair,
  LayoutDashboard,
  Users,
  Box,
  ShoppingCart ,
  Bell,
  Settings,
  CreditCard,
  LogOut,
  ChartNoAxesCombined,
  Menu,
  Store 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";




export default function SideBar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  return (
    <div className="">   
      <div className={`w-64 bg-white overflow-y-hidden p-2 shadow-md h-screen fixed top-0 left-0 z-10 ${menuOpen ? "block" : "hidden"} md:block`}>
      <Menu  className="inline-block size-6 md:hidden" onClick={() => setMenuOpen(!menuOpen)}/>
      <h2 className="text-2xl font-semibold mb-8 px-4 mt-5 text-orange-400"> <ShoppingCart className="inline-block mr-2 size-7"/> Mesay <span className="text-black">Fur.</span></h2>
      <ul className="space-y-1 w-full text-sm font-medium">
        <li onClick={() => setActiveItem('dashboard')} className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'dashboard' ? 'bg-orange-400 text-white' : ''}`}>
          <Link to="/admin/dashboard">
            <LayoutDashboard className="inline-block mr-2" />  
            Dashboard
          </Link>
        </li>
        <li onClick={() => setActiveItem('users')} className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'users' ? 'bg-orange-400 text-white' : ''}`}>
          <Link to="/admin/users">
            <Users className="inline-block mr-2" />
            Users
          </Link>
        </li>
        <li onClick={() => setActiveItem('products')} className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'products' ? 'bg-orange-400 text-white' : ''}`}>
          <Link to="/admin/products">
            <Armchair className="inline-block mr-2" />
            Products
          </Link>
        </li>
        <li onClick={() => setActiveItem('orders')} className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'orders' ? 'bg-orange-400 text-white' : ''}`}>
          <Link to="/admin/orders">
            <Box className="inline-block mr-2" />
            Orders
          </Link>
        </li>

        <li onClick={() => setActiveItem('payments')} className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'payments' ? 'bg-orange-400 text-white' : ''}`}>
          <Link to="/admin/payments">
            <CreditCard className="inline-block mr-2" />
            Payments
          </Link>
        </li>
        <li onClick={() => setActiveItem('settings')} className={`w-full text-gray-700 hover:text-white hover:bg-orange-400 rounded-md px-4 py-1 ${activeItem === 'settings' ? 'bg-orange-400 text-white' : ''}`}>
          <Link to="/admin/settings">
            <Settings className="inline-block mr-2" />
            Settings
          </Link>
        </li>
      </ul>

      <hr className="my-4 border-gray-200" />
      <span className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-black">
        <LogOut />
      </span>
    </div>
    </div> 
  );
}
