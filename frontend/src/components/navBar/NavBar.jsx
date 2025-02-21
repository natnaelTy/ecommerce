import { IoPersonCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { SlHandbag } from "react-icons/sl";

const NavBar = () => {
    return ( 
        <nav className="flex items-center justify-between px-5 py-3">
            <h1 className="text-3xl">Furns</h1>

            <ul className="flex items-center justify-around gap-6 text-2xl md:text-3xl">
                <li><div className="flex items-center ">
                    <input type="text" placeholder="Search.." className="text-sm px-3 py-2 outline-none border-1 border-gray-200 rounded-l-lg w-full"/>
                       <CiSearch className="bg-orange-500 text-white w-[35px] h-[35px] p-2 rounded-r-lg cursor-pointer"/>
                    </div>
                </li>
                <li><IoPersonCircleOutline/></li>
                <li><SlHandbag/></li>
            </ul>
        </nav>
     );
}
 
export default NavBar;