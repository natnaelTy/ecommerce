import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout";
import SignUp from "./components/pages/SignUp";
import HomePage from "./components/homepage/HomePage";
import LogIn from "./components/pages/LogIn";
import Shop from "./components/pages/shopPage/Shop";
import ForgotPassword from "./components/pages/ForgotPassword";
import ProductDetail from "./components/pages/productdetail/ProductDetail";
import AuthRoute from "./Layout/AuthRoute";
import ResetPassword from "./components/pages/ResetPassword";
import VerifyEmail from "./components/pages/VerifyEmail";
import Profile from "./components/pages/account/Profile";
import WishList from "./components/pages/account/WishList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./store/user/userSlice";
import GetProfile from "./components/homepage/GetProfile";
import { PuffLoader } from "react-spinners";
import Cart from "./components/pages/account/Cart";


function App() {

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  // loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#ffab00" />
      </div>
    );
  }

  return (
    <>
    
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
