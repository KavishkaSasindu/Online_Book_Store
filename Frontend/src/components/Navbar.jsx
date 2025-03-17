import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const firstname = localStorage.getItem("firstname");
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logOut = () => {
    if (token) {
      localStorage.removeItem("firstname");
      localStorage.removeItem("token");
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-[100%]  ${
        scrolled ? "bg-[#EBE5C2]/80 backdrop-blur-md shadow-lg" : "bg-[#EBE5C2]"
      }`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 w-[95%] ">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#3A3728]">Logo</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/all-books"
              className="text-[#504B38] hover:text-[#3A3728] px-3 py-2 rounded-md font-medium relative group"
            >
              Books
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3A3728] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <span className="text-[#504B38]">Hello {firstname}!</span>
                <button
                  onClick={logOut}
                  className="bg-[#3A3728] hover:bg-[#504B38] text-[#EBE5C2] px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out shadow-md hover:shadow-lg"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/register-about"
                  className="text-[#504B38] hover:text-[#3A3728] font-medium relative group"
                >
                  Register
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3A3728] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/auth/login"
                  className="bg-[#3A3728] hover:bg-[#504B38] text-[#EBE5C2] px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out shadow-md hover:shadow-lg"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#504B38] hover:text-[#3A3728] hover:bg-[#EBE5C2] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3A3728]"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-[#EBE5C2] border-t border-[#504B38]/20`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/all-books"
            className="text-[#504B38] hover:text-[#3A3728] hover:bg-[#EBE5C2]/80 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Books
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-[#504B38]/20">
          {token ? (
            <div className="flex items-center px-5">
              <div className="ml-3 w-full">
                <div className="text-base font-medium text-[#504B38] mb-2">
                  Hello {firstname}!
                </div>
                <button
                  onClick={() => {
                    logOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-base font-medium text-center text-[#EBE5C2] bg-[#3A3728] rounded-md hover:bg-[#504B38] shadow-md"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 px-2 space-y-3">
              <Link
                to="/auth/register-about"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#504B38] hover:text-[#3A3728] hover:bg-[#EBE5C2]/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/auth/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-center text-[#EBE5C2] bg-[#3A3728] hover:bg-[#504B38] shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
