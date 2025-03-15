import { div } from "framer-motion/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const firstname = localStorage.getItem("firstname");
  const token = localStorage.getItem("token");

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
    <div>
      {token ? (
        <div className="w-[100%] h-[60px] flex justify-center items-center bg-[#504B38] text-[#F8F3D9] fixed z-50">
          <div className="w-[90%] h-[50px]  ">
            <div className="w-full h-full flex justify-between items-center">
              {/* logo goes here */}
              <div>
                <div>
                  <Link to={"/"}>Logo</Link>
                </div>
              </div>
              {/* content */}
              <div>
                <div>
                  <Link to={"/all-books"}>
                    <button>Books</button>
                  </Link>
                </div>
              </div>

              {/* profile and logout */}
              <div className="flex justify-between items-center space-x-4">
                <div className="font-thin">Hello {firstname}!</div>
                <div>
                  <button onClick={logOut}>Log out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[60px] flex justify-center items-center bg-[#504B38] text-[#F8F3D9] font-bold fixed z-50">
          <div className="w-[90%] h-[50px]  ">
            <div className="w-full h-full flex justify-between items-center">
              {/* logo goes here */}
              <div>
                <div>
                  {" "}
                  <div>
                    <Link to={"/"}>Logo</Link>
                  </div>
                </div>
              </div>
              {/* content */}
              <div>
                Content
                <div>
                  <Link to={"/all-books"}>
                    <button>Books</button>
                  </Link>
                </div>
              </div>
              {/* profile and logout */}
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center ">
                  <div className="flex justify-between items-center space-x-4">
                    <button>
                      <Link to={"/auth/register-about"}>Register</Link>
                    </button>
                    <button>
                      <Link to={"/auth/login"}>Sign in</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
