import { useState } from "react";
import {Link} from "react-router-dom";
import { z } from "zod";
import {FadeLoader} from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
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
  const {error, loading, email, isAuthenticated} = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: "",
    user_password: ""
  });
  const [errors, setErrors] = useState({});


  useState(() => {
    if (email) {
      setUser((prevData) => ({ ...prevData, email }));
    }
  }, [email]);


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
      setErrors({}); 

      dispatch(loginUser(validatedUser));  
      toast.success("You successfully Logged in!");
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
          <button className="absolute right-12 bottom-20 text-orange-400 underline text-xs hover:text-orange-300"><Link to={'/forgotpassword'}>Forgot password</Link></button>
          {error?.message && <span className="text-red-600 text-sm flex items-center gap-1 mt-3"><MdErrorOutline className="text-base"/>{error?.message}</span>}
          <br />
          <br />
          <button type="submit" className="smallButton">{loading ? <FadeLoader className="text-xs text-white"/> : 'Log in'}</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
