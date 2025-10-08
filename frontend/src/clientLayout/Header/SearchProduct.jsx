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
    <div className="w-full max-w-[350px] relative flex border-1 border-gray-100 rounded-md ">
      <input
        type="search"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border-r-0 py-2 px-4 bg-gray-50 hover:bg-gray-100 focus:outline-orange-400 text-xs md:text-sm rounded-l-md"
        placeholder="Search products..."
        onKeyDown={(e) => {
          if(e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        onClick={handleSearch}
        className="bg-amber-500  text-white md:px-5 px-3 rounded-r-md hover:bg-transparent hover:text-orange-500 transition text-sm"
      >
        <span className="block md:hidden">
          <Search className="size-4" />{" "}
        </span>{" "}
        <span className="hidden md:block">Search</span>{" "}
      </button>

      <div className={searchTerm ? "w-full flex-col absolute bg-white top-full left-0 shadow-lg z-10 max-h-60 overflow-y-auto mt-2 rounded-sm shadow-md" : "hidden"}>
        {productItems.length > 0 ? productItems.map((item) => (
          <div key={item.id} className="p-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer">
            <p className="text-xs md:text-sm">{item.productName}</p>
          </div>
        )) : (
          <div className="p-2 border-b border-gray-100">
            <p className="text-xs md:text-sm">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
