import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedProducts } from "../../store/product/productSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  addToCart,
  handleAddToWishlist,
  fetchAverageRating,
} from "../../store/product/productSlice";
import Loading from "../../utils/loading/Loading";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function RecommendedForYou() {
  const dispatch = useDispatch();
  const { recommended, loading, error, averageRatings } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);
  const userId = user?.id;

  useEffect(() => {
    dispatch(fetchRecommendedProducts(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (recommended && recommended.length > 0) {
      const productIds = recommended.map((p) => p.id);
      dispatch(fetchAverageRating(productIds));
    }
  }, [recommended, dispatch]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="pb-16 max-w-[1000px] w-full mx-auto text-left p-3">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Recommended for you
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended && recommended.length > 0 ? (
          recommended.map((item, index) => (
            <motion.div
              key={item?.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="newArriveContainer"
            >
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
                <div className="flex items-center gap-1 mt-2">
                  {averageRatings[item.id] > 0 ? (
                    <>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={16}
                          fill={
                            n <= averageRatings[item.id] ? "#facc15" : "none"
                          }
                          stroke="#facc15"
                          style={{
                            opacity:
                              n - 0.5 === averageRatings[item.id] ? 0.5 : 1,
                          }}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">
                        {averageRatings[item.id].toFixed(1)} / 5
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400 ml-1">
                      No ratings yet
                    </span>
                  )}
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
            </motion.div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
