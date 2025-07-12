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



function App() {
  return (
    <>
    
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
