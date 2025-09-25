import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProfile, updateAdminProfile } from "../../../store/adminside/adminAuthSlice";
import { toast } from "react-hot-toast";
import { SquarePen } from "lucide-react";

export default function AdminAccount() {
  const dispatch = useDispatch();
  const { admin, loading, error } = useSelector((state) => state.adminAuth);
  const [isVisible, setIsVisible] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    profilePhoto: null || "",
    currentPassword: "",
    newPassword: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (admin) {
      setForm({
        fullName: admin.fullName || "",
        email: admin.email || "",
        currentPassword: admin.password || "",
        profilePhoto: admin.profilePhoto || null || "",
      });
    } else {
      dispatch(getAdminProfile());
    }
  }, [admin, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateAdminProfile(form)).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  console.log(error);

  return (
    <div className="bg-gray-50 min-h-screen p-2 md:p-6">
      <div className="max-w-[600px] lg:max-w-[1200px] w-full bg-white mx-auto p-4 md:p-6 rounded-md shadow">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-gray-200">
              <img
                src={admin?.image ? admin?.image : imagePreview ? imagePreview : "/images/adminlogo.png"}
                alt={admin?.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm px-3 py-2 border border-gray-300 rounded-md hover:bg-black transition hover:text-white hover:border-black cursor-pointer">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                Upload New Photo
              </label>
              <div className="text-gray-500 text-xs space-y-1">
                <p>At least 800×800 px recommended</p>
                <p>Supported formats: JPG, PNG</p>
              </div>
            </div>
          </div>

          <hr className="border-b border-gray-200" />
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName ?? ""}
              onChange={handleChange}
              className="inputs w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email ?? ""}
              onChange={handleChange}
              className="inputs w-full"
            />
          </div>
          <div>
            <label className="block mb-1">
              Current Password
              <div className="flex items-center justify-end rounded-md gap-3 w-full border border-gray-200 bg-gray-50 pr-3">
                <input
                  type="password"
                  name="currentPassword"
                  onChange={handleChange}
                  className="inputs flex-1"
                  placeholder="◾◾◾◾◾◾◾◾"
                  disabled={!isVisible}
                />
                <span
                  onClick={() => setIsVisible(!isVisible)}
                  className="ml-6 flex text-orange-400 hover:underline cursor-pointer hover:text-orange-500 font-medium text-sm"
                >
                  <SquarePen className="inline-block mr-1 size-5" />
                  Change Password
                </span>
              </div>
            </label>
          </div>

          <div className={`${isVisible ? "block" : "hidden"}`}>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword ?? ""}
              onChange={handleChange}
              className="inputs w-full"
            />
          </div>
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