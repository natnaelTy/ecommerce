
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "../../store/user/userSlice";
import { useEffect } from "react";
import { Settings, User, ClockArrowDown, Headset, LogOut  } from "lucide-react";

export default function GetProfile () {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  function handleLogout() {
    try {
      dispatch(logoutUser());
      toast.success("You successfully Logged out!");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="fixed top-19 right-2 md:right-3 lg:right-65 z-10 bg-white shadow-xl w-62 text-base rounded-lg">
      <div className="p-2 flex items-center gap-3 cursor-pointer">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user?.profilePicture}
            alt="pp"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-gray-900">
            {user?.fullName ? user?.fullName : "Guest"}
          </h1>
          <h2 className="text-gray-500 text-sm">{user?.email}</h2>
        </div>
      </div>

      <hr className="border-gray-200" />

      <ul className="flex text-gray-700 flex-col items-start justify-center">
        <li className="lihover">
          <Link className="liLink" to={"/profile"}>
            <User className="size-5"/> My Account
          </Link>
        </li>
        <li className="lihover">
          <Link className="liLink" to={"/profile"}>
            <Settings className="size-5"/> Settings
          </Link>
        </li>
        <li className="lihover">
          <Link className="liLink" to={"/orders"}>
            <ClockArrowDown className="size-5"/>
            Orders
          </Link>
        </li>
        <li className="lihover">
          {" "}
          <Link className="liLink" to={"/support"}>
            <Headset className="size-5"/> Support{" "}
          </Link>
        </li>
      </ul>
         <hr className="border-gray-200" />
      <div
        onClick={isAuthenticated ? handleLogout : handleLogin}
        className="p-2 flex items-center gap-2 hover:bg-amber-500 rounded-b-md hover:text-white cursor-pointer"
      >
        <LogOut  className="size-5" />
        <h1 className="text-sm">{isAuthenticated ? "Log out" : "Log in"}</h1>
      </div>
    </div>
  );
};

