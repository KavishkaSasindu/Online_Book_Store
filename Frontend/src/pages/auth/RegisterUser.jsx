import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Error from "../../components/responces/Error";
import Success from "../../components/responces/Success";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [image, setImage] = useState(null);

  const changeState = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const changeImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.password !== userData.rePassword) {
        console.log("password mismatch");
      }

      const user = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        address: {
          street: userData.street,
          city: userData.city,
          state: userData.state,
          zip: userData.zip,
          country: userData.country,
        },
      };

      console.log(user);

      const formData = new FormData();
      formData.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" })
      );
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8080/auth/user-register",
        formData
      );
      if (response.status === 201) {
        localStorage.setItem("firstname", userData.firstname);
        navigate("/auth/login");
      }
    } catch (error) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"w-[100%]"}>
      <div>
        <p>This is user registration area</p>
      </div>
      <div className={"flex justify-center items-center h-screen"}>
        <motion.div
          className={"w-[50%] h-full flex justify-center items-center"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 25 }}
        >
          <img
            className="fixed"
            src="https://cdni.iconscout.com/illustration/premium/thumb/kids-reading-book-illustration-download-in-svg-png-gif-file-formats--kid-boy-school-child-pack-education-illustrations-3238398.png"
            alt="vector-image"
          />
        </motion.div>
        <motion.div
          className={"w-[50%] h-full flex justify-center items-center"}
        >
          <form
            className="w-full h-full mt-35 max-w-lg space-y-10 "
            onSubmit={handleSubmit}
          >
            <div>
              <h1 className="flex justify-items-start items-start text-gray-700 text-2xl font-bold ">
                Register as a User
              </h1>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firtsname"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="firstname"
                  onChange={changeState}
                  name={"firstname"}
                  type="text"
                  placeholder="Jane"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="lastname"
                  onChange={changeState}
                  name={"lastname"}
                  type="text"
                  placeholder="Doe"
                />
              </div>
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
                  onChange={changeState}
                  name={"email"}
                  type="email"
                  placeholder="jane@gmail.com"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phone"
                  onChange={changeState}
                  name={"phone"}
                  type="text"
                  placeholder="112-897-189"
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
                  onChange={changeState}
                  name={"password"}
                  type="password"
                  placeholder="******************"
                />
                <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="rePassword"
                >
                  Re-Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="rePassword"
                  name={"rePassword"}
                  onChange={changeState}
                  type="password"
                  placeholder="******************"
                />
                <p className="text-gray-600 text-xs italic">
                  Make it matches with above password
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="street"
                >
                  Street
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="street"
                  name={"street"}
                  onChange={changeState}
                  type="text"
                  placeholder="backer street"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="city"
                  name={"city"}
                  onChange={changeState}
                  type="text"
                  placeholder="Albuquerque"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="state"
                  name={"state"}
                  onChange={changeState}
                  type="text"
                  placeholder="state"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="zip"
                >
                  Zip
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="zip"
                  name={"zip"}
                  onChange={changeState}
                  type="text"
                  placeholder="115500"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="country"
                  name={"country"}
                  onChange={changeState}
                  type="text"
                  placeholder="USA"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Profile Image
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="image"
                  onChange={changeImage}
                  name={"image"}
                  type="file"
                />
              </div>
            </div>
            <p className="text-sm ">
              Already have an account?{" "}
              <Link to={"/auth/login"}>
                <span className="text-sm text-red-800">Sign in</span>
              </Link>
            </p>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className={"w-full px-3"}>
                <input
                  className="appearance-none block w-full bg-blue-100 hover:bg-blue-300 after:bg-blue-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="submit-button"
                  value={"Register Me"}
                  type="submit"
                />
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
export default RegisterUser;
