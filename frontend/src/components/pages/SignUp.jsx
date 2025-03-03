import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { createUser, setEmail, createUserFailure } from "../../store/user/userSlice";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import {FadeLoader} from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

axios.defaults.withCredentials = true;

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error, loading} = useSelector((state) => state.user)

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    user_password: '',
  });

  const [errors, setErrors] = useState({});
 
  const userSchema = z.object({
    fullName: z.string().min(1, { message: "fullName is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    user_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const validatedUser = userSchema.parse(user);
      setErrors({}); 

      const response = await axios.post("http://localhost:5000/auth/signup", validatedUser);
      
      dispatch(createUser(validatedUser));
      dispatch(setEmail(user.email));
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages);
      }
      else{
        dispatch(createUserFailure(error.response?.data?.message || 'Something went wrong'));
      }
    }
  };


  return (
    <div className="flex items-center justify-center w-full h-screen flex-col md:flex-row">
      <Toaster>{errors.fullName}</Toaster>
      {/* close page button */}
      <button
        type="button"
        className="absolute top-5 right-6 text-2xl cursor-pointer"
      >
        <LiaTimesSolid />
      </button>
      <div className="hidden md:flex w-7xl h-screen relative bg-gray-100">
        <img
          src="/images/signuppage.png"
          alt="sign up"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* form */}
      <div className="flex flex-col items-center gap-6 justify-center p-6 w-full h-screen relative">
        <h1 className="text-2xl font-medium md:text-3xl">
          Create your account
        </h1>
        {/* google and facebook signup options*/}
        <div className="w-full flex items-center justify-center gap-5">
          <button className="text-sm md:text-base w-full border-1 cursor-pointer border-gray-100 px-4 py-2 flex items-center justify-center gap-4">
            <span>
              <FcGoogle className="text-xl" />
            </span>
            Continue with google
          </button>

          <button className="text-sm md:text-base w-full border-1 cursor-pointer border-gray-100 px-4 py-2 flex items-center justify-center gap-4">
            <span>
              <FaFacebook className="text-blue-600 text-xl" />
            </span>
            Continue with facebook
          </button>
        </div>
        {/* options */}
        <div className="relative">
          <span className="text-lg text-gray-400">or</span>
          <div className="signupStyle1"></div>
          <div className="signupStyle2"></div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmitForm} className="flex flex-col w-full">
          <label htmlFor="fullname">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="name"
             name="fullName"
            placeholder="Enter your full name"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            onChange={handleChange}
            value={user.fullName}
          />
          {errors.fullName && <span className="text-red-600">{errors.fullName}</span>}
          <br />

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
          {error && <span className="text-red-600">{error}</span>}
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
            {errors.user_password && <span className="text-red-600">{errors.user_password}</span>}
          <br />
          <button type="submit" className="smallButton">
            {loading ? <FadeLoader color="#ffffff" /> : 'Sign up'}
          </button>
          <p>
            Already have an account? &nbsp;{" "}
            <span className="text-orange-400 underline cursor-pointer">
              <Link to={"/api/auth/login"} >Log in</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
