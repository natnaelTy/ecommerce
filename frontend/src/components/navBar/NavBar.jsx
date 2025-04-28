import { RiSofaLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { PiOfficeChairLight } from "react-icons/pi";
import { useState } from "react";
import "./style.css";
import GetProfile from "../homepage/GetProfile";

const NavBar = () => {
  const [searchInputIsOn, setSearchInputIsOn] = useState(false);
  const [value, setValue] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  function toggleSearchButton() {
    setSearchInputIsOn(!searchInputIsOn);
  }

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  function profilePopOut() {
    setShowProfile(!showProfile);
  }
  return (
    <>
      {/* navbar */}
<nav className="bg-slate-950 flex items-center justify-around w-full">
    <div className="flex items-center justify-around">
        <div className="container flex items-center gap-7 relative group hidden md:flex ">
            <span className="text-white flex items-center px-5 py-3 bg-amber-500 md:flex items-center cursor-pointer hidden">
               <FiMenu/>
               <span className="capitalize ml-2 text-white text-sm">All Categories</span>
            </span>
            
             <div className="flex items-center space-x-6 capitalize text-sm">
                <a href="index.html" className="text-gray-200 hover:text-white transition">Home</a>
                <a href="pages/shop.html" className="text-gray-200 hover:text-white transition">Shop</a>
                <a href="#" className="text-gray-200 hover:text-white transition">About us</a>
                <a href="#" className="text-gray-200 hover:text-white transition">Contact us</a>
            </div>
            
            {/* dropdown */}
            <div
                className="absolute z-20 w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                    <RiSofaLine/>
                    <span className="ml-6 text-gray-600 text-sm">Sofa</span>
                </a>
                <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                    <IoBedOutline/>
                    <span className="ml-6 text-gray-600 text-sm">Terarce</span>
                </a>
                <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                    <IoBedOutline/>
                    <span className="ml-6 text-gray-600 text-sm">Bed</span>
                </a>
                <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                    <PiOfficeChairLight/>
                    <span className="ml-6 text-gray-600 text-sm">office</span>
                </a>
                <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                    <img src="assets/images/icons/outdoor-cafe.svg" alt="outdoor" className="w-5 h-5 object-contain"/>
                    <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
                </a>
                <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                    <img src="assets/images/icons/bed-2.svg" alt="Mattress" className="w-5 h-5 object-contain"/>
                    <span className="ml-6 text-gray-600 text-sm">Mattress</span>
                </a>
            </div>
        </div>
    </div>
   
    <button href="pages/login.html" className="text-gray-200 text-sm hover:text-white transition">Login</button>
</nav>
    </>
  );
};

export default NavBar;
