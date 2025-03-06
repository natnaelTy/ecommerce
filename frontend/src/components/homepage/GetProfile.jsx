import axios from "axios";
import { useEffect, useState } from "react";

 const GetProfile = () => {

      const [user, setUser] = useState(null);
       
      useEffect(() => {
        const fetchUser = async () => {
          try{
            const response = await axios.get("http://localhost:5000/auth/verify");
            const userData = await response.data.user;
            console.log(userData);
            setUser(userData);
            
          }catch(err){
            console.log(err);
          }
        }
        fetchUser();
      },[]);
      return(
        <div className="absolute top-15 right-30 z-20 bg-white shadow-xl w-48">
             <div className="border-1 border-gray-200">
                <h1 className="text-gray-900 p-1">My Account</h1>
             </div>
             <ul className="flex text-gray-700 flex-col items-start justify-center gap-2 border-1 border-gray-200 p-1">
                <li>Profile</li>
                <li>Orders</li>
                <li>Billing</li>
                <li>Setting</li>
             </ul>
             <div className="border-1 border-gray-200 p-1">
                <h1>Log out</h1>
             </div>
        </div>
      )
}

export default GetProfile;

