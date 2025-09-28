import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  addToCart,
  handleAddToWishlist,
  fetchAverageRating,
  fetchNewArrivalProducts,
} from "../../store/product/productSlice";
import { Star } from "lucide-react";
import Loading from "../../utils/loading/Loading";
import { motion } from "framer-motion";

export default function NewArrival() {
  const dispatch = useDispatch();
  const { newArrivalProducts, loading, averageRatings } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchNewArrivalProducts());
  }, [dispatch]);

  useEffect(() => {
    if (newArrivalProducts && newArrivalProducts.length > 0) {
      const productIds = newArrivalProducts.map((p) => p.id);
      dispatch(fetchAverageRating(productIds));
    }
  }, [newArrivalProducts, dispatch]);

  const getOnly4Products = newArrivalProducts.slice(-4).reverse();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="pb-16 max-w-[1000px] w-full mx-auto text-left p-3">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          top new arrival
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getOnly4Products && getOnly4Products.length > 0 ? (
            getOnly4Products.map((item, index) => (
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
    </>
  );
}
