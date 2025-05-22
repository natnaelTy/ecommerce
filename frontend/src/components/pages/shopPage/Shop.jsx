import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../../store/product/productSlice";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import SideBar from "./SideBar";
import { PropagateLoader } from "react-spinners";

export default function Shop() {
  const dispatch = useDispatch();
  const { productItems, loading, error } = useSelector(
    (state) => state.product
  );
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState("default");
  const [filteredAndSorted, setFilteredAndSorted] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState("grid-3");

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const filteredProduct =
    selectedCategory.length === 0
      ? productItems
      : productItems.filter((product) =>
          selectedCategory.includes(product.category)
        );

  const handleCheckboxChange = (category) => {
    setSelectedCategory(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // remove
          : [...prev, category] // add
    );
  };

  function handleLayoutChange() {
    setSelectedLayout((prev) => (prev === "grid-3" ? "grid-2" : "grid-3"));
  }

  useEffect(() => {
    let sorted = [...filteredProduct];

    if (selectedSorting === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedSorting === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selectedSorting === "default") {
      sorted = [...filteredProduct];
    }

    setFilteredAndSorted(sorted);
  }, [selectedSorting, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#ffab00" />
      </div>
    );
  }

  console.log(selectedLayout);
  return (
    <>
      <div className="flex items-start max-w-[900px] mx-auto w-full">
        {/* side bar */}
        <SideBar
          handleCheckboxChange={handleCheckboxChange}
          selectedCategory={selectedCategory}
        />

        <div className="pb-16 max-w-[1000px] w-full mx-auto text-left p-3">
          <div className="w-full flex items-center justify-between mb-3">
            <select
              onChange={(e) => setSelectedSorting(e.target.value)}
              value={selectedSorting}
              className="border-1 border-gray-300 rounded-sm p-1 text-xs"
            >
              <option value="default">Default sorting</option>
              <option value="lowToHigh">Sort by price: low to high</option>
              <option value="highToLow">Sort by price: high to low</option>
            </select>

            <button
              className="flex items-center gap-2"
              onClick={handleLayoutChange}
            >
              <CgMenuGridO
                className={
                  selectedLayout === "grid-3"
                    ? "bg-amber-500 text-2xl p-1 text-white rounded-xs"
                    : "text-2xl"
                }
              />
              <HiViewGrid
                className={
                  selectedLayout === "grid-2"
                    ? "bg-amber-500 text-2xl p-1 text-white rounded-xs"
                    : "text-2xl"
                }
              />
            </button>
          </div>
          <div
            className={
              selectedLayout === "grid-3"
                ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "grid grid-cols-2 gap-4"
            }
          >
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((item, _) => (
                <div key={item?.id} className="newArriveContainer">
                  <div className="relative">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-full"
                    />
                    {/* hovering icons */}
                    <div className="hoverBgContainer">
                      <Link
                        to={"/"}
                        className="iconsWhenHovering"
                        title="view product"
                      >
                        <IoSearchOutline />
                      </Link>
                      <Link
                        to={"/"}
                        className="iconsWhenHovering"
                        title="add to wishlist"
                      >
                        <IoIosHeartEmpty />
                      </Link>
                    </div>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                    <Link to={"/"}>
                      <h4 className="itemName">{item?.name}</h4>
                    </Link>
                    <div className="flex items-baseline mb-1 space-x-2">
                      <p className="text-sm text-primary font-semibold">
                        {item.price} birr
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
                      <div className="text-xs text-gray-500 ml-3">(150)</div>
                    </div>
                  </div>
                  {/* add to cart button */}
                  <Link to={"/"}>
                    <button className="addToCartBtn">Add to cart</button>
                  </Link>
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
