import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function ProtectedPage({ redirectTo = "/login" }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate(redirectTo, { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, token, navigate, location, redirectTo]);

  if (!isAuthenticated && !token) {
    return toast.error("You need to be logged in to access this page.");
  }

    return <Outlet />;
}