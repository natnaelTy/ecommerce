import "./index.css";
import { Route, Routes } from "react-router-dom";
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
import About from "./components/pages/about/About";
import AdminRoute from "./Layout/AdminRoute";
import AdminDashboard from "./components/pages/adminSide/AdminDashboard";
import AdminLogin from "./components/pages/adminSide/AdminLogin";
import PaymentSuccess from "./components/pages/account/Payment";
import Users from "./components/pages/adminSide/users/Users";
import ProductList from "./components/pages/adminSide/products/ProductList";
import EditProduct from "./components/pages/adminSide/products/EditProduct";
import AddNewProduct from "./components/pages/adminSide/products/AddNewProduct";
import AllOrders from "./components/pages/adminSide/orders/Orders";
import AdminAccount from "./components/pages/adminSide/AdminAccount";
import Payment from "./components/pages/adminSide/payment/Payment";


function App() {
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
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/addProduct"
          element={
            <AdminRoute>
              <AddNewProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AllOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/account"
          element={
            <AdminRoute>
              <AdminAccount />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <Payment />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
