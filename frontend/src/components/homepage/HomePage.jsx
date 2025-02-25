import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

const HomePage = () => {
  return (
    <div className="p-6 flex items-center flex-wrap justify-around bg-gray-100 ">
      <div className="flex items-start flex-col justify-center gap-7 ">
        <div className="flex items-center justify-evenly relative w-[250px]">
          <span className="style1"></span>
          <h4 className="uppercase text-lg">New Arrival</h4>
        </div>
        <h1 className="text-2xl md:text-6xl max-w-sm">Summer Collection</h1>
        <button className="btn">Shop Now</button>
        <div className="flex text-5xl items-center">
          <MdKeyboardArrowLeft />
          <h3 className="text-orange-400 text-3xl">I</h3>
          <MdKeyboardArrowRight />
        </div>
      </div>
      {/* image */}
      <div className="w-2xl h-full relative">
        <img
          src="./images/homepic2.png"
          alt="new sofa"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;
