import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../store/adminside/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { admin, loading, error } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your real admin login API call
    try {
     await dispatch(loginAdmin(form)).unwrap();
     toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      if (err && err.error) {
        toast.error(err.error);
      }
    }
  };

  console.log("Admin Login:", admin)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md shadow-md w-full max-w-md bg-red-500"
      >
        <h2 className="text-base font-medium mb-2 text-center">
          Welcome to Messay Furniture Admin System
        </h2>
        <p className="text-center text-sm text-gray-600">
          Please enter your admin credentials to access the dashboard.
        </p>
        {error && (
          <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="inputs"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="inputs"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-orange-500 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}