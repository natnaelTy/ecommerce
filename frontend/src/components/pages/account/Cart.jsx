import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchWishlist,
  removeWishlist,
} from "../../../store/product/productSlice";
import { Trash } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Cart = () => {

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

    const wishListedProduct = wishlistItems.map((item) => item.product);

  return (
    <div className="mx-auto py-8 px-2 min-h-screen">
    <div className="max-w-[1000px] mx-auto w-full mb-8">
    <h1 className="font-semibold text-xl md:text-2xl">Shopping cart.</h1>
    <table className="w-full mt-4">
        <thead >
            <tr className="border-b-2 border-gray-300 flex items-center justify-between w-full">
            <th className="py-2">Product</th>
            <th className="py-2">Price</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Quantity</th>
            </tr>
        </thead>
        <tbody>
            {wishListedProduct && wishListedProduct.length > 0 ? (
            wishListedProduct.map((item) => (
                <tr key={item?.id} className="border-b border-gray-200 flex items-center justify-between w-full">
                <td className="py-4">
                    <div className="w-30 h-25 flex items-center gap-4">
                    <img
                    src={item?.image}
                    alt={item?.productName}
                    className="w-full object-cover "
                    />
                    <h2 className="text-sm md:text-base font-semibold">
                        {item?.productName}
                    </h2>
                    </div>
                </td>
    
                <td className="py-4">{item?.price} Birr</td>
                <td className="py-4">
                    {/* Quantity input can be added here */}
                    1
                </td>
                <td className="py-4">
                    <button
                    onClick={() =>
                        dispatch(
                        removeWishlist({ userId: user.id, productId: item?.id })
                        )
                    }
                    className="text-red-500 hover:text-red-300"
                    >
                    {loading ? (
                        <PuffLoader />
                    ) : (
                        <Trash />
                    )}
                    </button>
                </td>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan="5" className="text-center py-4">
                Your cart is empty.
                </td>
            </tr>
            )}
        </tbody>
    </table>
   
      </div>
    </div>
  );
};

export default Cart;
