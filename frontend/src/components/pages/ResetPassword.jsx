import { MdErrorOutline } from "react-icons/md";
import { LockKeyhole } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../store/user/userSlice";

function ResetPassword() {
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const userSchema = z.object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(200),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedForm = userSchema.parse(form);
      setErrors({});
      // Dispatch the reset password action here
      await dispatch(resetPassword(validatedForm)).unwrap();
      toast.success("Password reset successfully");
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
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center flex-col gap-8 px-5 py-6 max-w-[700px] w-full shadow-lg rounded-md border-[1.5px] border-amber-500">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500">
          Reset Your Password
        </h1>
        <LockKeyhole className="size-12 text-amber-500" />
        <p className="text-gray-500 text-sm max-w-sm font-medium text-center">
          Enter your new password to reset your account password.
        </p>

        <form
          className="w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between gap-2 rounded-md bg-gray-100 w-full text-sm">
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
              className=" focus:outline-orange-400 py-3 px-4 w-full rounded-l-md"
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              value={form.newPassword}
            />
            <span
              className="text-gray-600 hover:text-gray-800 pr-3"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <Eye /> : <EyeOff />}
            </span>
          </div>
          {errors.newPassword && (
            <span className="inputError">
              <MdErrorOutline />
              {errors.newPassword}
            </span>
          )}
          {/* submit  */}
          <button type="submit" disabled={loading} className="smallButton mt-8">
            {loading ? (
              <div className="flex items-center gap-2">
                <ClipLoader color="#fff" loading size={20} />
                <span>Resetting..</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
