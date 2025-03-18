import { useState } from "react";
import {Link} from "react-router-dom";
import { z } from "zod";
import {ClipLoader} from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { loginUser } from "../../store/user/userSlice";



const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  user_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
 });


const LogIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error, loading} = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: "",
    user_password: ""
  });
  const [errors, setErrors] = useState({});

   const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

   const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try{
      const validatedUser = userSchema.parse(user);
      // Zod error message
      setErrors({}); 
      dispatch(loginUser(validatedUser));  
    }catch(error){
      if (error instanceof z.ZodError) {
        const errorMessages = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages);
      }
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
            value={user.email}
          />
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
            value={user.user_password}
          />

          {errors.user_password && <span className="text-xs text-orange-500 flex items-center gap-1 mt-1 mb-1"><IoWarningOutline/>{errors.user_password}</span>}

          {/* forgot password button */}
          <button className="absolute right-12 bottom-20 text-orange-400 underline text-xs hover:text-orange-300"><Link to={'/forgotpassword'}>Forgot password</Link></button>

          {/* error display */}
          {error && <span className="inputError"><MdErrorOutline/>{error}</span>}
          <br />
          <br />
          <button type="submit" className="smallButton">{loading ? (<ClipLoader color="#fff" loading size={20}/>) : ('Log in')}</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
