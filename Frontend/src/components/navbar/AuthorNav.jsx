import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  BookOpen,
  ChevronDown,
  LogOut,
  PlusCircle,
  Library,
  LineChart,
  Bell,
} from "lucide-react";
import { AuthContext } from "../../pages/auth/AuthProvider";

const AuthorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstname = localStorage.getItem("firstname");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      message: "Your book was approved",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "New purchase of 'Book Title'",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      message: "Review received on 'Book Title'",
      time: "3 days ago",
      read: true,
    },
  ];

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
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-[100%] ${
        scrolled ? "bg-[#EBE5C2]/90 backdrop-blur-md shadow-lg" : "bg-[#EBE5C2]"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-[94%]">
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
              to="/author/add-book"
              className={`px-3 py-2 rounded-md text-[#504B38] font-medium transition-colors ${
                isActive("/add-book")
                  ? "bg-[#504B38]/20 text-[#3A3728]"
                  : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
              }`}
            >
              Add Book
            </Link>
            <Link
              to="/manage-books"
              className={`px-3 py-2 rounded-md text-[#504B38] font-medium transition-colors ${
                isActive("/manage-books")
                  ? "bg-[#504B38]/20 text-[#3A3728]"
                  : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
              }`}
            >
              Manage Books
            </Link>
            <Link
              to="/earnings"
              className={`px-3 py-2 rounded-md text-[#504B38] font-medium transition-colors ${
                isActive("/earnings")
                  ? "bg-[#504B38]/20 text-[#3A3728]"
                  : "hover:bg-[#504B38]/10 hover:text-[#3A3728]"
              }`}
            >
              Earnings
            </Link>
          </div>

          {/* Author Profile */}
          <div className="hidden md:flex items-center space-x-2">
            {/* User Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => {
                  setProfileMenuOpen(!profileMenuOpen);
                  setNotificationsOpen(false);
                }}
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
                  to="/author-profile"
                  className="block px-4 py-2 text-[#504B38] hover:bg-[#EBE5C2] transition-colors  items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Author Profile
                </Link>
                <Link
                  to="/author-dashboard"
                  className="block px-4 py-2 text-[#504B38] hover:bg-[#EBE5C2] transition-colors  items-center"
                >
                  <LineChart className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/author/add-book"
                  className="block px-4 py-2 text-[#504B38] hover:bg-[#EBE5C2] transition-colors  items-center"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Book
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
          <div className="md:hidden flex items-center space-x-1">
            <button className="p-2 text-[#504B38] hover:text-[#3A3728] hover:bg-[#504B38]/10 rounded-full relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.filter((n) => !n.read).length}
              </span>
            </button>

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
    </nav>
  );
};

export default AuthorNavbar;
