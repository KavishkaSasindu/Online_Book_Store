import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../pages/auth/AuthProvider";

import UserNavbar from "./UserNavbar";
import PublicNavbar from "./PublicNavbar";

import AuthorNavbar from "./AuthorNav";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
  const navigate = useNavigate();
  const firstname = localStorage.getItem("firstname");
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const role = user?.role;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <nav>
      {/* public navbar */}
      {!token && <PublicNavbar />}

      {/* user navbar */}
      {token && role === "USER" && <UserNavbar />}

      {/* author navbar */}
      {token && role === "AUTHOR" && <AuthorNavbar />}

      {/* admin navbar */}
      {token && role === "ADMIN" && <AdminNavbar />}
    </nav>
  );
};

export default Navbar;
