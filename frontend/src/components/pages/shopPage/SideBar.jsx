import { useEffect, useState } from "react";
import {House} from "lucide-react"
import { RiArrowRightSLine } from "react-icons/ri";
import {CircleEllipsis} from "lucide-react"
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
    <CircleEllipsis onClick={handleShowBox} className="flex md:hidden absolute z-10 top-20 text-amber-500 left-2"/>
    <div className={showModel ? "flex flex-col items-start gap-5 mt-10 max-w-[250px] w-full p-3 border-1 border-gray-200 rounded-md shadow-xs bg-white ml-2" : "hidden md:flex flex-col items-start gap-5 mt-2 max-w-[250px] w-full p-3 border-1 border-gray-200 rounded-md shadow-xs bg-white"}>
        <div className="flex items-center gap-2 text-base">
            <Link to={"/"} title="Go to home">
             <House className="text-amber-500 size-4.5"/>
            </Link>
            <RiArrowRightSLine className="text-gray-500"/>
          <h1 className="text-sm">Shop</h1>
        
        </div>
        
        <div className="flex flex-col items-center items-start gap-2 w-full">
            <h1 className="uppercase text-sm md:text-lg font-medium text-slate-950">category</h1>
            <div className="flex w-full items-center justify-between text-xs md:text-sm">
            <label htmlFor="bed" className="flex gap-1 items-center" >
              <input type="checkbox" value={"Bed"} checked={selectedCategory.includes("Bed")} onChange={() => handleCheckboxChange('Bed')}/>
              Bed
            </label>
            <p>({categoryLength["Bed"]})</p>
            </div>

            <div className="flex w-full items-center justify-between text-xs md:text-sm">
            <label htmlFor="table" className="flex gap-1 items-center">
              <input type="checkbox" value={"Table"} checked={selectedCategory.includes("Table")} onChange={() => handleCheckboxChange('Table')}/>
              Table
            </label>
            <p>({categoryLength["Table"]})</p>
            </div>

            <div className="flex w-full items-center justify-between text-xs md:text-sm">
            <label htmlFor="sofa" className="flex gap-1 items-center">
              <input type="checkbox" value={"Sofa"} checked={selectedCategory.includes("Sofa")} onChange={() => handleCheckboxChange('Sofa')}/>
              <p>Sofa</p>
            </label>
            <p>({categoryLength["Sofa"]})</p>
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
