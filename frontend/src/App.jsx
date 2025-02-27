import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout";
import SignUp from "./components/pages/SignUp";
import HomePage from "./components/homepage/homepage";

function App() {
  return (
  
      <Routes>
        {/* Route for ClientLayout (includes NavBar and Outlet) */}
        <Route path="/" element={<ClientLayout />}>
          {/* Default route for / */}
          <Route index element={<HomePage />} />
        </Route>

        {/* Standalone route for SignUp (no NavBar) */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>

  );
}

export default App;