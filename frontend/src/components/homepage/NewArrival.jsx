import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchNewArrivalProducts } from "../../store/product/productSlice";
import { useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  addToCart,
  handleAddToWishlist,
} from "../../store/product/productSlice";
import { fetchProductReviews } from "../../store/product/productSlice";
import { Star, ChevronDown } from "lucide-react";
import Loading from "../../utils/loading/Loading";

export default function NewArrival() {
  const dispatch = useDispatch();
  const { newArrivalProducts, loading, error, reviews } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchNewArrivalProducts());
  }, [dispatch]);

  useEffect(() => {
    if (newArrivalProducts && newArrivalProducts.id) {
      dispatch(fetchProductReviews(newArrivalProducts.id));
    }
  }, [newArrivalProducts, dispatch]);

  const getOnly4Products = newArrivalProducts.slice(-4).reverse();
  // calculate average rating
  const validReviews = reviews.filter((r) => typeof r?.rating === "number");
  const avgRating =
    validReviews.reduce((acc, r) => acc + r.rating, 0) / validReviews.length;
  const rounded = Math.round(avgRating * 2) / 2;

  console.log(reviews);
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
            getOnly4Products.map((item, _) => (
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
                  <div className="flex items-center gap-1 mt-2">
                    {
                    avgRating > 0 ? (
                      <>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            size={16}
                            fill={n <= Math.floor(rounded) ? "#facc15" : "none"}
                            stroke="#facc15"
                            style={{ opacity: n - 0.5 === rounded ? 0.5 : 1 }}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">
                          {
                          avgRating.toFixed(1)} / 5
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
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </>
  );
}
