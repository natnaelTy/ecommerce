import "./index.css";
import NavBar from "./components/navBar/NavBar";
import HomePage from "./components/homepage/homepage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
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
