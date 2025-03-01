import { useState } from "react";
import {Link} from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import {FadeLoader} from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { createLoginUser, createLoginFailure } from "../../store/user/userSlice.js";



const LogIn = () => {

  const dispatch = useDispatch();
  const {error, loading} = useSelector((state) => state.user);

  const [loginUser, setLoginUser] = useState({
    email: "",
    user_password: ""
  });

   const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    user_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
   });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

   const handleLoginSubmit = async (e) => {
    e.preventDefalut();

    const validatedUser = userSchema.parse(loginUser);

    try{
      const response = await axios.post("http://localhost:5000/api/auth/login", validatedUser)

      dispatch(createLoginUser(validatedUser));  
      console.log(validatedUser);    
      console.log(response.data);
    }catch(error){
      dispatch(createLoginFailure(error.response?.data?.message || 'Something went wrong'));
    }
   }


  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-4 w-96 shadow-lg relative">
        <h1 className="text-lg md:text-2xl font-medium mb-5 mt-5 text-center">Welcome back! <br />Log <span className="text-orange-400">in</span></h1>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            onChange={handleChange}
            value={loginUser.email}
          />
          {error && <span className="text-red-600">{error}</span>}
          <br />
          <br />
          <label htmlFor="user_password">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            name="user_password"
            placeholder="Enter your password"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            onChange={handleChange}
            value={loginUser.user_password}
          />
          {error && <span className="text-red-600">{error}</span>}
          <button className="absolute right-12 bottom-20 text-orange-400 underline text-xs hover:text-orange-300"><Link to={'/forgotpassword'}>Forgot password</Link></button>
          <br />
          <br />
          <button type="submit" className="smallButton">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
