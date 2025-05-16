import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchNewArrivalProducts } from "../../store/product/productSlice";
import { useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NewArrival() { 
  const dispatch = useDispatch();
  const { newArrivalProducts, loading, error } = useSelector((state) => state.product);
 
  useEffect(() => {
    dispatch(fetchNewArrivalProducts())
    
  },[dispatch])
  
 if(loading) {
    <div>Loading..</div>
 }
 
  return (
    <>
      <div className="pb-16 max-w-[1000px] w-full mx-auto text-left p-3">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newArrivalProducts && newArrivalProducts.length > 0 ? newArrivalProducts.map((item, _) => (
                  <div key={item?.id} className="newArriveContainer" >
                  <div className="relative">
                      <img src={item?.image} alt={item?.name} className="w-full"/>
                      {/* hovering icons */}
                      <div className="hoverBgContainer">
                          <Link to={"/"}
                              className="iconsWhenHovering"
                              title="view product">
                              <IoSearchOutline/>
                          </Link>
                          <Link to={'/'}
                              className="iconsWhenHovering"
                              title="add to wishlist">
                              <IoIosHeartEmpty/>
                          </Link>
                      </div>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                      <Link to={"/"}>
                          <h4 className="itemName">{item?.name}</h4>
                      </Link>
                      <div className="flex items-baseline mb-1 space-x-2">
                          <p className="text-sm text-primary font-semibold">{item.price} birr</p>
                          <p className="text-xs text-gray-400 line-through">55,900 birr</p>
                      </div>
                      <div className="flex items-center">
                          <div className="flex gap-1 text-xs text-yellow-400">
                              <FaStar/>
                              <FaStar/>
                              <FaStar/>
                              <FaStar/>
                              <FaStar/>
                          </div>
                          <div className="text-xs text-gray-500 ml-3">(150)</div>
                      </div>
                  </div>
                  {/* add to cart button */}
                  <Link to={"/"}>
                  <button
                      className="addToCartBtn">Add
                      to cart</button>
                  </Link>
              </div>
            )) : <p>No products found</p>}      
        </div>
    </div>
    </>
  );
}
