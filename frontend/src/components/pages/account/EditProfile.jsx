import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUserProfile } from "../../../store/user/userSlice";
import { toast } from "react-hot-toast";

export default function EditProfile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    birthday: "",
    image: null || "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        gender: user.gender || "",
        birthday: user.birthday || "",
        image: user.image || null || "",
      });
    } else {
      dispatch(fetchUser());
    }
  }, [user, dispatch]);

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
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("gender", form.gender);
      formData.append("birthday", form.birthday);
      if (form.image) {
        formData.append("image", form.image);
      }
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  console.log(user)

  return (
    <div className="w-full mx-auto bg-white p-2">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <div className="w-32 h-32 rounded-full mr-auto overflow-hidden border border-gray-200">
            <img
              src={
                user?.profileImage
                  ? user?.profileImage
                  : imagePreview
                  ? imagePreview
                  : "/images/pfp.jpg"
              }
              alt={user?.fullName}
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

        <hr className="border-b-0.5 border-gray-200" />
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
