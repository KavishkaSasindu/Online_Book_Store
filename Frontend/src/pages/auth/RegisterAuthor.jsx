import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterAuthor = () => {
  const navigate = useNavigate();

  const [author, setAuthor] = useState({
    authorName: "",
    authorBio: "",
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
    setAuthor({
      ...author,
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
      if (author.password !== author.rePassword) {
        alert("Password does not match");
      }
      const authorProfile = {
        authorName: author.authorName,
        authorBio: author.authorBio,
        userProfile: {
          firstname: author.firstname,
          lastname: author.lastname,
          email: author.email,
          phone: author.phone,
          password: author.password,
          address: {
            street: author.street,
            city: author.city,
            state: author.state,
            zip: author.zip,
            country: author.country,
          },
        },
      };

      const formData = new FormData();
      formData.append(
        "authorProfile",
        new Blob([JSON.stringify(authorProfile)], {
          type: "application/json",
        })
      );
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8080/auth/author-register",
        formData
      );

      if (response.status == 200) {
        alert("Author registered successfully");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"w-[100%]"}>
      <div className={"flex justify-center items-center h-screen"}>
        <motion.div
          className={"w-[50%] h-full flex justify-center items-center"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 25 }}
        >
          <img
            className="fixed"
            src="https://cdni.iconscout.com/illustration/premium/thumb/girl-reading-book-illustration-download-in-svg-png-gif-file-formats--female-student-read-books-lover-pack-school-education-illustrations-3238408.png"
            alt="vector-image"
          />
        </motion.div>
        <motion.div
          className={"w-[50%] h-full flex justify-center items-center mt-10"}
        >
          <form
            className="w-full h-full mt-35 max-w-lg space-y-5"
            onSubmit={handleSubmit}
          >
            <h1 className="flex justify-items-start items-start text-gray-700 text-2xl font-bold mb-10">
              Register as an Author
            </h1>
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
                  htmlFor="authorName"
                >
                  Author Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="authorName"
                  onChange={changeState}
                  name={"authorName"}
                  type="text"
                  placeholder="Jane Author"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="authorBio"
                >
                  Email
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="authorBio"
                  onChange={changeState}
                  name={"authorBio"}
                  type="text"
                  placeholder="your bio"
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

export default RegisterAuthor;
