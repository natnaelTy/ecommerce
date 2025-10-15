import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdErrorOutline } from "react-icons/md";
import { loginUser } from "../../store/user/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { LiaTimesSolid } from "react-icons/lia";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
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

    try {
      const validatedUser = userSchema.parse(user);
      // Zod error message
      setErrors({});
      await dispatch(loginUser(validatedUser)).unwrap();
      toast.success("You successfully logged to your account");
      navigate("/");
    } catch (err) {
      // Zod error message
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
    window.location.href =
      "https://ecommerce-ib95q.sevalla.app/api/auth/google";
  }

  function handleClose() {
    navigate("/");
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
      {/* close page button */}
      <button
        type="button"
        className="absolute top-5 right-6 text-2xl cursor-pointer z-30 bg-transparent hover:bg-red-500 p-1 hover:text-white"
        onClick={handleClose}
      >
        <LiaTimesSolid />
      </button>
      {/* main container */}
      <div className="flex items-center justify-between max-w-[900px] h-[550px] w-full shadow-xl rounded-md">
        <div className="bg-gradient-to-br from-yellow-300 to-amber-500 w-full h-full rounded-l-md flex items-center justify-center h-full flex-col text-center px-4 gap-2 hidden lg:flex">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
            Hey Welcome back!
          </h1>
          <p className="text-gray-50 text-base">
            Enter your personal details and continue your journey with us
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 px-4 w-full h-full">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-500 text-center mb-3 mt-3">
            Login
            <p className="text-gray-400 text-xs font-light">to your account</p>
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
              or use your email to login
            </span>
            <div className="signupStyle1"></div>
            <div className="signupStyle2"></div>
          </div>
          {/* form */}
          <form
            onSubmit={handleLoginSubmit}
            className="flex items-center justify-center flex-col gap-6 w-full"
          >
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

            <label htmlFor="password" className="text-sm font-medium w-full">
              Password <span className="text-red-600">*</span>
              <div className="flex items-center justify-between rounded-md gap-2 bg-gray-100 w-full">
                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  className="focus:outline-orange-400 px-4 text-sm py-3 w-full rounded-l-md"
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
            {/* forgot password button */}
            <button className="ml-auto text-amber-500 underline text-xs hover:text-amber-300">
              <Link to={"/forgotpassword"}>Forgot your password?</Link>
            </button>

            {/* submit */}
            <button type="submit" disabled={loading} className="smallButton">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <ClipLoader color="#fff" loading size={20} />
                  <span>Loging..</span>{" "}
                </div>
              ) : (
                "Login"
              )}
            </button>

            <button className="text-gray-700 text-xs">
              Doesn't have an account?{" "}
              <Link
                className="text-amber-500 hover:text-amber-400 hover:underline"
                to={"/signup"}
              >
                {" "}
                Signup{" "}
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
