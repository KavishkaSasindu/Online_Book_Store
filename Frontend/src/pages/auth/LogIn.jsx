import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Success from "../../components/responces/Success";

const LogIn = () => {
  const navigate = useNavigate();

  const [logInRequest, setLogInRequest] = useState({
    email: "",
    password: "",
  });

  const changeData = (e) => {
    setLogInRequest({
      ...logInRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        logInRequest
      );
      const data = await response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.logInEmail);
        localStorage.setItem("firstname", data.firstname);
        navigate("/");
      } else {
        navigate("/auth/login");
        alert("Login Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={"w-[100%]"}>
      <div className={"flex justify-center items-center "}>
        {/*form section*/}
        <div className={"w-[50%] h-full flex justify-center items-center "}>
          <form className="w-full max-w-lg space-y-5" onSubmit={handleSubmit}>
            <div>
              <h1 className="flex justify-items-start items-start text-gray-700 text-2xl font-bold ">
                Sign in
              </h1>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  name={"email"}
                  onChange={changeData}
                  type="email"
                  placeholder="jane@gmail.com"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password"
                  name={"password"}
                  onChange={changeData}
                  type="password"
                  placeholder="******************"
                />
              </div>
            </div>
            <p className="text-sm mb-3">
              Don't you have an account?{" "}
              <Link to={"/auth/register-about"}>
                <span className="text-sm text-red-800">Register Me</span>
              </Link>
            </p>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className={"w-full px-3"}>
                <input
                  className="appearance-none block w-full bg-blue-100 hover:bg-blue-300 after:bg-blue-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="submit-button"
                  value={"Sign in"}
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>

        {/*image section*/}

        <motion.div
          className={"w-[50%] h-full flex justify-center items-center mt-20"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 25 }}
        >
          <img
            src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg"
            alt="vector-image"
          />
        </motion.div>
      </div>
    </div>
  );
};
export default LogIn;
