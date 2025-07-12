import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbHours24 } from "react-icons/tb";
import { Link } from "react-router-dom";
import Category from "./Category";
import NewArrival from "./NewArrival";
import { Disc } from "lucide-react";
import Discount from "./Discount";


const HomePage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleShop = () => {
    if (isAuthenticated) {
      navigate("/shop");
    } else {
      navigate("/auth/signup");
    }
  };

  if(loading){
    return <div className="flex items-center justify-center h-screen"><PropagateLoader color="#ffab00" /></div>
  }
  
  return (
    <>
{/*banner*/}
<div className="bg-cover bg-no-repeat bg-center py-36 bg-[url(/images/banner-bg.jpg)] w-full max-h-96 flex items-center justify-around pl-6">

    <div className="flex items-start flex-col gap-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-slate-950 font-medium capitalize">
            best collection for <br/> home decoration
        </h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br/>
            accusantium perspiciatis, sapiente
            magni eos dolorum ex quos dolores odio</p>
        <div>
            <Link to={"/shop"} className="bg-amber-500 border text-sm border-amber-500 text-white px-5 py-2 font-medium 
                rounded-md hover:bg-transparent hover:text-amber-500">Shop Now</Link>
        </div>
    </div>

    <div></div>
</div>

   <div class="container py-10">
        <div class="w-full flex flex-col items-center justify-center lg:flex-row gap-6">
            <div className="border border-pink-600 h-[70px] max-w-[270px] w-full rounded-sm px-3 py-4 flex justify-center items-center gap-5">
                <CiDeliveryTruck className="text-2xl lg:text-4xl text-pink-600"/>
                <div>
                    <h4 className="font-medium capitalize text-sm">Free Shipping</h4>
                    <p className="text-gray-500 text-xs">Order over 1,000 br</p>
                </div>
            </div>
            <div className="border border-pink-600 h-[70px] max-w-[270px] w-full rounded-sm px-3 py-4 flex justify-center items-center gap-5">
                <GiTakeMyMoney className="text-2xl lg:text-4xl text-pink-600"/>
                <div>
                    <h4 className="font-medium capitalize text-sm">Money Returns</h4>
                    <p className="text-gray-500 text-xs">30 days money returns</p>
                </div>
            </div>
            <div className="border border-pink-600 h-[70px] max-w-[270px] w-full rounded-sm px-3 py-4 flex justify-center items-center gap-5">
             <TbHours24 className="text-2xl lg:text-4xl text-pink-600"/>
                <div>
                    <h4 className="font-medium capitalize text-sm">24/7 Support</h4>
                    <p className="text-gray-500 text-xs">Customer support</p>
                </div>
            </div>
        </div>
    </div>
    <Category/>
    <NewArrival/>
    <Discount/>
</>
  );
};

export default HomePage;
