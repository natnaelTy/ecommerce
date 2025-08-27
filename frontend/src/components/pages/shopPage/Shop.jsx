import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../../store/product/productSlice";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { BiSolidGrid } from "react-icons/bi";
import { BiGridVertical } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import SideBar from "./SideBar";
import { PuffLoader } from "react-spinners";
import { TfiMenuAlt } from "react-icons/tfi";
import { addToCart } from "../../../store/product/productSlice";
import { formatCurrency } from "../../../utils/formatCurrency";



export default function Shop() {
  const dispatch = useDispatch();
  const { productItems, loading, error } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState("default");
  const [filteredAndSorted, setFilteredAndSorted] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(["grid-3"]);

  // fetch products from api
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // filter by category
  const filteredProduct =
    selectedCategory.length === 0
      ? productItems
      : productItems.filter((product) =>
          selectedCategory.includes(product.category)
        );

  // check if checkbox is checked
  const handleCheckboxChange = (category) => {
    setSelectedCategory(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // remove
          : [...prev, category] // add
    );
  };

  // layout function
  function handleLayoutChange(getCurrentLayout) {
    setSelectedLayout((prev) =>
      prev.includes(getCurrentLayout)
        ? prev.filter((lay) => lay !== getCurrentLayout)
        : [getCurrentLayout]
    );
  }

  console.log(selectedLayout);
  // sorting
  useEffect(() => {
    let sorted = [...filteredProduct];

    if (selectedSorting === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedSorting === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selectedSorting === "default") {
      [...sorted];
    }

    setFilteredAndSorted(sorted);
  }, [productItems, selectedSorting, selectedCategory]);

  // loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#ffab00" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-start max-w-[1000px] mx-auto w-full">
        {/* side bar */}
        <SideBar
          handleCheckboxChange={handleCheckboxChange}
          selectedCategory={selectedCategory}
        />

        {/* shop container */}
        <div className="pb-16 max-w-[1000px] w-full mx-auto text-left p-3">
          {/* layout buttons and sorting container */}
          <div className="w-full flex items-center justify-between mb-3">
            {/* sorting box */}
            <select
              onChange={(e) => setSelectedSorting(e.target.value)}
              value={selectedSorting}
              className="border-1 border-gray-300 rounded-sm p-1 text-xs"
            >
              <option value="default">Default sorting</option>
              <option value="lowToHigh">Sort by price: low to high</option>
              <option value="highToLow">Sort by price: high to low</option>
            </select>

            {/* layout buttons */}
            <button className="flex items-center gap-2">
              <BiSolidGrid
                onClick={() => handleLayoutChange("grid-3")}
                className={
                  selectedLayout.includes("grid-3")
                    ? "bg-amber-500 text-2xl p-1 text-white rounded-xs"
                    : "text-2xl"
                }
              />
              <BiGridVertical
                onClick={() => handleLayoutChange("grid-2")}
                className={
                  selectedLayout.includes("grid-2")
                    ? "bg-amber-500 text-2xl p-1 text-white rounded-xs"
                    : "text-2xl"
                }
              />
              <TfiMenuAlt
                onClick={() => handleLayoutChange("grid-1")}
                className={
                  selectedLayout.includes("grid-1")
                    ? "bg-amber-500 text-2xl p-1 text-white rounded-xs"
                    : "text-2xl"
                }
              />
            </button>
          </div>

          {/* main container */}
          <div
            className={
              (selectedLayout.includes("grid-3") &&
                "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4") ||
              (selectedLayout.includes("grid-2") && "grid grid-cols-2 gap-4") ||
              (selectedLayout.includes("grid-1") && "grid grid-cols-1 gap-6")
            }
          >
            {/* shop card */}
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((item, _) => (
                <div
                  key={item.id}
                  className={
                    selectedLayout.includes("grid-1")
                      ? "bg-white border-b-1 border-gray-300 overflow-hidden max-w-[750px] w-full flex items-center gap-6"
                      : "newArriveContainer"
                  }
                >
                  {/* image container */}
                  <div className="relative max-w-[200px] md:max-w-[350px] w-full">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full"
                    />
                    {/* hovering icons */}
                    <div className="hoverBgContainer">
                      <Link
                        to={`/product/${item.id}`}
                        className="iconsWhenHovering"
                        title="view product"
                      >
                        <IoSearchOutline />
                      </Link>
                      <span
                        onClick={() => {
                          if (!user) {
                            // Optionally show a login prompt or toast
                            alert("Please log in to add to wishlist.");
                            console.error("User is not logged in");
                            return;
                          }
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
                  {/* layout for grid-cols-1 */}
                  <div
                    className={
                      selectedLayout.includes("grid-1")
                        ? " flex flex-col items-start gap-0 md:gap-4 justify-center"
                        : "flex gap-1 flex-col"
                    }
                  >
                    <div
                      className={
                        selectedLayout.includes("grid-1")
                          ? "flex flex-col gap-1 md:gap-4 mb-3"
                          : "p-1 md:p-2"
                      }
                    >
                      <Link to={"/"}>
                        <h4 className="itemName">{item.productName}</h4>
                      </Link>
                      <div className="flex items-baseline mb-1 space-x-2">
                        <p className="text-sm text-primary font-semibold">
                          {formatCurrency(item.price, "ETB", "en-ET")}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          75,900 birr
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
                          ({item.review})
                        </div>
                      </div>
                    </div>
                    {/* add to cart button */}
                      <button onClick={() => dispatch(addToCart({productId: item.id, userId: user.id}))} className="addToCartBtn">Add to cart</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
