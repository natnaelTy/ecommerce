import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";


const HomePage = () => {
  
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleShop = () => {
    if(isAuthenticated){
      navigate("/shop")
    }
    else{
      navigate("/auth/signup");
    }
  }
  return (
    <div className="p-6 flex items-center flex-wrap justify-around bg-gray-100 relative mt-16">
      <div className="flex items-start flex-col justify-center gap-7 ">
        <div className="flex items-center justify-evenly relative w-[250px]">
          <span className="style1"></span>
          <h4 className="uppercase text-xl">new arrival</h4>
        </div>
        <h1 className="text-4xl md:text-6xl max-w-sm">Summer Collection</h1>
        <button onClick={handleShop} className="btn">Shop Now</button>
        <div className="flex text-5xl items-center cursor-pointer">
          <MdKeyboardArrowLeft className="hover:text-orange-500"/>
          <h3 className="text-orange-400 text-3xl">I</h3>
          <MdKeyboardArrowRight className="hover:text-orange-500"/>
        </div>
      </div>
      {/* image */}
      <div className="w-2xl h-full relative">
        <img
          src="./images/homepic2.png"
          alt="new sofa"
          className="w-full h-full object-cover"
        />
        {/* dicount circle */}
        <span className="style2"></span>

        {/* discount */}
        <h2 className="absolute top-48 right-5 text-2xl font-semibold text-orange-400 flex items-center flex-col justify-center">
          30%<span className="text-xl font-medium">OFF</span>
        </h2>
      </div>
      {/* curve */}
      <span className="style3"></span>
    </div>
    
  );
};

export default HomePage;
