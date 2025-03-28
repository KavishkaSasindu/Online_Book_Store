import React, { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, SaveIcon, CameraIcon } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { pre } from "framer-motion/client";
import { AuthContext } from "../auth/AuthProvider";

const UpdateUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);

  const originalEmail = user?.email;

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const [image, setImage] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/get-user-profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profile = response.data;
      setUserData(profile);

      const userImage = await axios.get(
        `http://localhost:8080/user/profile-image/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const imageData = URL.createObjectURL(userImage.data);
      setImage(imageData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (e.target.name in userData.address) {
      setUserData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateUser = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        phone: userData.phone,
        address: {
          street: userData.address.street,
          city: userData.address.city,
          state: userData.address.state,
          zip: userData.address.zip,
          country: userData.address.country,
        },
      };

      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "userProfile",
        new Blob([JSON.stringify(updateUser)], { type: "application/json" })
      );

      const response = await axios.put(
        `http://localhost:8080/user/update-profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data.email !== originalEmail) {
        localStorage.clear();
        alert(
          "Profile is updated successfully...Email has been changed, please login"
        );
        navigate("/auth/login");
      } else {
        alert("Profile updated successfully");
        navigate(`/user/user-profile/${id}`);
      }
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const changeImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden mt-15">
        {/* Header */}
        <div className="bg-[#504B38] text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={`/user/user-profile/${id}`}>
              <ArrowLeftIcon
                size={24}
                className="cursor-pointer hover:text-gray-300"
              />
            </Link>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
          </div>
        </div>

        {/* Profile Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-[#EBE5C2] shadow-lg"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-[#504B38] flex items-center justify-center text-white text-4xl font-bold">
                  {userData.firstname?.[0]}
                </div>
              )}
              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-2 right-0 bg-[#504B38] text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-[#3A3728] transition"
              >
                <CameraIcon size={20} />
                <input
                  id="profile-image-upload"
                  type="file"
                  className="hidden"
                  onChange={changeImage}
                />
              </label>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-[#504B38]">
              {userData.firstname} {userData.lastname}
            </h2>
            <p className="text-gray-500">{userData.role}</p>
          </div>

          {/* Profile Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-[#504B38] mb-4 border-b pb-2">
                Personal Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={userData.firstname}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-xl font-semibold text-[#504B38] mb-4 border-b pb-2">
                Address Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="street"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={userData.address?.street || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={userData.address?.city || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="state"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={userData.address?.state || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="zip"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={userData.address?.zip || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={userData.address?.country || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <Link to={`/user/user-profile/${id}`}>
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-[#504B38] text-white rounded-md font-medium hover:bg-[#3A3728] transition flex items-center"
            >
              <SaveIcon size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
