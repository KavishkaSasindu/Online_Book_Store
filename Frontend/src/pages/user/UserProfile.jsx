import React, { useContext } from "react";
import {
  PhoneIcon,
  MailIcon,
  HomeIcon,
  EditIcon,
  BookIcon,
  CalendarIcon,
  UserIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [oneUser, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [userImage, setUserImage] = useState(null);
  const { id } = useParams();

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      <Navigate to={"/auth/login"} />;
    }

    try {
      const userData = await axios.get(
        `http://localhost:8080/user/get-user-profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = userData.data;
      setUser(data);
      setAddress(data.address);
      console.log(data);

      const imageResponse = await axios.get(
        `http://localhost:8080/user/profile-image/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const imageData = URL.createObjectURL(imageResponse.data);
      setUserImage(imageData);
      console.log(imageData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 mt-12">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="relative h-32 bg-gradient-to-r from-[#504B38] to-[#7A725A]">
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="relative">
                <div className="bg-white p-1 rounded-full shadow-md">
                  {oneUser.imageData ? (
                    <img
                      src={userImage}
                      alt={`${oneUser.firstname} ${oneUser.lastname}`}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-[#EBE5C2] flex items-center justify-center text-[#504B38] text-3xl font-bold">
                      {oneUser.firstname}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-6 px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#504B38]">
                {oneUser.firstname} {oneUser.lastname}
              </h1>
              <div className="flex items-center mt-1">
                <span className="bg-[#EBE5C2] text-[#504B38] px-3 py-1 rounded-full text-sm font-medium">
                  {oneUser.role}
                </span>
                <span className="text-sm text-gray-500 ml-3">
                  User ID: {oneUser.userId}
                </span>
              </div>
            </div>
            <Link to={`/user/update-profile/${id}`}>
              <button className="mt-4 sm:mt-0 bg-[#504B38] hover:bg-[#3A3728] text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
                <EditIcon size={16} className="mr-2" />
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-6 ">
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="bg-[#EBE5C2] p-3 rounded-full mb-2">
              <UserIcon size={20} className="text-[#504B38]" />
            </div>
            <span className="text-sm font-medium text-[#504B38]">Profile</span>
          </div>
          <Link to={`/user/user-wishlist/${id}`}>
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="bg-[#EBE5C2] p-3 rounded-full mb-2">
                <BookIcon size={20} className="text-[#504B38]" />
              </div>
              <span className="text-sm font-medium text-[#504B38]">
                Wishlist
              </span>
            </div>
          </Link>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex justify-between items-center p-4 bg-[#EBE5C2] bg-opacity-30">
                  <h2 className="text-lg font-semibold text-[#504B38]">
                    Contact Information
                  </h2>
                  <button className="text-[#504B38]">
                    <EditIcon size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div className="flex items-start">
                  <div className="bg-[#EBE5C2] p-2 rounded-lg mr-3">
                    <MailIcon size={20} className="text-[#504B38]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-[#504B38]">
                      {oneUser.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#EBE5C2] p-2 rounded-lg mr-3">
                    <PhoneIcon size={20} className="text-[#504B38]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-[#504B38]">
                      {oneUser.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex justify-between items-center p-4 bg-[#EBE5C2] bg-opacity-30">
                  <h2 className="text-lg font-semibold text-[#504B38]">
                    Address
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start">
                  <div className="bg-[#EBE5C2] p-2 rounded-lg mr-3">
                    <HomeIcon size={20} className="text-[#504B38]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#504B38]">
                      {address.street}
                    </p>
                    <p className="text-gray-600">
                      {address.city},{address.zip}
                    </p>
                    <p className="text-gray-600">
                      {address.state},{address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Account Summary Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100">
                <h2 className="text-lg font-semibold p-4 bg-[#EBE5C2] bg-opacity-30 text-[#504B38]">
                  Account Summary
                </h2>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <CalendarIcon size={20} className="text-[#504B38] mr-3" />
                    <span className="text-gray-600">Member Since</span>
                  </div>
                  <span className="font-medium">
                    {new Date(oneUser.profileCreatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <UserIcon size={20} className="text-[#504B38] mr-3" />
                    <span className="text-gray-600">Role</span>
                  </div>
                  <span className="bg-[#504B38] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {oneUser.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookIcon size={20} className="text-[#504B38] mr-3" />
                    <span className="text-gray-600">Author Profile</span>
                  </div>
                  <span className="font-medium">
                    {oneUser.authorProfile ? "Active" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100">
                <h2 className="text-lg font-semibold p-4 bg-[#EBE5C2] bg-opacity-30 text-[#504B38]">
                  Quick Actions
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                <a
                  href="#"
                  className="p-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-[#504B38]">
                    Change Password
                  </span>
                  <ChevronRightIcon size={20} className="text-gray-400" />
                </a>
                <a
                  href="#"
                  className="p-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-[#504B38]">
                    Notification Settings
                  </span>
                  <ChevronRightIcon size={20} className="text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
