import { Link, NavLink } from "react-router-dom";
import GetProfile from "./GetProfile";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, fetchWishlist } from "../../store/product/productSlice";
import { ShoppingCart, User, Heart, Search, Menu } from "lucide-react";
import { TbUserFilled } from "react-icons/tb";

export default function Header() {
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const { wishlistItems, cart } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      dispatch(fetchWishlist(user.id));
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  const wishListedProduct = wishlistItems.map((item) => item.product);
  const cartItems = cart.map((item) => item.product);
  return (
    <header className="p-3 bg-white border-1 border-gray-200 w-full sticky top-0 z-10 right-0">
      <div className="flex items-center justify-between w-full gap-4 max-w-[1000px] w-full mx-auto h-10">
        <Link
          to={"/"}
          className="text-base lg:text-xl font-medium hidden md:block"
        >
          <span className="text-amber-500 ">Messay </span>Fur.
        </Link>

        <Menu className="block md:hidden" />
        <div
          className={
            showSearchInput
              ? "w-full max-w-[400px] relative flex border-1 border-amber-500 rounded-md "
              : "hidden"
          }
        >
          <span className="absolute left-4 top-2 text-gray-400 hidden md:block">
            <Search />
          </span>
          <input
            type="search"
            name="search"
            id="search"
            className="w-full border-r-0 pl-4 md:pl-12 py-2  pr-1 md:pr-2 focus:outline-none text-xs lg:text-base"
            placeholder="Search"
          />
          <button className="bg-amber-500  text-white md:px-5 px-3 rounded-r-md hover:bg-transparent hover:text-amber-400 transition text-sm lg:text-base">
            <span className="block md:hidden">
              <Search className="size-4" />{" "}
            </span>{" "}
            <span className="hidden md:block">Search</span>{" "}
          </button>
        </div>

        <div
          className={
            showSearchInput
              ? "hidden"
              : "flex items-center space-x-6 capitalize text-xs md:text-sm hidden md:flex"
          }
        >
          <NavLink to={"/"} className="">
            Home
          </NavLink>
          <NavLink to={"/shop"} className="">
            Shop
          </NavLink>
          <NavLink to={"/"} className="">
            About us
          </NavLink>
          <NavLink to={"/"} className="">
            Contact us
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <Search onClick={() => setShowSearchInput(!showSearchInput)} />
          <div className="text-center text-gray-700 hover:text-primary transition relative">
            <Link to="/wishlist">
              <div className="text-2xl">
                <Heart />
              </div>
              <div className="absolute right-0 left-3 -top-2 w-5 h-5 rounded-full flex items-center justify-center bg-amber-500 text-white text-xs">
                {wishListedProduct.length}
              </div>
            </Link>
          </div>
          <div className="text-center text-gray-700 hover:text-primary transition relative">
            <Link to="/cart">
              <div className="text-2xl">
                <ShoppingCart />
              </div>
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
                {cartItems.length}
              </div>
            </Link>
          </div>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              {showProfile ? <TbUserFilled /> : <User />}
              <div className={`${showProfile ? "block" : "hidden"}`}>
                <GetProfile userId={user?.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
