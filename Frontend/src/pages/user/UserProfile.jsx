import React, { useState } from "react";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldIcon,
  UserIcon,
  HomeIcon,
  EditIcon,
  BookIcon,
  LogOutIcon,
  SettingsIcon,
  ChevronRightIcon,
} from "lucide-react";

const EnhancedUserProfile = () => {
  // Sample user data based on your JSON
  const user = {
    userId: 6,
    firstname: "Admin",
    lastname: "Harry",
    email: "admin.harry@example.com",
    password: "$2a$12$GdFk8hjrlUcSkzS7SiBEVOLr4MSVq1U4ARTDJAw9PsPG4ln/z0EJS",
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
    authorProfile: null,
    // Added these fields for more interesting data visualization
    recentActivity: [
      { action: "Updated profile", date: "2025-03-21T09:15:23" },
      { action: "Changed password", date: "2025-03-18T16:42:10" },
      { action: "Login from new device", date: "2025-03-15T08:30:45" },
    ],
  };

  const [showNav, setShowNav] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Side Navigation (hidden on mobile) */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#504B38] text-white transform ${
          showNav ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-6 ">
          <h2 className="text-2xl font-bold">BookStore</h2>
        </div>
        <div className="mt-10">
          <nav className="px-3">
            <a
              href="#"
              className="flex items-center px-3 py-3 text-white bg-[#3A3728] rounded-lg mb-1"
            >
              <UserIcon size={20} className="mr-3" />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-3 text-white hover:bg-[#3A3728] rounded-lg mb-1"
            >
              <BookIcon size={20} className="mr-3" />
              <span>My Books</span>
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-3 text-white hover:bg-[#3A3728] rounded-lg mb-1"
            >
              <ShieldIcon size={20} className="mr-3" />
              <span>Security</span>
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-3 text-white hover:bg-[#3A3728] rounded-lg mb-1"
            >
              <SettingsIcon size={20} className="mr-3" />
              <span>Settings</span>
            </a>
            <div className="border-t border-[#3A3728] my-4"></div>
            <a
              href="#"
              className="flex items-center px-3 py-3 text-white hover:bg-[#3A3728] rounded-lg"
            >
              <LogOutIcon size={20} className="mr-3" />
              <span>Logout</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#504B38] text-white p-4 flex justify-between items-center">
          <button onClick={() => setShowNav(!showNav)} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">My Profile</h1>
          <div className="w-6"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Profile Header */}
        <div className="bg-white shadow-md">
          <div className="relative h-32 bg-gradient-to-r from-[#504B38] to-[#7A725A]">
            <div className="absolute -bottom-20 left-8 flex items-end">
              <div className="relative">
                <div className="bg-white p-1 rounded-full shadow-md">
                  {user.imageData ? (
                    <img
                      src={user.imageData}
                      alt={`${user.firstname} ${user.lastname}`}
                      className="w-40 h-40 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-[#EBE5C2] flex items-center justify-center text-[#504B38] text-4xl font-bold">
                      {user.firstname.charAt(0)}
                      {user.lastname.charAt(0)}
                    </div>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 bg-[#504B38] p-2 rounded-full text-white shadow-lg">
                  <EditIcon size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-24 pb-6 px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#504B38]">
                {user.firstname} {user.lastname}
              </h1>
              <div className="flex items-center mt-1">
                <span className="bg-[#EBE5C2] text-[#504B38] px-3 py-1 rounded-full text-sm font-medium">
                  {user.role}
                </span>
                <span className="text-sm text-gray-500 ml-3">
                  User ID: {user.userId}
                </span>
              </div>
            </div>
            <button
              onClick={() => (window.location.href = "/edit-profile")}
              className="mt-4 md:mt-0 bg-[#504B38] hover:bg-[#3A3728] text-white px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <EditIcon size={18} className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Contact Information Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold p-4 bg-[#EBE5C2] bg-opacity-30 text-[#504B38]">
                    Contact Information
                  </h2>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div className="flex items-start">
                    <div className="bg-[#EBE5C2] p-2 rounded-lg mr-3">
                      <MailIcon size={20} className="text-[#504B38]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-[#504B38]">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#EBE5C2] p-2 rounded-lg mr-3">
                      <PhoneIcon size={20} className="text-[#504B38]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium text-[#504B38]">{user.phone}</p>
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
                    <button className="text-[#504B38]">
                      <EditIcon size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="bg-[#EBE5C2] p-2 rounded-lg mr-3">
                      <HomeIcon size={20} className="text-[#504B38]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#504B38]">
                        {user.address.street}
                      </p>
                      <p className="text-gray-600">
                        {user.address.city}, {user.address.state}{" "}
                        {user.address.zip}
                      </p>
                      <p className="text-gray-600">{user.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold p-4 bg-[#EBE5C2] bg-opacity-30 text-[#504B38]">
                    Recent Activity
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {user.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 flex justify-between items-center hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#504B38] rounded-full mr-3"></div>
                        <span>{activity.action}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
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
                      {new Date(user.profileCreatedAt).toLocaleDateString(
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
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookIcon size={20} className="text-[#504B38] mr-3" />
                      <span className="text-gray-600">Author Profile</span>
                    </div>
                    <span className="font-medium">
                      {user.authorProfile ? "Active" : "Not Available"}
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
                  <a
                    href="#"
                    className="p-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium text-[#504B38]">
                      Manage Payment Methods
                    </span>
                    <ChevronRightIcon size={20} className="text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedUserProfile;
