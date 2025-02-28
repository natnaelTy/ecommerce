import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/user/userSlice";
import { useState } from "react";
import { z } from "zod";

const SignUp = () => {

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
   
  const userSchema = z.object({
    fullName: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
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

  const handleSubmitForm = (e) => {
    e.preventDefault();

    try {
      // Validate the user object
      const validatedUser = userSchema.parse(user);
      console.log('User is valid:', validatedUser);
      setErrors({}); // Clear any previous errors

      // Dispatch the createUser action with the validated user object
      dispatch(createUser(validatedUser));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more user-friendly format
        const errorMessages = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages);
      }
    }
  };


  return (
    <div className="flex items-center justify-center w-full h-screen flex-col md:flex-row">
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
          {errors.email && <span className="text-red-600">{errors.email}</span>}
          <br />

          <label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            onChange={handleChange}
            value={user.password}
          />
             {errors.password && <span className="text-red-600">{errors.password}</span>}
          <br />
          <button type="submit" className="smallButton">
            Sign Up
          </button>
          <p>
            Already have an account? &nbsp;{" "}
            <span className="text-orange-400 underline cursor-pointer">
              <Link to={"/login"} />
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
