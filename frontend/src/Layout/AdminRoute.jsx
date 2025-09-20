import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SideBar from "../components/pages/adminSide/adminlayout/SideBar";
import Navbar from "../components/pages/adminSide/adminlayout/Navbar";
import { getAdminProfile } from "../store/adminside/adminSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { admin, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const adminChildren = React.Children.toArray(children);

  useEffect(() => {
      dispatch(getAdminProfile());
  }, [dispatch]); 


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  // Handle errors
 
  console.log("Current Admin:", admin?.role);
  if (!admin || admin.role !== "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }


  
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">{adminChildren}</main>
      </div>
    </div>
  );
}