import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, BookOpen } from "lucide-react";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/all-books"
              className="text-[#504B38] font-medium hover:text-[#3A3728] transition-colors px-3 py-2 rounded-md hover:bg-[#504B38]/10"
            >
              Books
            </Link>
            <Link
              to="/authors"
              className="text-[#504B38] font-medium hover:text-[#3A3728] transition-colors px-3 py-2 rounded-md hover:bg-[#504B38]/10"
            >
              Authors
            </Link>
            <Link
              to="/about"
              className="text-[#504B38] font-medium hover:text-[#3A3728] transition-colors px-3 py-2 rounded-md hover:bg-[#504B38]/10"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth/register-about"
              className="text-[#504B38] font-medium hover:text-[#3A3728] px-4 py-2 rounded-md hover:bg-[#504B38]/10 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/auth/login"
              className="bg-[#504B38] text-white font-medium px-4 py-2 rounded-md hover:bg-[#3A3728] transition-colors"
            >
              Sign in
            </Link>
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
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-[#EBE5C2] border-t border-[#504B38]/20">
          <Link
            to="/all-books"
            className="block text-[#504B38] font-medium hover:text-[#3A3728] py-2 hover:bg-[#504B38]/10 rounded-md px-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            Books
          </Link>
          <Link
            to="/categories"
            className="block text-[#504B38] font-medium hover:text-[#3A3728] py-2 hover:bg-[#504B38]/10 rounded-md px-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/authors"
            className="block text-[#504B38] font-medium hover:text-[#3A3728] py-2 hover:bg-[#504B38]/10 rounded-md px-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            Authors
          </Link>
          <Link
            to="/about"
            className="block text-[#504B38] font-medium hover:text-[#3A3728] py-2 hover:bg-[#504B38]/10 rounded-md px-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <div className="pt-2 border-t border-[#504B38]/20 flex flex-col space-y-2">
            <Link
              to="/auth/register-about"
              className="block text-center text-[#504B38] font-medium hover:text-[#3A3728] py-2 hover:bg-[#504B38]/10 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/auth/login"
              className="block text-center bg-[#504B38] text-white font-medium py-2 rounded-md hover:bg-[#3A3728]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
