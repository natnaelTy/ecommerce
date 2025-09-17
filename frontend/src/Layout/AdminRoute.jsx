import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "../components/pages/adminSide//adminlayout/SideBar";
import Navbar from "../components/pages/adminSide/adminlayout/Navbar";


export default function AdminRoute({ children }) {
  const { admin } = useSelector((state) => state.admin);

  const adminChildren = React.Children.toArray(children);
  if (!admin) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <>
      <div>
        <Navbar />
        <SideBar />
        <main className="flex-1">
             {adminChildren}
        </main>
      </div>
    </>
  );
}
