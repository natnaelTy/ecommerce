import Header from "../components/navBar/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

function ClientLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ClientLayout;
