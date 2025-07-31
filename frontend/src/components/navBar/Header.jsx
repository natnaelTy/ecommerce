
import { Link } from "react-router-dom";
import GetProfile from "../homepage/GetProfile";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import fetchWishlist from "../../store/product/productSlice";
import { ShoppingCart, User, Heart, Search  } from 'lucide-react';



export default function Header() {
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const { wishlistItems } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const wishListedProduct = wishlistItems.map((item) => item.product);

  function profilePopOut() {
    setShowProfile(!showProfile);
  }


  return (
    <header className="p-2 bg-white">
      <div className="flex items-center justify-between w-full gap-4 max-w-[1000px] w-full mx-auto">
        <Link
          to={"/"}
          className="text-base lg:text-xl font-medium hidden md:block"
        >
          <span className="text-amber-500 ">Messay </span>Fur.
        </Link>

        <div className="w-full max-w-[400px] relative flex border-1 border-amber-500 rounded-md ">
          <span className="absolute left-4 top-2 text-gray-400 hidden md:block">
            <Search  />
          </span>
          <input
            type="search"
            name="search"
            id="search"
            className="w-full  border-r-0 pl-4 md:pl-12 py-2  pr-1 md:pr-2 focus:outline-none text-sm lg:text-base"
            placeholder="Search"
          />
          <button className="bg-amber-400  text-white px-5 px-3 rounded-r-md hover:bg-transparent hover:text-amber-400 transition text-sm lg:text-base">
            <span className="block md:hidden">
              <Search  />{" "}
            </span>{" "}
            <span className="hidden md:block">Search</span>{" "}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center text-gray-700 hover:text-primary transition relative">
            <Link to="/wishlist">
              <div className="text-2xl">
                <Heart />
              </div>
              <div className="absolute right-0 left-3 -top-2 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
                {wishListedProduct.length}
              </div>
            </Link>
          </div>
          <div className="text-center text-gray-700 hover:text-primary transition relative">
            <div className="text-2xl">
              <ShoppingCart />
            </div>
            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              2
            </div>
          </div>
          <div
            onClick={profilePopOut}
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <User  />
              {showProfile && <GetProfile />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
