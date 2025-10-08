import { Link, NavLink } from "react-router-dom";
import GetProfile from "./GetProfile";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, fetchWishlist } from "../../store/product/productSlice";
import { ShoppingCart, User, Heart, Search, Menu } from "lucide-react";
import { TbUserFilled } from "react-icons/tb";
import { LiaTimesSolid } from "react-icons/lia";
import "./style.css";
import SearchProduct from "./SearchProduct";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const { wishlistItems, cart } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [showSearchInput, setShowSearchInput] = useState(false);
const [showMenu, setShowMenu] = useState(false);
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
          <span className="text-amber-500 ">Mesay </span>Furniture.
        </Link>

        <Menu onClick={() => setShowMenu(!showMenu)} className="block z-20 md:hidden" />

       <div onClick={() => setShowMenu(false)} className={showMenu ? "bg-black md:hidden opacity-50 w-full min-h-screen absolute z-1 right-0 top-0" : "hidden"}></div>

       <div className={`fixed top-0 left-0 z-10 h-full w-64 bg-white shadow-md p-2 md:hidden transition-transform duration-300 ${showMenu ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} style={{ maxHeight: "100vh" }}>
        
        <div onClick={() => setShowMenu(false)}
          className="flex flex-col items-center gap-4 capitalize text-xs md:text-sm md:hidden absolute top-16 left-0 bg-white w-full h-auto pb-4"
        >
          <NavLink to={"/"} className="hoverLink">
            Home
          </NavLink>
          <NavLink to={"/shop"} className="hoverLink">
            Shop
          </NavLink>
          <NavLink to={"/about"} className="hoverLink">
            About us
          </NavLink>
          <NavLink to={"/contact-us"} className="hoverLink">
            Contact us
          </NavLink>
        </div>

        <div className={isAuthenticated ? "hidden" : "flex items-center space-x-4 absolute top-50 right-10 text-sm"}>
        <Link to={"/login"} className="bg-amber-500 hover:transparent border-1 border-amber-500 px-4 py-1.5 rounded-md text-white">Log In</Link>
        <Link to={"/signup"} className="bg-white border-1 border-amber-500 px-4 py-1.5 rounded-md text-amber-500 hover:bg-amber-500 hover:text-white">Sign up</Link>
        </div>
        </div>


        <div
          className={
            showSearchInput
              ? "hidden"
              : "flex items-center space-x-6 capitalize text-xs md:text-sm hidden md:flex"
          }
        >
          <NavLink to={"/"} className="hoverLink">
            Home
          </NavLink>
          <NavLink to={"/shop"} className="hoverLink">
            Shop
          </NavLink>
          <NavLink to={"/about"} className="hoverLink">
            About us
          </NavLink>
          <NavLink to={"/contact-us"} className="hoverLink">
            Contact us
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          {showSearchInput && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[400px]"
            >
              <SearchProduct />
            </motion.div>
          )}

          <button onClick={() => setShowSearchInput(!showSearchInput)}>
            {showSearchInput ? <LiaTimesSolid /> : <Search />}
          </button>

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
