import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUser } from "../../../store/user/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { changePassword } from "../../../store/user/userSlice";


export default function ChangePassword() {
  const { user, error, loading } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        toast.error("User not found");
        return;
      }
      const { newPassword } = form;
      if (newPassword !== confirmPassword) {
        return toast.error("New passwords do not match");
      }
      await dispatch(changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword })).unwrap();
      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error || "Failed to change password");
    }
  };

  return (
    <div>
      <h4 className="text-lg font-medium capitalize mb-4">Change Password</h4>
      {/* Change password form goes here */}
      <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={form.currentPassword}
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
            className="inputs"
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <br />
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="inputs"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="inputs"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-3 text-sm text-center text-white bg-pink-500 border border-pink-500 rounded-md hover:bg-transparent hover:text-pink-500 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
