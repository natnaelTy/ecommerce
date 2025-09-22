import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProfile } from "../../../store/adminside/adminAuthSlice";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "../../../store/user/userSlice";


export default function AdminAccount() {
  const dispatch = useDispatch();
  const { admin, loading, error } = useSelector((state) => state.adminAuth);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    birthday: "",
    profileImage: null || "",
  });

  useEffect(() => {
    if (admin) {
      setForm({
        fullName: admin.fullName || "",
        email: admin.email || "",
        phoneNumber: admin.phoneNumber || "",
        gender: admin.gender || "",
        birthday: admin.birthday || "",
        profileImage: admin.image || null || "",
      });
    } else {
      dispatch(getAdminProfile());
    }
  }, [admin, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(form)).unwrap();
    toast.success("Profile updated successfully");
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1200px] w-full bg-white ml-auto p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200">
            <img
              src={admin?.image ? admin?.image : "/images/pfp.jpg"}
              alt={admin?.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm px-3 py-1.5 border-1 border-gray-300 rounded-md hover:bg-black transition hover:text-white hover:border-black">
              <input type="file" />
            </label>
            <div className="text-gray-500 text-xs space-y-1">
              <p>At least 800*800 px recommended</p>
              <p>Supported formats: JPG, PNG</p>
            </div>
          </div>
        </div>

        <hr className="border-b-0.5 border-gray-200"/>
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="inputs"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="inputs"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="inputs"
            placeholder="*********"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-slate-950 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
      </div>
    </div>
  );
}
