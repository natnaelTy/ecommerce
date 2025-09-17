import React from 'react'
import { useSelector } from 'react-redux'
import { Bell, ChevronDown  } from 'lucide-react';


export default function Navbar() {
  const { admin } = useSelector((state) => state.admin);


  return (
    <div className='w-full h-16 bg-white flex items-center justify-between px-6 mx-auto sticky top-0 left-0 z-10'>
      <h1 className="text-2xl font-semibold capitalize mx-auto">Hello, {admin.admin.fullName} 👋🏾</h1>
      <div className='flex items-center space-x-4'>
        <Bell className="inline-block mr-6 cursor-pointer"/>
        <img src={admin.admin.profilePhoto ? admin.admin.profilePhoto : '/images/adminlogo.png'} alt="Admin Profile" className="w-9 h-9 rounded-full object-cover"/>
        <h1 className="capitalize font-medium">{admin.admin.fullName}</h1>
        <ChevronDown className="inline-block  cursor-pointer"/>
      </div>
    </div>
  )
}
