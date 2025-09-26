import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../../store/user/userSlice";
import {
  UserPen,
  Package2,
  CreditCard,
  Heart,
  PencilLine,
  BaggageClaim,
  Settings,
  User,
  House,
  ChevronRight,
  LogOut,
} from "lucide-react";
import WishList from "./WishList";
import EditProfile from "./EditProfile";

export default function Account() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <div className="max-w-[1000px] w-full mx-auto py-4 flex items-center gap-3 px-2 sm:px-0">
        <Link to="/" className="text-orange-400 hover:text-orange-300 text-sm">
          <House />
        </Link>
        <span className="text-sm text-gray-400">
          <ChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 pt-4 pb-16 max-w-[1000px] w-full mx-auto px-2 sm:px-0">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
          <div className="px-4 py-3 shadow flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex-shrink-0">
              <img
                src={
                  user?.profileImage ? user?.profileImage : "/images/pfp.jpg"
                }
                alt="profile"
                className="rounded-full w-15 h-15 border border-gray-200 p-1 object-cover"
              />
            </div>
            <div className="flex-grow text-center sm:text-left">
              <p className="text-gray-600">Hello,</p>
              <h4 className="text-gray-800 font-medium">{user?.fullName}</h4>
            </div>
          </div>

          <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
            <div className="space-y-1 pl-8">
              <button
                className={`relative block text-lg font-medium capitalize transition w-full text-left ${
                  activeTab === "edit-profile"
                    ? "text-pink-500"
                    : "text-gray-900"
                }`}
                onClick={() => setActiveTab("edit-profile")}
              >
                <span className="absolute -left-8 top-0 text-base">
                  <Settings />
                </span>
                Account Settings
              </button>
              <button
                className={`relative block capitalize transition w-full text-left ${
                  activeTab === "profile" ? "text-pink-500" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile Information
              </button>
              <button
                className={`relative block capitalize transition w-full text-left ${
                  activeTab === "address" ? "text-pink-500" : ""
                }`}
                onClick={() => setActiveTab("address")}
              >
                Manage Address
              </button>
              <button
                className={`relative block capitalize transition w-full text-left ${
                  activeTab === "password" ? "text-pink-500" : ""
                }`}
                onClick={() => setActiveTab("password")}
              >
                Change Password
              </button>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link
                to="#"
                className="relative hover:text-pink-500 block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <BaggageClaim />
                </span>
                My order history
              </Link>
              <Link
                to="#"
                className="relative hover:text-pink-500 block capitalize transition"
              >
                My returns
              </Link>
              <Link
                to="#"
                className="relative hover:text-pink-500 block capitalize transition"
              >
                My Cancellations
              </Link>
              <Link
                to="#"
                className="relative hover:text-pink-500 block capitalize transition"
              >
                My reviews
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link
                to="#"
                className="relative hover:text-pink-500 block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <CreditCard />
                </span>
                Payment methods
              </Link>
              <Link
                to="#"
                className="relative hover:text-pink-500 block capitalize transition"
              >
                Tele Birr
              </Link>
            </div>

            <div
              className="space-y-1 pl-8 pt-4"
              onClick={() => setActiveTab("wishlist")}
            >
              <Link
                to="#"
                className="relative hover:text-pink-500 block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <Heart />
                </span>
                My wishlist
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link
                to="#"
                className="relative hover:text-pink-500 block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <LogOut />
                </span>
                Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 rounded-md border-1 border-gray-200 shadow-xs px-2 sm:px-6 pt-5 pb-7">
          {activeTab === "profile" && (
            <>
              <h4 className="text-lg font-medium capitalize mb-4">
                Personal Info
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={
                        user?.profileImage
                          ? user?.profileImage
                          : "/images/pfp.jpg"
                      }
                      alt={user?.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <button
                      onClick={() => setActiveTab("edit-profile")}
                      className="text-sm px-3 py-1.5 border-1 border-gray-300 rounded-md hover:bg-black transition hover:text-white hover:border-black"
                    >
                      Change Profile Picture
                    </button>
                    <div className="text-gray-500 text-xs space-y-1">
                      <p>At least 800*800 px recommended</p>
                      <p>Supported formats: JPG, PNG</p>
                    </div>
                  </div>
                </div>

                <hr className="border-0.5 border-gray-200" />

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500">Full Name</p>
                    <p className="font-medium">{user?.fullName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Gender</p>
                      <p className="font-medium">
                        {user?.gender ? user.gender : "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium">{user?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("edit-profile")}
                className="py-1.5 px-3 text-white border-1 border-black bg-black text-sm rounded-md hover:bg-transparent transition hover:text-black mt-6"
              >
                <PencilLine className="inline-block mr-1 size-4" /> Edit
              </button>
            </>
          )}

          {activeTab === "edit-profile" && (
            <>
              <EditProfile />
            </>
          )}
          {activeTab === "address" && (
            <>
              <h4 className="text-lg font-medium capitalize mb-4">
                Manage Address
              </h4>
              {/* Address management form goes here */}
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="input-box"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="py-3 px-4 text-center text-white bg-pink-500 border border-pink-500 rounded-md hover:bg-transparent hover:text-pink-500 transition font-medium"
                >
                  Save Address
                </button>
              </div>
            </>
          )}

          {activeTab === "password" && (
            <>
              <h4 className="text-lg font-medium capitalize mb-4">
                Change Password
              </h4>
              {/* Change password form goes here */}
              <div>
                <label htmlFor="currentPassword">{user?.password}</label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  readOnly
                  className="border-1 border-gray-200 rounded-md px-4 py-2"
                  placeholder={user?.password}
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <br />
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="border-1 border-gray-200 rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <br />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="border-1 border-gray-200 rounded-md px-4 py-2"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="py-3 px-4 text-center text-white bg-pink-500 border border-pink-500 rounded-md hover:bg-transparent hover:text-pink-500 transition font-medium"
                >
                  Change Password
                </button>
              </div>
            </>
          )}
          {activeTab === "wishlist" && (
            <>
              <WishList />
              {/* Wish list items go here */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
