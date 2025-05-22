import axios from "axios";
import { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "../../store/user/userSlice";

 const GetProfile = () => {

      const { isAuthenticated, user } = useSelector((state) => state.user);
      const navigate = useNavigate();
      const dispatch = useDispatch();
     
      console.log(user);
      useEffect(() => {
        dispatch(fetchUser());
      },[dispatch]);

      function handleLogout(){
        try{
          dispatch(logoutUser());
          toast.success("You successfully Logged out!");
          navigate("/auth/signup");
        }catch(err){
          console.log(err);
        }
       
      }

      function handleLogin(){
        navigate("/auth/signup");
      }
      
      return(
        <div className="fixed top-17 right-5 z-30 bg-white shadow-xl w-48 text-base rounded-md">
             <div className="p-2 flex items-center gap-2 cursor-pointer">
                <CgProfile className="text-2xl"/>
                <h1 className="text-gray-900">{user?.fullName ? user?.fullName : "Guest"}</h1>
             </div>
             <ul className="flex text-gray-700 flex-col items-start justify-center gap-2 border-1 border-gray-200">
               <li className="lihover"><Link className="liLink" to={"/profile"}><IoHomeSharp className="text-lg"/> Home</Link></li>
                <li className="lihover"><Link className="liLink" to={'/orders'}><BiSolidPurchaseTag className="text-lg"/>Orders</Link></li>
                <li className="lihover"> <Link className="liLink" to={"/support"}><MdSupportAgent className="text-lg"/> Support </Link></li>
             </ul>
             <div onClick={isAuthenticated ? handleLogout : handleLogin} className="p-2 flex items-center gap-2 hover:bg-amber-500 cursor-pointer">
                <IoIosLogOut className="text-xl"/>
                <h1>{isAuthenticated ? 'Log out' : 'Log in'}</h1>
             </div>
        </div>
      )
}

export default GetProfile;

