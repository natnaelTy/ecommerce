import "./index.css";
import NavBar from "./components/navBar/NavBar";
import HomePage from "./components/homepage/homepage";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/pages/SignUp";


function App() {
  return (
    <>
      <NavBar />
      <SignUp/>
      <Routes>
          <Route path="/" element={<HomePage />}/> 
          <Route path="/shop" element={<HomePage />}/> 
          <Route path="/pages" element={<HomePage />}/> 
          <Route path="/blog" element={<HomePage />}/> 
          <Route path="/about" element={<HomePage />}/> 
          <Route path="/contactus" element={<HomePage />}/> 
      </Routes>
   
    </>
  );
}

export default App;
