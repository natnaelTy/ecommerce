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
          <NavLink to={"/contact"} className="hoverLink">
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
