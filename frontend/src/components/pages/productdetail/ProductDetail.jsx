import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star } from "lucide-react";
import {
  House,
  ChevronRight,
  ShoppingCart,
  Heart,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import RelatedProducts from "./RelatedProducts";
import {
  addToCart,
  handleAddToWishlist,
  removeFromCart,
  removeFromWishlist,
  createReview,
  fetchProductReviews,
} from "../../../store/product/productSlice";
import { useDispatch } from "react-redux";
import Loading from "../../../utils/loading/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    productItems,
    loading,
    newArrivalProducts,
    cart,
    wishlistItems,
    reviews,
  } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const [product, setProduct] = useState(
    productItems.find((p) => p.id === id || p.id === parseInt(id)) ||
      newArrivalProducts.find((p) => p.id === id || p.id === parseInt(id)) ||
      null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    rating: 0,
    comment: "",
  });
  const validReviews = reviews.filter((r) => typeof r?.rating === "number");
  const avgRating =
    validReviews.reduce((acc, r) => acc + r.rating, 0) / validReviews.length;
  const rounded = Math.round(avgRating * 2) / 2;

  console.log(reviews);
  // fetch product by ID if not found in Redux state
  useEffect(() => {
    if (!product && id) {
      axios
        .get(`http://localhost:5000/api/products/allProducts`)
        .then((res) => {
          const all = res.data.products || [];
          const found = all.find((p) => p.id === id || p.id === parseInt(id));
          if (found) setProduct(found);
        });
    }
  }, [product, id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createReview({
        userId: user.id,
        productId: product.id,
        rating: form.rating,
        comment: form.comment,
      })
    ).unwrap();
  };

  // fetch reviews
  useEffect(() => {
    if (product && product.id) {
      dispatch(fetchProductReviews(product.id));
    }
  }, [product, dispatch]);

  if (!product) return <p>Product not found</p>;

  // loading
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="max-w-[1000px] mx-auto w-full py-4 flex items-center gap-3 p-3">
        <Link to={"/"}>
          <House className="size-4" />
        </Link>
        <span className="text-sm text-gray-400">
          <ChevronRight className="size-4" />
        </span>
        <p className="text-gray-600 font-medium">Product</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto w-full p-3">
        <div key={product.id}>
          <img src={product.image} alt="product" className="w-full" />
          <div className="grid grid-cols-5 gap-4 mt-4">
            <img
              src={product.image}
              alt="product2"
              className="w-full cursor-pointer border border-primary"
            />
            <img
              src={product.image}
              alt="product2"
              className="w-full cursor-pointer border"
            />
            <img
              src={product.image}
              alt="product2"
              className="w-full cursor-pointer border"
            />
            <img
              src={product.image}
              alt="product2"
              className="w-full cursor-pointer border"
            />
            <img
              src={product.image}
              alt="product2"
              className="w-full cursor-pointer border"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {product.productName}
          </h2>
          {/* average rating section */}
          {Array.isArray(reviews) &&
            reviews.filter((r) => typeof r?.rating === "number").length > 0 &&
            (() => {
              return (
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex gap-0.5 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={18}
                        fill={n <= Math.floor(rounded) ? "#facc15" : "none"}
                        stroke="#facc15"
                        style={{ opacity: n - 0.5 === rounded ? 0.5 : 1 }}
                      />
                    ))}
                  </span>
                  <span className="text-gray-600 text-xs">
                    {avgRating.toFixed(1)} / 5
                  </span>
                  <span className="text-gray-600 text-sm">
                    ({validReviews.length} reviews)
                  </span>
                </div>
              );
            })()}
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">Yes</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">{product.brand}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">{product.category}</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-pink-500 font-semibold">
              {formatCurrency(product.price, "ETB", "en-ET")}
            </p>
            <p className="text-base text-gray-400 line-through">
              {formatCurrency(90000, "ETB", "en-ET")}
            </p>
          </div>

          <p className="mt-4 text-gray-500 text-sm">{product.description}</p>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Color
            </h3>
            <div className="flex items-center gap-2">
              <div className="color-selector">
                <input type="radio" name="color" id="red" className="hidden" />
                <label
                  htmlFor="red"
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                ></label>
              </div>
              <div className="color-selector">
                <input
                  type="radio"
                  name="color"
                  id="black"
                  className="hidden"
                />
                <label
                  htmlFor="black"
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                ></label>
              </div>
              <div className="color-selector">
                <input
                  type="radio"
                  name="color"
                  id="white"
                  className="hidden"
                />
                <label
                  htmlFor="white"
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                ></label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                -
              </div>
              <div className="h-8 w-8 text-base flex items-center justify-center">
                {product.quantity}
              </div>
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                +
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <button
              className="addToCartBtn"
              onClick={
                cart.some((cartItem) => cartItem.productId === product.id)
                  ? () =>
                      dispatch(
                        removeFromCart({
                          productId: product.id,
                          userId: user.id,
                        })
                      )
                  : () =>
                      dispatch(
                        addToCart({ productId: product.id, userId: user.id })
                      )
              }
            >
              <ShoppingCart className="size-4" />{" "}
              {cart.some((cartItem) => cartItem.productId === product.id)
                ? "Remove from cart"
                : "Add to cart"}
            </button>
            <button
              onClick={
                wishlistItems?.some(
                  (cartItem) => cartItem.productId === product.id
                )
                  ? () =>
                      dispatch(
                        removeFromWishlist({
                          productId: product.id,
                          userId: user.id,
                        })
                      )
                  : () =>
                      dispatch(
                        handleAddToWishlist({
                          productId: product.id,
                          userId: user?.id,
                        })
                      )
              }
              className="border border-gray-300 text-gray-600 px-5 py-2 w-full text-sm rounded flex items-center gap-2 hover:text-pink-500 transition"
            >
              <Heart className="size-4" />{" "}
              {wishlistItems.some(
                (cartItem) => cartItem.productId === product.id
              )
                ? "Remove from wishlist"
                : "Add to wishlist"}
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            <Link
              to="#"
              className="text-blue-600 hover:text-blue-500 h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center"
              title="Go to our Facebook page"
            >
              <FaFacebook className="h-5 w-5" />
            </Link>
            <Link
              to="#"
              className="text-blue-500 hover:text-blue-400 h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center"
              title="Go to our Telegram channel"
            >
              <BsTelegram className="h-5 w-5" />
            </Link>
            <Link
              to="#"
              className="text-gray-900 hover:text-gray-700 h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center"
              title="Go to our TikTok page"
            >
              <FaTiktok className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* add review Section */}

      <div className="p-3 max-w-[1000px] mx-auto w-full pb-16">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold pb-4">
          Add a Review
        </h1>
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <h3 className="text-sm">Add Your Rating*</h3>
          <label>
            <span className="inline-flex items-center text-yellow-500 cursor-pointer">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={25}
                  fill={n <= form.rating ? "#facc15" : "none"}
                  stroke="#facc15"
                  onClick={() => setForm({ ...form, rating: n })}
                  className={n <= form.rating ? "" : "opacity-40"}
                  style={{ transition: "opacity 0.2s" }}
                />
              ))}
            </span>
          </label>
          <textarea
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            placeholder="Write your review (optional)"
            className="inputs"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 transition-colors duration-200 text-white text-sm rounded-md"
          >
            Submit Review
          </button>
        </form>

        {/* reviews */}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">
            Recent Reviews{" "}
            <ChevronDown
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="inline-block hover:text-gray-500 size-6"
            />
          </h3>
          {(!Array.isArray(reviews) ||
            reviews.filter((r) => typeof r?.rating === "number").length ===
              0) && <p className="text-sm text-gray-500">No reviews yet.</p>}
          {Array.isArray(reviews) &&
            reviews
              .filter((r) => typeof r?.rating === "number")
              .reverse()
              .map((r) => (
                <div
                  key={r?.id}
                  className={
                    isModalOpen
                      ? "flex items-start gap-3 mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0"
                      : "hidden"
                  }
                >
                  <img
                    src={r?.user?.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">
                        {r?.user?.fullName}
                      </span>
                      <span className="flex gap-0.5 text-yellow-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill="#facc15"
                            stroke="#facc15"
                          />
                        ))}
                      </span>
                      <span className="text-gray-500 text-xs ml-auto">
                        {new Date(r.createdAt).toLocaleTimeString("en-ET", {
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                        <span className="ml-2">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                    {r?.comment && (
                      <p className="text-gray-500 text-xs">{r.comment}</p>
                    )}
                  </div>
                </div>
              ))}
        </div>

        <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium mt-6">
          Product details
        </h3>
        <div className="w-full pt-6">
          <div className="text-gray-600">
            <p>{product.description}</p>
          </div>

          <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
            <tbody>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Color
                </th>
                <th className="py-2 px-4 border border-gray-300 ">
                  Blank, Brown, Red
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Material
                </th>
                <th className="py-2 px-4 border border-gray-300 ">Latex</th>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Weight
                </th>
                <th className="py-2 px-4 border border-gray-300 ">55kg</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-3 max-w-[1000px] mx-auto w-full pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Related products
        </h2>
        <div>{product?.id && <RelatedProducts productId={product.id} />}</div>
      </div>
    </>
  );
}
