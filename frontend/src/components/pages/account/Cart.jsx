import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchWishlist,
  removeWishlist,
} from "../../../store/product/productSlice";
import { Trash, Minus, Plus, X } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlistItems, loading, error } = useSelector(
    (state) => state.product
  );

  const wishListedProduct = wishlistItems.map((item) => item.product || {});

  // Quantity map: { [productId]: quantity }
  const [quantities, setQuantities] = useState({});

  // Initialize quantities when wishlist loads
  useEffect(() => {
    if (wishListedProduct.length > 0) {
      const initial = {};
      wishListedProduct.forEach((p) => {
        if (p?.id != null) initial[p.id] = 1;
      });
      setQuantities((q) => ({ ...initial, ...q })); // preserve existing if any
    }
  }, []);

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  const increase = useCallback((productId) => {
    setQuantities((q) => ({
      ...q,
      [productId]: (q[productId] || 1) + 1,
    }));
  }, []);

  const decrease = useCallback((productId) => {
    setQuantities((q) => {
      const current = q[productId] || 1;
      const next = current - 1;
      return {
        ...q,
        [productId]: next >= 1 ? next : 1,
      };
    });
  }, []);

  const totalItems = Object.values(quantities).reduce((sum, v) => sum + v, 0);
  const totalPrice = wishlistItems.reduce((acc, wi) => {
    const product = wi.product || {};
    const qty = quantities[product.id] || 1;
    return acc + (product.price || 0) * qty;
  }, 0);

  return (
    <div className="mx-auto py-8 px-2 min-h-screen">
      <div className="max-w-[1000px] mx-auto w-full mb-8 flex h-full flex-col md:flex-row items-start justify-between py-2 gap-3 rounded-md">
        <div className="w-full">
          <h1 className="font-semibold text-xl mb-10">Shopping cart.</h1>
          <table className="w-full mt-4 table-auto border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-2 text-left w-1/3">Product</th>
                <th className="py-2 text-center w-1/3">Price</th>
                <th className="py-2 text-center w-1/6">Quantity</th>
                <th className="py-2 text-center w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishListedProduct && wishListedProduct.length > 0 ? (
                wishListedProduct.map((item) => (
                  <tr key={item?.id} className="border-b border-gray-200">
                    <td className="py-4">
                      <div className="flex items-center gap-4 flex-wrap">
                        <img
                          src={item?.image}
                          alt={item?.productName}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <h2 className="text-sm md:text-base font-semibold">
                          {item?.productName}
                        </h2>
                      </div>
                    </td>
                    <td className="py-4 text-center text-sm font-medium">
                      {item?.price} Birr
                    </td>
                    <div className="flex items-center justify-center h-30 gap-2 text-sm">
                      <Minus
                        onClick={() => decrease(item?.id)}
                      />
                      <td className="p-1 bg-gray-100 rounded-full text-center text-gray-600 ">
                        {quantities[item?.id] || 1}
                      </td>
                      <Plus onClick={() => increase(item?.id)} />
                    </div>
                    <td className="py-4 text-center">
                      <button
                        onClick={() =>
                          dispatch(
                            removeWishlist({
                              userId: user.id,
                              productId: item?.id,
                            })
                          )
                        }
                        className="text-gray-400 hover:text-gray-300"
                      >
                        {loading ? <PuffLoader /> : <X />}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="text-gray-600 mb-2">
                Total Items: {totalItems}
              </p>
              <p className="text-gray-600 mb-2 text-green-700 font-semibold">
                Total Price:{" "}
                {totalPrice.toFixed(2)}
                Birr
              </p>
              <button className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-500 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
