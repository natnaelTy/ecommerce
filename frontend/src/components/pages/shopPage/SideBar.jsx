import { useState } from "react";
import { MdHome } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";


export default function SideBar({handleCheckboxChange, selectedCategory}) {

  const { productItems } = useSelector((state) => state.product);
  const category = (productItems.map(product => product.category));
  const [showModel, setShowModel] = useState(false);

  return (
    <> 
    <FiMenu className="flex md:hidden"/>
    <div className="flex flex-col items-start gap-5 mt-2 max-w-[250px] w-full p-3 border-1 border-gray-200 shadow-xs hidden md:flex">
        <div className="flex items-center gap-2 text-base">
            <MdHome className="text-amber-500"/>
            <RiArrowRightSLine className="text-gray-500"/>
          <h1 className="text-sm">Shop</h1>
        
        </div>
        
        <div className="flex flex-col items-center items-start gap-2 w-full">
            <h1 className="uppercase text-lg font-medium text-slate-950">category</h1>
            <div className="flex w-full items-center justify-between ">
            <label htmlFor="bed" className="flex gap-1 items-center" >
              <input type="checkbox" value={"bed"} checked={selectedCategory.includes("bed")} onChange={() => handleCheckboxChange('bed')}/>
              Bed
            </label>
            <p>({category.length})</p>
            </div>

            <div className="flex w-full items-center justify-between">
            <label htmlFor="table" className="flex gap-1 items-center">
              <input type="checkbox" value={"table"} checked={selectedCategory.includes("table")} onChange={() => handleCheckboxChange('table')}/>
              Table
            </label>
            <p>(15)</p>
            </div>

            <div className="flex w-full items-center justify-between">
            <label htmlFor="sofa" className="flex gap-1 items-center">
              <input type="checkbox" value={"sofa"} checked={selectedCategory.includes("sofa")} onChange={() => handleCheckboxChange('sofa')}/>
              <p>Sofa</p>
            </label>
            <p>(15)</p>
            </div>
        </div>

        <div className="flex items-start gap-3 flex-col">
             <h1 className="uppercase text-base font-medium text-slate-950">Price</h1>
             <div className="flex items-center gap-4">
                 <input type="number" placeholder="min" className="w-20 border-1 border-gray-200 rounded-sm px-3 tex-xs"/>
                 <p>-</p>
                 <input type="number" placeholder="max" className="w-20 border-1 border-gray-200 rounded-sm px-3 tex-xs"/>
             </div>
        </div>
    </div>
    </>
  )
}
