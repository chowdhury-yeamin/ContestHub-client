import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../contexts/AuthContext";

const MainLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-base-100">
      <div>
        <Navbar user={user} logout={logout} />
      </div>
      <div className="pt-navbar">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
