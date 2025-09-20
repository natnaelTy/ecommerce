import { useSelector } from 'react-redux'
import { Bell, ChevronDown  } from 'lucide-react';
import { getAdminProfile } from '../../../../store/adminside/adminSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


export default function Navbar() {
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProfile());
  }, []);

  return (
    <div className='w-full h-16 bg-white flex items-center justify-between px-6 mx-auto sticky top-0 left-0 z-10'>
      <h1 className="text-sm md:text-xl font-semibold capitalize ml-0 lg:ml-65 hidden md:block">Hello, {admin?.fullName} 👋🏾</h1>
      <div className='flex items-center space-x-4'>
        <Bell className="inline-block mr-6 cursor-pointer"/>
        <img src={admin?.profilePhoto ? admin?.profilePhoto : '/images/adminlogo.png'} alt="Admin Profile" className="w-6 md:w-9 h-6 md:h-9 rounded-full object-cover"/>
        <h1 className="capitalize font-medium text-sm md:text-base">{admin?.fullName}</h1>
        <ChevronDown className="inline-block  cursor-pointer"/>
      </div>
    </div>
  )
}
