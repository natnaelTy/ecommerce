import axios from 'axios'
import { useEffect, useState } from 'react'

export default function NewArrival() {

    const [products, setProducts] = useState([]);
    
  useEffect(() => {
      const fetchProducts = async () => {
        try{
            const response = await axios.get("http://localhost:5000/products");
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
    <div className='flex flex-col items-center justify-center'>
       {products && products.length ? 
       products.map((items) => (
        <div key={items.id}>{items?.price}</div>
       )) : null}
      
    </div>
  )
}
