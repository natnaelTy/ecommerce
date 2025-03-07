import { IoPersonCircleOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { SlHandbag } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { AiOutlineMenu } from "react-icons/ai";
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
      <nav className="flex ietms-center justify-between px-5 py-3 w-full absolute top-0 z-20">
        {/* logo */}
        <h1 className="text-2xl hidden md:flex">Mesay Furniture</h1>
        {/* hamburger menu */}
        <button
          onClick={handleShowMenu}
          className="flex md:hidden cursor-pointer"
        >
          {showMenu ? <AiOutlineMenu /> : <LiaTimesSolid />}
        </button>
        {/* Nav links */}
        <ul className="flex items-center justify-center gap-8 text-sm uppercase hidden md:flex">
          <li>
            <NavLink className="hoverLink" to={"/"}>
              home
            </NavLink>
          </li>
          <li>
            <NavLink className="hoverLink" to={"/shop"}>
              shop
            </NavLink>
          </li>
          <li>
            <NavLink className="hoverLink" to={"/"}>
              pages
            </NavLink>
          </li>
          <li>
            <NavLink className="hoverLink" to={"/blog"}>
              blog
            </NavLink>
          </li>
          <li>
            <NavLink className="hoverLink" to={"/about"}>
              about
            </NavLink>
          </li>
          <li>
            <NavLink className="hoverLink" to={"/contactus"}>
              contact us
            </NavLink>
          </li>
        </ul>
        {/* icons */}
        <ul className="flex items-center justify-center gap-6 text-xl md:text-2xl cursor-pointer">
          <li>
            <div className="flex items-center ">
              <div
                className={
                  searchInputIsOn
                    ? "flex items-center rounded-full w-full px-3 bg-white py-1"
                    : "hidden"
                }
              >
                <input
                  type="search"
                  placeholder="Search Products"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2 outline-none border-none rounded-full w-full"
                />
                <IoSearchOutline className="text-xl md:text-2xl hover:text-orange-500" />
              </div>

              <button
                onClick={toggleSearchButton}
                className="w-[37px] h-[37px] p-2 rounded-full cursor-pointer hover:text-orange-500"
              >
                {!searchInputIsOn ? <IoSearchOutline /> : <LiaTimesSolid />}
              </button>
            </div>
          </li>

          <li className="hover:text-orange-500">
            <CiHeart />
          </li>
          <li className="hover:text-orange-500">
            <SlHandbag />
          </li>
          <li className="hover:text-orange-500" onClick={profilePopOut}>
            <IoPersonCircleOutline />
          </li>
        </ul>
      </nav>

      {/* drop down profile */}
      <div className={showProfile ? "flex" : "hidden"}>
        <GetProfile />
      </div>

    </>
  );
};

export default NavBar;
