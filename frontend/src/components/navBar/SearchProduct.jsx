import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../../store/product/productSlice";

export default function SearchProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productItems, currentPage, loading } = useSelector(
    (state) => state.product
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    dispatch(fetchProduct({ page: 1, limit: 9, search: searchTerm }));
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  useEffect(() => {
    dispatch(fetchProduct({ page: currentPage, limit: 9, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);


  return (
    <div className="w-full max-w-[400px] relative flex border-1 border-orange-400 rounded-md ">
      <span className="absolute left-4 top-2 text-gray-400 hidden md:block">
        <Search />
      </span>
      <input
        type="search"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border-r-0 pl-4 md:pl-12 py-2  pr-1 md:pr-2 focus:outline-none text-xs lg:text-base"
        placeholder="Search"
        onKeyDown={(e) => {
          if(e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        onClick={handleSearch}
        className="bg-amber-500  text-white md:px-5 px-3 rounded-r-md hover:bg-transparent hover:text-amber-400 transition text-sm lg:text-base"
      >
        <span className="block md:hidden">
          <Search className="size-4" />{" "}
        </span>{" "}
        <span className="hidden md:block">Search</span>{" "}
      </button>

      <div className={searchTerm ? "w-full flex-col absolute bg-white top-full left-0 shadow-lg z-10 max-h-60 overflow-y-auto mt-2 rounded-sm shadow-md" : "hidden"}>
        {productItems.map((item) => (
          <div key={item.id} className="p-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer">
            <p className="text-xs md:text-sm">{item.productName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
