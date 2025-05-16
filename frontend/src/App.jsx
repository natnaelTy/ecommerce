import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout";
import SignUp from "./components/pages/SignUp";
import HomePage from "./components/homepage/HomePage";
import LogIn from "./components/pages/LogIn";
import Shop from "./components/shopPage/shop";


function App() {
  return (
    <>
    <Routes>
       <Route path="/auth/signup" element={<SignUp />} />
       <Route path="/auth/login" element={<LogIn />} />
       <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<Shop/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
