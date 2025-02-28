import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout";
import SignUp from "./components/pages/SignUp";
import HomePage from "./components/homepage/homepage";
import LogIn from "./components/pages/LogIn";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element></Route>
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}

export default App;
