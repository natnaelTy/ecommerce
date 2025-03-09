import axios from "axios";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";


 const GetProfile = () => {

      const [user, setUser] = useState(null);
       
      useEffect(() => {
        const fetchUser = async () => {
          try{
            const response = await axios.get("http://localhost:5000/auth/verify");
            const userData = await response.data.user;
            console.log(userData);
            setUser(userData);
            
          }catch(err){
            console.log(err);
          }
        }
        fetchUser();
      },[]);
      return(
        <div className="absolute top-17 right-5 z-1 bg-white shadow-3xl w-48">
             <div className="p-2 flex items-center gap-2 cursor-pointer">
                <CgProfile className="text-2xl"/>
                <h1 className="text-gray-900">{user?.fullName ? user?.fullName : "My Account"}</h1>
             </div>
             <ul className="flex text-gray-700 flex-col items-start justify-center gap-2 border-1 border-gray-200">
               <li className="lihover"><Link className="liLink" to={"/profile"}><IoPerson className="text-lg"/> Profile</Link></li>
                <li className="lihover"><Link className="liLink" to={'/orders'}><BiSolidPurchaseTag className="text-lg"/>Orders</Link></li>
                <li className="lihover"> <Link className="liLink" to={"/wishlist"}><CiHeart className="text-lg"/> Wishlist</Link></li>
                <li className="lihover"> <Link className="liLink" to={"/support"}><MdSupportAgent className="text-lg"/> Support </Link></li>
             </ul>
             <div className="p-2 flex items-center gap-2 hover:bg-orange-300 cursor-pointer">
                <h1>Log out </h1>
                <IoIosLogOut className="text-xl"/>
             </div>
        </div>
      )
}

export default GetProfile;

