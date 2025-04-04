import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  BookOpen,
  ChevronDown,
  LogOut,
  BookMarked,
} from "lucide-react";
import { AuthContext } from "../../pages/auth/AuthProvider";
import axios from "axios";

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstname = localStorage.getItem("firstname");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const { user } = useContext(AuthContext);

  const userId = user?.userId;
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300   w-[100%] ${
        scrolled ? "bg-[#EBE5C2]/90 backdrop-blur-md shadow-lg" : "bg-[#EBE5C2]"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-[94%] ">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-[#504B38]" />
              <span className="text-2xl font-bold text-[#3A3728]">
                BookStore
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/all-books"
              className={`px-3 py-2 rounded-md text-[#504B38] font-medium transition-colors ${
                isActive("/all-books")
                  ? "bg-[#504B38]/20 text-[#3A3728]"
                  : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
              }`}
            >
              Books
            </Link>
            <Link
              to="/authors"
              className={`px-3 py-2 rounded-md text-[#504B38] font-medium transition-colors ${
                isActive("/my-books")
                  ? "bg-[#504B38]/20 text-[#3A3728]"
                  : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
              }`}
            >
              Authors
            </Link>
            <Link
              to={`/user/user-wishlist/${userId}`}
              className={`px-3 py-2 rounded-md text-[#504B38] font-medium transition-colors ${
                isActive("/wishlist")
                  ? "bg-[#504B38]/20 text-[#3A3728]"
                  : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
              }`}
            >
              Wishlist
            </Link>
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center">
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 text-[#504B38] font-medium px-3 py-2 rounded-md hover:bg-[#504B38]/10 transition-colors"
              >
                <span>Hello, {firstname}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-200 ${
                  profileMenuOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <Link
                  to={`/user/user-profile/${userId}`}
                  className="block px-4 py-2 text-[#504B38] hover:bg-[#EBE5C2] transition-colors  items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Link>

                <button
                  onClick={logOut}
                  className="block w-full text-left px-4 py-2 text-[#504B38] hover:bg-[#EBE5C2] transition-colors  items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#504B38] hover:text-[#3A3728] p-2"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-[#EBE5C2] border-t border-[#504B38]/20">
          <div className="py-3 px-3 border-b border-[#504B38]/20 mb-2">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#504B38] flex items-center justify-center text-white">
                  {firstname ? firstname.charAt(0).toUpperCase() : "U"}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-[#3A3728]">
                  Hello, {firstname}
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/all-books"
            className={`block text-[#504B38] font-medium py-2 rounded-md px-3 ${
              isActive("/all-books")
                ? "bg-[#504B38]/20 text-[#3A3728]"
                : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Books
          </Link>
          <Link
            to="/my-books"
            className={`block text-[#504B38] font-medium py-2 rounded-md px-3 ${
              isActive("/my-books")
                ? "bg-[#504B38]/20 text-[#3A3728]"
                : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            My Books
          </Link>
          <Link
            to="/authors"
            className={`block text-[#504B38] font-medium py-2 rounded-md px-3 ${
              isActive("/borrowed-books")
                ? "bg-[#504B38]/20 text-[#3A3728]"
                : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Authors
          </Link>
          <Link
            to="/wishlist"
            className={`block text-[#504B38] font-medium py-2 rounded-md px-3 ${
              isActive("/wishlist")
                ? "bg-[#504B38]/20 text-[#3A3728]"
                : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Wishlist
          </Link>
          <Link
            to="/about"
            className={`block text-[#504B38] font-medium py-2 rounded-md px-3 ${
              isActive("/wishlist")
                ? "bg-[#504B38]/20 text-[#3A3728]"
                : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/profile"
            className={`block text-[#504B38] font-medium py-2 rounded-md px-3 ${
              isActive("/profile")
                ? "bg-[#504B38]/20 text-[#3A3728]"
                : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            My Profile
          </Link>

          <div className="pt-2 border-t border-[#504B38]/20">
            <button
              onClick={() => {
                logOut();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center text-[#504B38] font-medium py-2 px-3 hover:bg-[#504B38]/10 hover:text-[#3A3728] rounded-md"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
