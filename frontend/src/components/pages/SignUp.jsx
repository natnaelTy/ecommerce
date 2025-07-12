import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { z } from "zod";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { createUser } from "../../store/user/userSlice";
import { Eye, EyeOff } from "lucide-react";

axios.defaults.withCredentials = true;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const userSchema = z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone Number is required" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone Number must contain only digits",
      })
      .transform(Number)
      .refine((val) => !isNaN(val), { message: "Invalid phone number format" })
      .refine((val) => val.toString().length < 10, {
        message: "Phone number must be at least 10 digits",
      }),
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
      await dispatch(createUser(validatedUser)).unwrap();
      toast.success("You successfully created an account");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = {};
        err.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages);
      } else {
        toast.error(error);
      }
    }
  };

  function handleGoogleAuth() {
    window.location.href = "http://localhost:5000/auth/google";
  }

  function handleCloseSignup() {
    navigate("/");
  }
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col md:flex-row bg-gray-50">
      {/* close page button */}
      <button
        type="button"
        className="absolute top-5 right-6 text-2xl cursor-pointer z-30 bg-transparent hover:bg-red-500 p-1 hover:text-white"
        onClick={handleCloseSignup}
      >
        <LiaTimesSolid />
      </button>

      <div className="max-w-[1100px] h-[600px] shadow-xl rounded-lg w-full flex items-center bg-white overflow-hidden">
        <div className="hidden md:flex max-w-6xl w-full">
          <img
            src="/images/signuppagechair.jfif"
            alt="sign up"
            className="w-full h-full object-cover rounded-l-lg"
            loading="lazy"
          />
        </div>

        {/* form */}
        <div className="flex flex-col items-center gap-4 justify-center p-4 w-full h-screen p-2">
          <h1 className="font-bold text-amber-500 text-2xl lg:text-3xl">
            Create an Account
          </h1>
          {/* google signup */}
          <button
            onClick={handleGoogleAuth}
            className="text-sm text-gray-800 w-full border-1 cursor-pointer border-gray-200 px-4 py-2 flex items-center justify-center gap-4 rounded-lg shadow-xs"
          >
            <span>
              <FcGoogle className="text-xl" />
            </span>
            Continue with google
          </button>
          {/* options */}
          <div className="relative">
            <span className="text-sm text-gray-500">
              or use your email & phone number for registration
            </span>
            <div className="signupStyle1"></div>
            <div className="signupStyle2"></div>
          </div>
          {/* form */}
          <form
            onSubmit={handleSubmitForm}
            className="flex flex-col items-center justify-center gap-6 w-full"
          >
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="fullname" className="text-sm font-medium w-full">
                Full name <span className="text-red-600">*</span>
                <input
                  type="name"
                  name="fullName"
                  placeholder="Enter Full name"
                  className="px-4 text-sm py-3 focus:outline-orange-400 rounded-md bg-gray-100 w-full"
                  onChange={handleChange}
                  value={user.fullName}
                />
                {errors.fullName && (
                  <span className="inputError">
                    <MdErrorOutline />
                    {errors.fullName}
                  </span>
                )}
              </label>

              <label htmlFor="email" className="text-sm font-medium w-full">
                Email <span className="text-red-600">*</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="px-4 text-sm py-3 focus:outline-orange-400 rounded-md bg-gray-100 w-full"
                  onChange={handleChange}
                  value={user.email}
                />
                {errors.email && (
                  <span className="inputError">
                    <MdErrorOutline />
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <label htmlFor="phoneNumber" className="text-sm font-medium w-full">
              Phone <span className="text-red-600">*</span>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter Phone number"
                className="px-4 text-sm py-3 focus:outline-orange-400 rounded-md bg-gray-100 w-full"
                onChange={handleChange}
                value={user.phoneNumber}
              />
              {errors.phoneNumber && (
                <span className="inputError">
                  <MdErrorOutline />
                  {errors.phoneNumber}
                </span>
              )}
            </label>

            <label htmlFor="password" className="text-sm font-medium w-full">
              Password <span className="text-red-600">*</span>
              <div className="flex items-center justify-between gap-2 rounded-md bg-gray-100 w-full text-sm">
                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  className=" focus:outline-orange-400 py-3 px-4 w-full rounded-l-md"
                  onChange={handleChange}
                  value={user.password}
                />
                <span
                  className="text-gray-600 hover:text-gray-800 pr-3"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <Eye /> : <EyeOff />}
                </span>
              </div>
              {errors.password && (
                <span className="inputError">
                  <MdErrorOutline />
                  {errors.password}
                </span>
              )}
            </label>

            <button type="submit" className="smallButton" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <ClipLoader color="#fff" loading size={20} />
                  <span>Signing up..</span>
                </div>
              ) : (
                "Sign up"
              )}
            </button>
            <p className="text-xs text-gray-700 mt-1">
              Already have an account? &nbsp;{" "}
              <span className="text-orange-400 underline text-sm cursor-pointer">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
