import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelatedProducts,
  addToCart,
  handleAddToWishlist,
} from "../../../store/product/productSlice";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

export default function RelatedProducts({ productId }) {
  const dispatch = useDispatch();
  const { related, loading, error, cart } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (productId && !related[productId]) {
      dispatch(fetchRelatedProducts({ productId, limit: 4 }));
    }
  }, [dispatch, productId, related]);

  const relatedProducts = related[productId] || [];
  if (loading) return <p>Loading related products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {relatedProducts && relatedProducts.length > 0 ? (
        relatedProducts.map((item, _) => (
          <div key={item?.id} className="newArriveContainer">
            <div className="relative">
              <img src={item?.image} alt={item?.name} className="w-full" />
              {/* hovering icons */}
              <div className="hoverBgContainer">
                <Link
                  to={`/product/${item?.id}`}
                  className="iconsWhenHovering"
                  title="view product"
                >
                  <IoSearchOutline />
                </Link>
                <span
                  onClick={() => {
                    dispatch(
                      handleAddToWishlist({
                        productId: item.id,
                        userId: user.id,
                      })
                    );
                  }}
                  className="iconsWhenHovering"
                  title="add to wishlist"
                >
                  <IoIosHeartEmpty />
                </span>
              </div>
            </div>
            <div className="pt-4 pb-3 px-2">
              <h4 className="itemName">{item?.productName}</h4>
              <div className="flex items-baseline flex-wrap gap-1 mb-1">
                <p className="text-sm font-semibold">
                  {formatCurrency(item?.price, "ETB", "eng-ET")}
                </p>
                <p className="text-xs text-gray-400 line-through">
                  55,900 birr
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-xs text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="text-xs text-gray-500 ml-3">
                  ({item?.review})
                </div>
              </div>
            </div>
            {/* add to cart button */}
            <button
              onClick={cart.some((cartItem)=> cartItem.productId === item.id) ? () =>
                dispatch(removeFromCart({ productId: item.id, userId: user.id }))
              : () =>
                dispatch(addToCart({ productId: item.id, userId: user.id }))
              }
              className="addToCartBtn"
            >
              {cart.some((cartItem) => cartItem.productId === item.id) ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
