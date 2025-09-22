import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../components/pages/adminSide/adminlayout/SideBar";
import Navbar from "../components/pages/adminSide/adminlayout/Navbar";
import { getAdminProfile } from "../store/adminside/adminAuthSlice";
import Loading from "../utils/loading/Loading";

export default function AdminRoute({ children }) {
  const { admin, loading } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const adminChildren = React.Children.toArray(children);

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);


  if (admin?.role !== "ADMIN") {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">{adminChildren}</main>
      </div>
    </div>
  );
}
