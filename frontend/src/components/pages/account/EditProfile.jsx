import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUserProfile } from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    birthday: "",
    profileImage: null
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        gender: user.gender || "",
        birthday: user.birthday || "",
        profileImage: user.image || null
      });
    } else {
      dispatch(fetchUser());
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(form)).unwrap();
    navigate("/account");
  };

  return (
    <div className="w-full mx-auto bg-white p-2">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200">
            <img
              src={user?.image ? user?.image : "/images/pfp.jpg"}
              alt={user?.fullName}
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
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="inputs"
          />
        </div>
        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="inputs"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
            className="inputs"
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
  );
}
