import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchWishlist,
  removeWishlist,
} from "../../../store/product/productSlice";
import { Trash } from "lucide-react";
import { PuffLoader } from "react-spinners";

function WishList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { wishlistItems, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user]);

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
      {/* Wish list items will be displayed here */}
      {wishListedProduct && wishListedProduct.length > 0 ? (
        wishListedProduct.map((item) => (
          <div
            key={item?.id}
            className="flex items-center max-w-[1000px] mx-auto w-full justify-between mb-4 border-1 border-gray-200 p-3 rounded-sm flex-wrap gap-2"
          >
            <div className="max-w-[120px] w-full h-[100px] relative">
              <img
                src={item?.image}
                alt={item?.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">{item?.productName}</h1>
            <p className="text-sm md:text-base text-pink-500 font-medium">{item?.price} Birr</p>
            <button className="bg-pink-500 px-4 py-2 rounded-md text-white hover:bg-pink-400">
              Add to cart
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
        <p className="flex items-center justify-center h-screen">Your wish list is empty.</p>
      )}
    </div>
  );
}

export default WishList;
