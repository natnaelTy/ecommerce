import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Profile from "./components/pages/account/Profile";
import WishList from "./components/pages/account/WishList";
import Cart from "./components/pages/account/Cart";
import CheckOut from "./components/pages/account/CheckOut";

function App() {

  return (
    <>
    
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<Hero />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
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
