import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../../store/user/userSlice";
import { UserPen, Package2, CreditCard, Heart } from 'lucide-react';

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <div className="container py-4 flex items-center gap-3">
        <Link to="/" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </Link>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Profile</p>
      </div>

      <div className="grid grid-cols-12 items-start gap-6 pt-4 pb-16 max-w-[1000px] w-full mx-auto">
        {/* Sidebar */}
        <div className="col-span-3">
          <div className="px-4 py-3 shadow flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src="../assets/images/avatar.png"
                alt="profile"
                className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-gray-600">Hello,</p>
              <h4 className="text-gray-800 font-medium">{user?.fullName}</h4>
            </div>
          </div>

          <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
            <div className="space-y-1 pl-8">
              <button
                className={`relative block text-lg font-medium capitalize transition w-full text-left ${activeTab === "profile" ? "text-pink-500" : "text-gray-900"}`}
                onClick={() => setActiveTab("profile")}
              >
                <span className="absolute -left-8 top-0 text-base">
                  <UserPen />
                </span>
                Personal Profile
              </button>
              <button
                className={`relative block capitalize transition w-full text-left ${activeTab === "address" ? "text-pink-500" : ""}`}
                onClick={() => setActiveTab("address")}
              >
                Manage Address
              </button>
              <button
                className={`relative block capitalize transition w-full text-left ${activeTab === "password" ? "text-pink-500" : ""}`}
                onClick={() => setActiveTab("password")}
              >
                Change Password
              </button>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link to="#" className="relative hover:text-primary block font-medium capitalize transition">
                <span className="absolute -left-8 top-0 text-base">
                    <Package2/>
                </span>
                My order history
              </Link>
              <Link to="#" className="relative hover:text-primary block capitalize transition">
                My returns
              </Link>
              <Link to="#" className="relative hover:text-primary block capitalize transition">
                My Cancellations
              </Link>
              <Link to="#" className="relative hover:text-primary block capitalize transition">
                My reviews
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link to="#" className="relative hover:text-primary block font-medium capitalize transition">
                <span className="absolute -left-8 top-0 text-base">
                  <CreditCard/>
                </span>
                Payment methods
              </Link>
              <Link to="#" className="relative hover:text-primary block capitalize transition">
                Tele Birr
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link to="#" className="relative hover:text-primary block font-medium capitalize transition">
                <span className="absolute -left-8 top-0 text-base">
                  <Heart/>
                </span>
                My wishlist
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link to="#" className="relative hover:text-primary block font-medium capitalize transition">
                <span className="absolute -left-8 top-0 text-base">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </span>
                Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
          {activeTab === "profile" && (
            <>
              <h4 className="text-lg font-medium capitalize mb-4">
                Personal Profile
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first">{user?.fullName}</label>
                    <input type="text" name="first" id="first" className="input-box" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="birthday">{user?.phoneNumber}</label>
                    <input type="text" name="birthday" id="birthday" className="input-box" />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" className="input-box">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email">{user?.email}</label>
                    <input type="email" name="email" id="email" className="input-box" />
                  </div>
                  <div>
                    <label htmlFor="phone">{user?.phoneNumber}</label>
                    <input type="text" name="phone" id="phone" className="input-box" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="py-3 px-4 text-center text-white bg-pink-500 border border-pink-500 rounded-md hover:bg-transparent hover:text-pink-500 transition font-medium"
                >
                  Save changes
                </button>
              </div>
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
                <input type="text" name="address" id="address" className="input-box" />
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
                <input type="password" name="currentPassword" id="currentPassword" readOnly className="border-1 border-gray-200 rounded-md px-4 py-2" placeholder={user?.password} />
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <br />
                <input type="password" name="newPassword" id="newPassword" className="border-1 border-gray-200 rounded-md px-4 py-2" />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <br />
                <input type="password" name="confirmPassword" id="confirmPassword" className="border-1 border-gray-200 rounded-md px-4 py-2" />
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
        </div>
      </div>
    </>
  );
}