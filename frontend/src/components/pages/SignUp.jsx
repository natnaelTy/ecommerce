import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";


const SignUp = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col md:flex-row">
        {/* close page button */}
        <button type="button" className="absolute top-5 right-6 text-2xl cursor-pointer">
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
        <form className="flex flex-col w-full">
          <label htmlFor="fullname">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="name"
            placeholder="Enter your full name"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            required
          />
          <br />

          <label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            required
          />
          <br />

          <label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            required
          />
          <br />
          <button type="submit" className="px-4 py-2 bg-orange-400 text-white mb-2 mt-3 hover:bg-orange-300 cursor-pointer">
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
