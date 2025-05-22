import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout";
import SignUp from "./components/pages/SignUp";
import HomePage from "./components/homepage/HomePage";
import LogIn from "./components/pages/LogIn";
import Shop from "./components/pages/shopPage/Shop";
import Header from "./components/navBar/Header";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/homepage/Footer";

function App() {
  return (
    <>
    <Header/>
    <NavBar/>
    <Routes>
       <Route path="/auth/signup" element={<SignUp />} />
       <Route path="/auth/login" element={<LogIn />} />
       <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
      </Route>
       <Route path="/shop" element={<Shop/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
