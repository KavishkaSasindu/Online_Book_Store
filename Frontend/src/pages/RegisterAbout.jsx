import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Aos from "aos";

const RegisterAbout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16 mt-15"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6  bg-clip-text ">
            Welcome to our Book Store!
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            How are you, user? We're excited to have you here!
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
              delay: 0.4,
            }}
            className="rounded-2xl overflow-hidden shadow-xl"
          ></motion.div>
        </motion.section>

        {/* Registration Options */}
        {/* Registration Options */}
        <motion.section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10  bg-clip-text ">
            We offer two registration options:
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* User Registration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 25,
                delay: 0.4,
              }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-blue-100 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Register as a User
                </h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                As a registered user, you can:
              </p>
              <ul className="space-y-4 text-gray-700 mb-8">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Browse and purchase books from our extensive collection
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Create and manage your personal reading lists
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Write reviews and rate books you've read
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Receive personalized book recommendations
                  </span>
                </li>
              </ul>
              {/* Using mt-auto to push the button to the bottom */}
              <div className="mt-auto">
                <Link to={"/auth/register/user"}>
                  <button className="w-full py-3 px-6 bg-[#EBE5C2] text-[#504B38] rounded-full hover:bg-[#504B38] hover:text-[#EBE5C2] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg font-medium">
                    Register as User
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Author Registration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 25,
                delay: 0.4,
              }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-indigo-100 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-3 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Register as an Author
                </h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                As a registered author, you can:
              </p>
              <ul className="space-y-4 text-gray-700 mb-8">
                <li className="flex items-start gap-3">
                  <span className="bg-indigo-100 text-indigo-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Publish your books on our platform
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-indigo-100 text-indigo-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Manage your author profile and book listings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-indigo-100 text-indigo-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Track sales and reader engagement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-indigo-100 text-indigo-600 font-bold rounded-full p-1 flex items-center justify-center w-6 h-6 mt-0.5">
                    •
                  </span>
                  <span className="text-lg">
                    Interact with your readers through comments and updates
                  </span>
                </li>
              </ul>
              {/* Using mt-auto to push the button to the bottom */}
              <div className="mt-auto">
                <Link to={"/auth/register/author"}>
                  <button className="w-full py-3 px-6 bg-[#EBE5C2] text-[#504B38] rounded-full hover:bg-[#504B38] hover:text-[#EBE5C2] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg font-medium">
                    Register as Author
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className=" p-8 shadow-xl">
            <h3 className="text-3xl font-bold  mb-4">
              Ready to start your journey?
            </h3>
            <p className="text-xl  mb-8 max-w-2xl mx-auto">
              Choose the option that best suits your needs and start your
              journey with us today!
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default RegisterAbout;
