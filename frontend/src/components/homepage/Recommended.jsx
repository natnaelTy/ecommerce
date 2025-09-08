import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedProducts } from "../../store/product/productSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  addToCart,
  handleAddToWishlist,
} from "../../store/product/productSlice";



export default function RecommendedForYou() {
  const dispatch = useDispatch();
  const { recommended, loading, error } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecommendedProducts(userId));
    }
  }, [userId, dispatch]);

  console.log("Recommended products:", recommended);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="pb-16 max-w-[1000px] w-full mx-auto text-left p-3">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Recommended for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended && recommended.length > 0 ? (
          recommended.map((item, _) => (
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
                onClick={() =>
                  dispatch(addToCart({ productId: item.id, userId: user.id }))
                }
                className="addToCartBtn"
              >
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
