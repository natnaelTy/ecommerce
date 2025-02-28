import { useState } from "react";
import {Link} from "react-router-dom";


const LogIn = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-4 w-96 shadow-lg relative">
        <h1 className="text-lg md:text-2xl font-medium mb-5 mt-5">Log <span className="text-orange-400">in</span></h1>
        <form>
          <label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <br />
          <label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 text-sm py-3 focus:outline-orange-400 bg-gray-100 w-full"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="absolute right-12 bottom-20 text-orange-400 underline text-xs hover:text-orange-300"><Link to={'/forgotpassword'}>Forgot password</Link></button>
          <br />
          <br />
          <button type="submit" className="smallButton">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
