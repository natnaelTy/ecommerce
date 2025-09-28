import { Link } from "react-router-dom"

export default function Discount() {
  return (
    <div className="flex items-center justify-center p-2 overflow-hidden mt-15 mb-15">
      <div className="relative w-full max-w-[1000px] rounded-lg shadow overflow-hidden border border-gray-200">
        {/* Background Image with Gradient Overlay */}
        <div className="relative w-full h-64 md:h-80">
          <img
            src="./images/category-1.jpg"
            alt="ad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-600/60 to-transparent" />
        </div>
        {/* Discount Content */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-center gap-4 p-8 md:p-12 max-w-[420px]">
          <p className="uppercase text-sm md:text-base tracking-widest text-white font-semibold drop-shadow">
            online exclusive
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            15% <span className="text-amber-500">OFF</span>
          </h1>
          <h3 className="uppercase text-base md:text-lg text-white font-medium drop-shadow max-w-xs">
            accent chairs, benches & ottomans
          </h3>
          <Link
            to="/shop"
            className="bg-amber-500 hover:bg-amber-400 transition px-5 py-3 text-white font-medium rounded-lg shadow-md"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}