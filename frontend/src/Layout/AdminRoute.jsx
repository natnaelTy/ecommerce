import React from "react";
import { useSelector } from "react-redux";
import SideBar from "../components/pages/adminSide//adminlayout/SideBar";
import Navbar from "../components/pages/adminSide/adminlayout/Navbar";
import { getAdminProfile } from "../store/adminside/adminSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function AdminRoute({ children }) {
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAdminProfile());
  }, []);
  
  const adminChildren = React.Children.toArray(children);
  console.log(admin.admin.role);
  if (!admin.admin) {
    return navigate("/admin-login")
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
