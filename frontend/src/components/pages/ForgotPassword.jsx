import { Link } from "react-router-dom"
import { z } from "zod";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LockKeyhole } from 'lucide-react';
import { ClipLoader } from "react-spinners";
import { forgotPassword } from "../../store/user/userSlice";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPassword() {
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState({});


  function handleSubmit(e) {
    e.preventDefault();
    try {
      const validatedForm = userSchema.parse(userEmail);
      setErrors({});
      dispatch(forgotPassword(validatedForm)).unwrap();
      toast.success("Verification code sent to your email");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    };
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center flex-col gap-8 px-5 py-6 max-w-[700px] w-full shadow-lg rounded-md border-[1.5px] border-amber-500">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500">
          Forgot your Password ?
        </h1>
        <LockKeyhole className="size-12 text-amber-500" />
        <p className="text-gray-900 text-sm max-w-sm font-medium text-center">Please Enter Your Email Addres To Recive a Verification Code.</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-8">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="px-4 text-sm py-3 focus:outline-orange-400 rounded-md bg-gray-100 w-full"
              onChange={(e) => setUserEmail({ email: e.target.value })}
              value={userEmail.email}
            />
            {errors.email && (
              <span className="inputError">
                <MdErrorOutline />
                {errors.email}
              </span>
            )}

          {/* submit */}
          <button type="submit" disabled={loading} className="smallButton">
            {loading ? (
              <div className="flex items-center gap-2">
                <ClipLoader color="#fff" loading size={20} />
                <span>Sending..</span>{" "}
              </div>
            ) : (
              "Send"
            )}
          </button>
        </form>
        <button className="underline uppercase font-medium text-sm text-gray-950 hover:text-gray-800"><Link to={"/login"}>Back to login</Link></button>
      </div>
    </div>
  );
}
