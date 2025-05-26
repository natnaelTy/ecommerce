import { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SideBar({handleCheckboxChange, selectedCategory, minPrice, maxPrice, setMaxPrice, setMinPrice}) {

  const { productItems } = useSelector((state) => state.product);
  const [showModel, setShowModel] = useState(false);

  // each category and it's length
  const categoryLength = productItems.reduce((accumulator, product) => {
     const category = product.category;
     accumulator[category] = (accumulator[category] || 0) + 1;
     return accumulator;
  }, {});

  function handleShowBox () {
    setShowModel(!showModel);
  }


  return (
    <> 
    <FiMenu onClick={handleShowBox} className="flex md:hidden absolute top-16 text-amber-500 left-3"/>
    <div className={showModel ? "flex flex-col items-start gap-5 mt-2 max-w-[250px] w-full p-3 border-1 border-gray-200 rounded-md shadow-xs bg-white ml-2" : "hidden md:flex flex-col items-start gap-5 mt-2 max-w-[250px] w-full p-3 border-1 border-gray-200 rounded-md shadow-xs bg-white"}>
        <div className="flex items-center gap-2 text-base">
            <Link to={"/"}>
             <MdHome className="text-amber-500"/>
            </Link>
            <RiArrowRightSLine className="text-gray-500"/>
          <h1 className="text-sm">Shop</h1>
        
        </div>
        
        <div className="flex flex-col items-center items-start gap-2 w-full">
            <h1 className="uppercase text-sm md:text-lg font-medium text-slate-950">category</h1>
            <div className="flex w-full items-center justify-between text-xs md:text-sm">
            <label htmlFor="bed" className="flex gap-1 items-center" >
              <input type="checkbox" value={"bed"} checked={selectedCategory.includes("bed")} onChange={() => handleCheckboxChange('bed')}/>
              Bed
            </label>
            <p>({categoryLength["bed"]})</p>
            </div>

            <div className="flex w-full items-center justify-between text-xs md:text-sm">
            <label htmlFor="table" className="flex gap-1 items-center">
              <input type="checkbox" value={"table"} checked={selectedCategory.includes("table")} onChange={() => handleCheckboxChange('table')}/>
              Table
            </label>
            <p>({categoryLength["table"]})</p>
            </div>

            <div className="flex w-full items-center justify-between text-xs md:text-sm">
            <label htmlFor="sofa" className="flex gap-1 items-center">
              <input type="checkbox" value={"sofa"} checked={selectedCategory.includes("sofa")} onChange={() => handleCheckboxChange('sofa')}/>
              <p>Sofa</p>
            </label>
            <p>({categoryLength["sofa"]})</p>
            </div>
        </div>

        <div className="flex items-start gap-3 flex-col text-xs md:text-sm">
             <h1 className="uppercase text-sm md:text-lg font-medium text-slate-950">Price</h1>
             <div className="flex items-center gap-4">
                 <input type="number" placeholder="min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-20 border-1 border-gray-200 rounded-sm px-2"/>
                 <p>-</p>
                 <input type="number" placeholder="max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-20 border-1 border-gray-200 rounded-sm px-2"/>
             </div>
        </div>
    </div>
    </>
  )
}
