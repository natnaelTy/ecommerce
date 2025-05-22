

export default function Discount() {
  return (
    <div className="flex items-center justify-center p-3 overflow-hidden">
        <div className="max-w-[970px] w-full relative border-1 border-gray-300 ">
        <div className="bg-white flex flex-col items-start gap-4 absolute left-0 top-0 bottom-0 h-auto rounded-br-full p-4">
         <p className="uppercase text-lg text-slate-900">online exclusive</p>
         <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-pink-500">15% <span>OFF</span></h1>
         <h3 className="uppercase text-sm md:text-lg text-slate-900 max-w-xs font-medium">accent chairs, benches & ottomans</h3>
         <button className="smallButton">shop now</button>
        </div>

        <div className="max-w-[1000px] w-full">
            <img src="./images/category-1.jpg" alt="ad" className="w-full h-62 object-cover" />
        </div>
        </div>
    </div>
  )
}
