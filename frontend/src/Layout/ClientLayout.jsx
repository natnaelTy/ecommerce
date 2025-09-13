
import Header from "../components/navBar/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

function ClientLayout() {
  return (
    <>
     <div>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
    </>
  )
}

export default ClientLayout