// import { RiSofaLine } from "react-icons/ri";
// import { FiMenu } from "react-icons/fi";
// import { IoBedOutline } from "react-icons/io5";
// import { PiOfficeChairLight } from "react-icons/pi";
// import { useState } from "react";
// import "./style.css";
// import { MdTableBar } from "react-icons/md";
// import { FaMattressPillow } from "react-icons/fa6";
// import { NavLink } from "react-router-dom";


// const NavBar = () => {
//   const [searchInputIsOn, setSearchInputIsOn] = useState(false);
//   const [value, setValue] = useState("");
//   const [showMenu, setShowMenu] = useState(true);

//   function toggleSearchButton() {
//     setSearchInputIsOn(!searchInputIsOn);
//   }

//   function handleShowMenu() {
//     setShowMenu(!showMenu);
//   }

//   return (
//     <>
//       {/* navbar */}
//       <nav className="bg-slate-950 flex items-center justify-around w-full h-11">
//         <div className="flex items-center justify-around">
//           <div className="container flex items-center gap-7 relative group hidden md:flex ">
//             <span className="text-white flex items-center px-5 py-3 bg-amber-500 md:flex items-center cursor-pointer hidden">
//               <FiMenu />
//               <span className="capitalize ml-2 text-white text-sm">
//                 All Categories
//               </span>
//             </span>

//             {/* dropdown */}
//             <div className="absolute z-20 w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
//               <NavLink
//                 to={"/"}
//                 className="flex  items-center px-6 py-3 hover:bg-gray-100 text-pink-600 transition"
//               >
//                 <RiSofaLine />
//                 <span className="ml-2 text-gray-600 text-sm">Sofa</span>
//               </NavLink>
//               <NavLink
//                 to={"/"}
//                 className="flex items-center px-6 py-3 hover:bg-gray-100 text-pink-600 transition"
//               >
//                 <IoBedOutline />
//                 <span className="ml-2 text-gray-600 text-sm">Terarce</span>
//               </NavLink>
//               <NavLink
//                 to={"/"}
//                 className="flex items-center px-6 py-3 hover:bg-gray-100 text-pink-600 transition"
//               >
//                 <IoBedOutline />
//                 <span className="ml-2 text-gray-600 text-sm">Bed</span>
//               </NavLink>
//               <NavLink
//                 to={"/"}
//                 className="flex items-center px-6 py-3 hover:bg-gray-100 text-pink-600 transition"
//               >
//                 <PiOfficeChairLight />
//                 <span className="ml-2 text-gray-600 text-sm">Office</span>
//               </NavLink>
//               <NavLink
//                 to={"/"}
//                 className="flex items-center px-6 py-3 hover:bg-gray-100 text-pink-600 transition"
//               >
//                 <MdTableBar />
//                 <span className="ml-2 text-gray-600 text-sm">Table</span>
//               </NavLink>
//               <NavLink
//                 to={"/"}
//                 className="flex items-center px-6 py-3 hover:bg-gray-100 text-pink-600 transition"
//               >
//                 <FaMattressPillow />
//                 <span className="ml-2 text-gray-600 text-sm">Mattress</span>
//               </NavLink>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-6 capitalize text-xs md:text-sm">
//           <NavLink
//             to={"/"}
//             className="text-gray-200 hover:text-white transition"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to={"/"}
//             className="text-gray-200 hover:text-white transition"
//           >
//             Shop
//           </NavLink>
//           <NavLink
//             to={"/"}
//             className="text-gray-200 hover:text-white transition"
//           >
//             About us
//           </NavLink>
//           <NavLink
//             to={"/"}
//             className="text-gray-200 hover:text-white transition"
//           >
//             Contact us
//           </NavLink>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavBar;
