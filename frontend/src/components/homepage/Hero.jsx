import { useNavigate } from "react-router-dom";
import { BounceLoader  } from "react-spinners";
import { useSelector } from "react-redux";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbHours24 } from "react-icons/tb";
import { Link } from "react-router-dom";
import Category from "./Category";
import NewArrival from "./NewArrival";
import Discount from "./Discount";
import RecommendedForYou from "./Recommended";

const Hero = () => {
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
    return <div className="flex items-center justify-center h-screen"><BounceLoader color="#ffab00" /></div>
  }
  
  return (
    <>
{/*banner*/}
<div className="bg-cover bg-no-repeat bg-center py-36 bg-[url(/images/banner-bg.jpg)] w-full max-h-[450px] flex items-center justify-around pl-6">

    <div className="max-w-5xl w-full mx-auto flex items-start flex-col gap-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-slate-950 font-medium capitalize">
            best collection for <br/> home decoration
        </h1>
        <p className="max-w-3xl">Nestled in the vibrant city of Hawassa, Ethiopia, Mesay Furniture isn't just crafting pieces—it's weaving stories into wood. As a beacon of local artistry, Mesay draws its design inspirations from the rich tapestry of Ethiopian culture.</p>
        <div>
            <Link to={"/shop"} className="bg-amber-500 border text-sm border-amber-500 text-white px-5 py-2 font-medium 
                rounded-md hover:bg-transparent hover:text-amber-500">Shop Now</Link>
        </div>
    </div>

    <div></div>
</div>

   <div className="container py-16">
        <div className="w-full flex flex-col items-center justify-center lg:flex-row gap-6">
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
    <RecommendedForYou/>
</>
  );
};

export default Hero;
