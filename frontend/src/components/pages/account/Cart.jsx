import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import {
  fetchCart,
  removeFromCart,
  updateCart,
} from "../../../store/product/productSlice";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { ShoppingCart, MoveLeft, Trash, Minus, Plus,  Store, ChevronRight } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart, loading, error } = useSelector((state) => state.product);

  // Map quantities: { [productId]: quantity }
  const [quantities, setQuantities] = useState({});

  // Fetch cart when user is logged in
  useEffect(() => {
    if (user?.id && isAuthenticated) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  // Initialize quantities when cart loads
  useEffect(() => {
    if (cart && cart.length > 0) {
      const initialQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item.product.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);

  // Quantity handlers
  const increase = useCallback((productId) => {
    setQuantities((q) => ({
      ...q,
      [productId]: (q[productId] || 1) + 1,
    }));
  }, []);

  const decrease = useCallback((productId) => {
    setQuantities((q) => {
      const current = q[productId] || 1;
      return {
        ...q,
        [productId]: current > 1 ? current - 1 : 1,
      };
    });
  }, []);

  // Totals
  const totalItems = Object.values(quantities).reduce((sum, v) => sum + v, 0);
  const totalPrice = cart.reduce((acc, wi) => {
    const product = wi.product || {};
    const qty = quantities[product.id] || wi.quantity || 1;
    return acc + (product.price || 0) * qty;
  }, 0);

  // Cart product list
  const cartList = cart.map((item) => item.product);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#ffab00" />
      </div>
    );
  }

  return (
    <div className="mx-auto py-8 px-2 min-h-screen">
      <div className="max-w-[1000px] mx-auto w-full mb-8 flex h-full flex-col md:flex-row items-start justify-between py-2 gap-3 rounded-md">
        <div className="w-full">
          <div className="flex items-center justify-start gap-2 mb-6">
            <Link to="/shop" title="Go to shop">
              <Store  className="hover:text-orange-500 transition duration-200"/>
            </Link>

            <ChevronRight />

            <h1 className="text-lg md:text-xl font-semibold">Shopping Cart</h1>
          </div>

          <table className="w-full mt-4 table-auto border-collapse">
            <thead>
              <tr
                className={
                  cartList.length <= 0 ? "hidden" : "border-b-2 border-gray-300"
                }
              >
                <th className="py-2 text-left w-1/3">Product</th>
                <th className="py-2 text-center w-1/6">Price</th>
                <th className="py-2 text-center w-1/6">Quantity</th>
                <th className="py-2 text-center w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartList && cartList.length > 0 ? (
                cartList.map((item) => (
                  <tr key={item?.id} className="border-b border-gray-200">
                    {/* Product info */}
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

                    {/* Price */}
                    <td className="py-4 text-center text-sm font-medium">
                      {formatCurrency(item?.price, "ETB", "eng-ET")}
                    </td>

                    {/* Quantity */}
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Minus
                          className="cursor-pointer"
                          onClick={() => decrease(item?.id)}
                        />
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                          {quantities[item?.id] || 1}
                        </span>
                        <Plus
                          className="cursor-pointer"
                          onClick={() => increase(item?.id)}
                        />
                      </div>
                    </td>

                    {/* Action (remove button) */}
                    <td className="py-4 text-center">
                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              userId: user.id,
                              productId: item?.id,
                            })
                          )
                        }
                        className="text-gray-400 hover:text-red-500"
                      >
                        {loading ? <PuffLoader size={16} /> : <Trash />}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="flex flex-col mx-auto items-center justify-center gap-8 py-8 text-center">
                      <p className="text-xl md:text-2xl font-medium">
                        Your cart is empty.
                      </p>
                      <ShoppingCart className="size-14 lg:size-25 text-gray-400" />
                      <Link to={"/shop"}>
                        <button className="py-2 px-4 mt-2 bg-black text-white py-2 rounded-md hover:bg-orange-500 transition duration-200 flex items-center gap-3">
                          <span>
                            <MoveLeft />
                          </span>
                          Back to shopping
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Order Summary */}
          <div className={cartList.length <= 0 ? "hidden" : "block mt-8"}>
            <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="text-gray-600 mb-2">Total Items: {totalItems}</p>
              <p className="text-gray-600 mb-2 text-green-700 font-semibold">
                Total Price: {formatCurrency(totalPrice, "ETB", "eng-ET")}
              </p>

              {/* Update Cart Button */}
              <button
                type="button"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
                onClick={() =>
                  dispatch(
                    updateCart({
                      userId: user.id,
                      items: cartList.map((item) => ({
                        productId: item?.id,
                        quantity: quantities[item?.id] || 1,
                      })),
                    })
                  )
                }
              >
                Update Cart
              </button>

              {/* Checkout Button */}
              <Link to="/checkout">
                <button className="w-full mt-2 bg-black text-white py-2 rounded-md hover:bg-orange-500 transition duration-200">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
