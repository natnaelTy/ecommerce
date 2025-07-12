
import Header from "../components/navBar/Header";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/homepage/Footer";
import { Outlet } from "react-router-dom";

function ClientLayout() {
  return (
    <>
     <div>
      <Header />
      <NavBar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
    </>
  )
}

export default ClientLayout