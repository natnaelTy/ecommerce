import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientLayout from "./Layout/ClientLayout";
import SignUp from "./components/pages/SignUp";
import Hero from "./components/homepage/Hero";
import LogIn from "./components/pages/LogIn";
import Shop from "./components/pages/shopPage/Shop";
import ForgotPassword from "./components/pages/ForgotPassword";
import ProductDetail from "./components/pages/productdetail/ProductDetail";
import AuthRoute from "./Layout/AuthRoute";
import ResetPassword from "./components/pages/ResetPassword";
import VerifyEmail from "./components/pages/VerifyEmail";
import Account from "./components/pages/account/Account";
import WishList from "./components/pages/account/WishList";
import Cart from "./components/pages/account/Cart";
import CheckOut from "./components/pages/account/CheckOut";
import Orders from "./components/pages/account/Orders";
import Notifications from "./components/pages/account/Notifications";
import About from "./components/pages/shopPage/about/About";


function App() {

  const { loading } = useSelector((state) => state.product);

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
          <Route index element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/notifications" element={<Notifications />} />
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
