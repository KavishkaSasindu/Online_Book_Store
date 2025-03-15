import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const logOut = () => {
    if (email && token) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div>
      {email && token ? (
        <div className={"w-[100%] flex justify-center items-center"}>
          <div className={"w-[90%] border"}>
            <div className={" flex space-x-4"}>
              <button
                onClick={logOut}
                className={
                  "px-2 py-1 text-white bg-blue-900  flex justify-center items-center"
                }
              >
                Log out
              </button>
              <button
                className={
                  "px-2 py-1 text-white bg-blue-900  flex justify-center items-center"
                }
              >
                <Link to={""}>Books</Link>
              </button>
              <button
                className={
                  "px-2 py-1 text-white bg-blue-900  flex justify-center items-center"
                }
              >
                <Link to={"/auth/login"}>Register as an author</Link>
              </button>
              <button
                className={
                  "px-2 py-1 text-white bg-blue-900  flex justify-center items-center"
                }
              >
                <Link to={"/"}>Home</Link>
              </button>
              <h1>Hello {email}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className={"w-[100%] flex justify-center items-center"}>
          <div className={"w-[90%] border"}>
            <div className={" flex space-x-4"}>
              <button
                className={
                  "px-2 py-1 text-white bg-blue-900  flex justify-center items-center"
                }
              >
                <Link to={"/auth/login"}>Login here</Link>
              </button>
              <button
                className={
                  "px-2 py-1 text-white bg-blue-900  flex justify-center items-center"
                }
              >
                <Link to={"/auth/register/user"}>Register as a user</Link>
              </button>
              <button
                className={
                  "px-2 py-1 text-white bg-blue-900  flex justify-center items-center"
                }
              >
                <Link to={"/auth/login"}>Register as an author</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
