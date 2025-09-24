import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../store/adminside/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { set } from "zod";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.adminAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorsMessage, setErrorsMessage] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginAdmin(form)).unwrap();
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.message);
      setErrorsMessage(err?.message);
    }
  };

  console.log("Admin error:",  errorsMessage );


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
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="inputs"
            required
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
          className="w-full bg-black text-white py-2 rounded hover:bg-orange-500 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
