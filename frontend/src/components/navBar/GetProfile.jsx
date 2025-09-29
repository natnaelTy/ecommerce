import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  fetchUser,
  logoutUser,
  fetchNotifications,
} from "../../store/user/userSlice";
import { useEffect } from "react";
import {
  Settings,
  User,
  Headset,
  LogOut,
  Bell,
  Box
} from "lucide-react";

export default function GetProfile({ userId }) {
  const { isAuthenticated, user, notifications } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotifications(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);

  function handleLogout() {
    try {
      dispatch(logoutUser());
      toast.success("You successfully Logged out!");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  const readCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed top-19 right-2 md:right-3 lg:right-65 z-10 bg-white shadow-md border-1 border-gray-100 w-62 text-base rounded-lg">
      <div className="p-3 flex items-center gap-3 cursor-pointer">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user?.profileImage ? user?.profileImage : "/images/pfp.jpg"}
            alt="pp"
            className="w-full h-full object-cover"
          />
        </div>
        <Link className="liLink" to={"/account"}>
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-gray-900">
              {user?.fullName ? user?.fullName : "Guest"}
            </h1>
            <h2 className="text-gray-500 text-sm">{user?.email}</h2>
          </div>
        </Link>
      </div>

      <hr className="border-gray-200" />

      <ul className="flex text-gray-700 flex-col items-start justify-center">
        <li className="lihover">
          <Link className="liLink" to={"/account"}>
            <User className="size-5" /> My Account
          </Link>
        </li>
        <li className="lihover">
          <Link className="liLink" to={"/account"}>
            <Settings className="size-5" /> Settings
          </Link>
        </li>
        <li className="lihover relative">
          <Link className="liLink" to={"/notifications"}>
            <Bell className="size-5" />
            Notifications
          </Link>
          {readCount > 0 && (
            <span className="absolute top-2.5 left-5 bg-red-500 w-1.5 h-1.5 rounded-full"></span>
          )}
        </li>
        <li className="lihover">
          <Link className="liLink" to={"/orders"}>
            <Box className="size-5" />
            Orders
          </Link>
        </li>
        <li className="lihover">
          {" "}
          <Link className="liLink" to={"/help-center"}>
            <Headset className="size-5" /> Help center{" "}
          </Link>
        </li>
      </ul>
      <hr className="border-gray-200" />
      <div
        onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
        className="p-3 flex items-center gap-2 hover:bg-amber-500 rounded-b-md hover:text-white cursor-pointer"
      >
        <LogOut className="size-5" />
        <h1 className="text-sm">{isAuthenticated ? "Log out" : "Log in"}</h1>
      </div>
    </div>
  );
}
