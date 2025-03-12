import axios from 'axios'
import { useEffect, useState } from 'react'
import api, { nPoint } from '../../services/api';

export default function NewArrival() {

    const [products, setProducts] = useState([]);
    
  useEffect(() => {
      const fetchProducts = async () => {
        try{
            const response = await api.get("/products");
            const data = await response.data.products;
            setProducts(data);
           
        }catch(err){
         console.log(err);
        }
      }
      fetchProducts();
  },[]); 
  console.log(products)
  return (
    <div className='flex flex-col items-center justify-center h-full'>
       {products.length > 0 ? 
       products.map((items) => (
        <div key={items.id} className='w-48 h-48'>
          <img src={nPoint + items.image} alt="" />
          <h1>{items.name}</h1>
        </div>
       )) : null}
      
    </div>
  )
}
