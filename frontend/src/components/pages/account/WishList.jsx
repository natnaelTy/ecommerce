import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchWishlist,
  removeWishlist,
} from "../../../store/product/productSlice";
import { Trash, ShoppingCart, Store, ChevronRight, MoveLeft, FileHeart  } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { addToCart } from "../../../store/product/productSlice";

function WishList() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlistItems, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please log in to view your wish list.</p>
        <Link to="/login" className="text-blue-500 ml-2">
          Log In
        </Link>
      </div>
    );
  }

  const wishListedProduct = wishlistItems.map((item) => item.product);

  // loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#ffab00" />
      </div>
    );
  }

  return (
    <div className="mx-auto py-8 px-2 min-h-screen">
      <div className="max-w-[1000px] mx-auto w-full">
        <div className="flex items-center justify-start gap-2 mb-6">
          <Link to="/shop" title="Go to shop">
            <Store className="hover:text-orange-500 transition duration-200"/>
          </Link>

          <ChevronRight />

          <h1 className="text-lg md:text-xl font-semibold">
            Your Wish List
          </h1>
        </div>
        {/* Wish list items will be displayed here */}
        {wishListedProduct && wishListedProduct.length > 0 ? (
          wishListedProduct.map((item) => (
            <div
              key={item?.id}
              className="flex items-center justify-between mb-4 border-1 border-gray-200 p-3 rounded-sm flex-wrap gap-2"
            >
              <div className="max-w-[120px] w-full h-[100px] relative">
                <img
                  src={item?.image}
                  alt={item?.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-sm md:text-lg font-semibold">
                {item?.productName}
              </h1>
              <p className="text-sm md:text-base text-pink-500 font-medium">
                {formatCurrency(item?.price, "ETB", "eng-ET")}
              </p>
              <button
                onClick={() =>
                  dispatch(addToCart({ productId: item.id, userId: user.id }))
                }
                className="bg-pink-500 px-4 py-2 rounded-md text-white hover:bg-pink-400"
              >
                <ShoppingCart className="inline-block mr-1" /> Add to cart
              </button>
              <span
                onClick={() =>
                  dispatch(
                    removeWishlist({ userId: user.id, productId: item?.id })
                  )
                }
              >
                {loading ? (
                  <PuffLoader />
                ) : (
                  <Trash className="text-red-500 hover:text-red-300 cursor-pointer" />
                )}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col mx-auto items-center justify-center gap-8 py-8 text-center">
            <p className="text-xl md:text-2xl font-medium">Your wish list is empty.</p>

            <FileHeart className="size-14 lg:size-25 text-gray-400" />


            <Link to={"/shop"}>
              <button className="py-2 px-4 mt-2 bg-black text-white py-2 rounded-md hover:bg-orange-500 transition duration-200 flex items-center gap-3">
                <span>
                  <MoveLeft />
                </span>
                Back to shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
