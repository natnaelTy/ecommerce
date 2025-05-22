import { IoSearchOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import GetProfile from "../homepage/GetProfile";
import { useState } from "react";



export default function Header() {

    const [showProfile, setShowProfile] = useState(false);


    function profilePopOut() {
    setShowProfile(!showProfile);
    }

  return (
    <header className="py-3 px-18 shadow-sm bg-white">
    <div className="flex items-center justify-between lg:justify-evenly">
        <Link to={"/"} className="text-xl font-medium">
          <span className="text-amber-500">Messay</span>Fur.
        </Link>

        <div className="w-full max-w-sm relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400 hidden md:flex">
                <IoSearchOutline />
            </span>
            <input type="text" name="search" id="search"
                className="w-full border-1 border-amber-500 border-r-0 pl-12 py-2 pr-2 rounded-l-md focus:outline-none hidden md:flex"
                placeholder="Search"/>
            <button
                className="bg-amber-400 border border-amber-500 text-white px-5 rounded-r-md hover:bg-transparent hover:text-amber-400 transition hidden md:flex items-center">Search</button>
        </div>

        <div className="flex items-center space-x-4">
            <div className="text-center text-gray-700 hover:text-primary transition relative">
                <div className="text-2xl">
                   <IoMdHeartEmpty/>
                </div>  
                <div
                    className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    8</div>
            </div>
            <div className="text-center text-gray-700 hover:text-primary transition relative">
                <div className="text-2xl">
                    <TiShoppingCart/>
                </div>
                <div
                    className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    2</div>
            </div>
            <div onClick={profilePopOut} className="text-center text-gray-700 hover:text-primary transition relative">
                <div className="text-2xl">
                    <VscAccount/>
                    {showProfile && <GetProfile/>}
                </div>
            </div>
        </div>
    </div>
  </header>
  )
}
