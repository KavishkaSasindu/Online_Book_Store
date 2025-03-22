import React, { useState } from "react";
import { ArrowLeftIcon, SaveIcon, CameraIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

const UpdateUserProfile = () => {
  // Sample user data based on your JSON
  const [user, setUser] = useState({
    userId: 6,
    firstname: "Admin",
    lastname: "Harry",
    email: "admin.harry@example.com",
    phone: "543-210-9876",
    imageName: "",
    imageType: null,
    imageData: "",
    profileCreatedAt: "2025-03-20T15:59:43.723564",
    role: "ADMIN",
    address: {
      street: "123 Elm Street",
      city: "Dallas",
      state: "TX",
      zip: "78901",
      country: "USA",
    },
  });

  // State for form handling
  const [formData, setFormData] = useState({ ...user });
  const [activeSection, setActiveSection] = useState("personal");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user data:", formData);
    // Here you would typically make an API call to update the user
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#504B38] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center">
            <button className="mr-3 p-1 hover:bg-[#3A3728] rounded-full">
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        <form onSubmit={handleSubmit}>
          {/* Profile Image Update Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {formData.imageData ? (
                  <img
                    src={formData.imageData}
                    alt={`${formData.firstname} ${formData.lastname}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#EBE5C2]"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-[#504B38] flex items-center justify-center text-white text-3xl font-bold border-4 border-[#EBE5C2]">
                    {formData.firstname.charAt(0)}
                    {formData.lastname.charAt(0)}
                  </div>
                )}
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-0 right-0 bg-[#EBE5C2] text-[#504B38] p-2 rounded-full cursor-pointer shadow-md"
                >
                  <CameraIcon size={20} />
                  <input
                    id="profile-image-upload"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
              <h2 className="text-xl font-bold text-[#504B38]">
                {formData.firstname} {formData.lastname}
              </h2>
              <p className="text-sm text-gray-500">{formData.role}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                className={`flex-1 px-4 py-3 font-medium ${
                  activeSection === "personal"
                    ? "text-[#504B38] border-b-2 border-[#504B38]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveSection("personal")}
              >
                Personal Info
              </button>
              <button
                type="button"
                className={`flex-1 px-4 py-3 font-medium ${
                  activeSection === "contact"
                    ? "text-[#504B38] border-b-2 border-[#504B38]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveSection("contact")}
              >
                Contact Details
              </button>
              <button
                type="button"
                className={`flex-1 px-4 py-3 font-medium ${
                  activeSection === "address"
                    ? "text-[#504B38] border-b-2 border-[#504B38]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveSection("address")}
              >
                Address
              </button>
            </div>

            {/* Personal Information */}
            {activeSection === "personal" && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    User ID cannot be changed
                  </p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="p-3 border border-gray-300 rounded-md bg-gray-100">
                    <span className="bg-[#504B38] text-white px-2 py-1 rounded-full text-sm">
                      {formData.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Role changes must be made by an administrator
                  </p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {activeSection === "contact" && (
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                  />
                </div>
                <div className="mt-6 p-4 bg-[#EBE5C2] bg-opacity-30 rounded-lg border border-[#EBE5C2]">
                  <h3 className="text-sm font-semibold text-[#504B38] mb-2">
                    Account Created
                  </h3>
                  <p className="text-gray-700">
                    {new Date(formData.profileCreatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Address Information */}
            {activeSection === "address" && (
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="address.zip"
                      value={formData.address.zip}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-[#EBE5C2] bg-opacity-20"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Link to={"/user/user-profile"}>
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium flex items-center"
                onClick={() => console.log("Cancel")}
              >
                <XIcon size={18} className="mr-2" />
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-[#504B38] text-white rounded-md font-medium flex items-center"
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
