import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/pages/adminSide/adminlayout/SideBar";
import Navbar from "../components/pages/adminSide/adminlayout/Navbar";
import { getAdminProfile } from "../store/adminside/adminAuthSlice";
import toast from "react-hot-toast";



export default function AdminRoute({ children }) {
  const { admin, error } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const adminChildren = React.Children.toArray(children);

    useEffect(() => {
      dispatch(getAdminProfile());
    }, [dispatch]);
    
  if (admin && admin?.role === "ADMIN") {
    return (
      <div className="flex h-screen bg-gray-50">
        <SideBar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4">{adminChildren}</main>
        </div>
      </div>
    );
  } else if (error) {
    return toast.error(error);
  }
}