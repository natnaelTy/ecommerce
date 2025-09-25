import { useSelector } from 'react-redux'
import { getAdminProfile } from '../../../../store/adminside/adminAuthSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp 
} from "lucide-react";
import { logoutAdmin } from '../../../../store/adminside/adminAuthSlice';

export default function Navbar() {
  const { admin, loading } = useSelector((state) => state.adminAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  return (
    <div className='w-full h-16 bg-white flex items-center justify-between px-6 mx-auto sticky top-0 left-0 z-10 shadow'>
      <h1 className="text-sm md:text-xl font-semibold capitalize ml-0 lg:ml-65 hidden md:block">Hello, {admin?.fullName} 👋🏾</h1>
      <div className='flex items-center space-x-4'>
        <img src={admin?.profilePhoto ? admin?.profilePhoto : '/images/adminlogo.png'} alt="Admin Profile" className="w-6 md:w-9 h-6 md:h-9 rounded-full object-cover"/>
        <h1 className="capitalize font-medium text-sm md:text-base">{admin?.fullName}</h1>
        <span onClick={() => setIsModalOpen(!isModalOpen)} className="inline-block  cursor-pointer">
          {isModalOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      <div onClick={() => setIsModalOpen(!isModalOpen)} className={`absolute right-5 top-14 w-48 bg-white rounded-md border overflow-hidden border-gray-100 shadow-lg ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className="w-full flex flex-col items-start" >
          <Link to="/admin/account" className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-400 hover:text-white"><Settings className='inline-block mr-2 size-5'/>Account Settings</Link>
          <button onClick={() => dispatch(logoutAdmin())} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white"><LogOut className='inline-block mr-2 size-5'/>Logout</button>
        </div>
      </div>
    </div>
  )
}
