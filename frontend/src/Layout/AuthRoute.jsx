
import { Outlet } from "react-router-dom";


function AuthRoute() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Outlet />
      </div>
    </>
  );
}

export default AuthRoute;
