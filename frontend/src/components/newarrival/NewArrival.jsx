import { useEffect, useState } from "react";
import api, { nPoint } from "../../services/api";

export default function NewArrival() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        const data = await response.data.products;
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-8 items-center justify-around h-full w-full mt-10 p-4">
      {products.length > 0
        ? products.map((items) => (
            <div key={items.id} className="max-w-sm w-full h-[170px] bg-gray-100 p-1 flex items-center justify-between relative">
              <div className="flex flex-col gap-2 items-start justify-center p-2 w-full">
                  <p className="uppercase text-xs md:text-sm">new arrival</p>
                  <h1 className="text-lg md:text-2xl font-medium">{items.name}</h1>
                  <a href="" className="underline hover:text-orange-300 text-sm">Shop Now</a>
              </div>
              <div className="w-xs h-auto transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                <img src={nPoint + items.image} alt="new arrival" className="w-full object-contain h-full"/>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
