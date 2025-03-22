import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  UserPlus,
  RefreshCw,
  X,
} from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchFocused, setSearchFocused] = useState(false);

  // Simulated data - replace with your actual API call
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await fetch('/api/users');
        // const data = await response.json();

        // Simulated data for demonstration
        const data = [
          {
            id: 1,
            email: "john.doe@example.com",
            role: "Customer",
            image: "/api/placeholder/40/40",
          },
          {
            id: 2,
            email: "jane.smith@example.com",
            role: "Admin",
            image: "/api/placeholder/40/40",
          },
          {
            id: 3,
            email: "robert.johnson@example.com",
            role: "Customer",
            image: "/api/placeholder/40/40",
          },
          {
            id: 4,
            email: "emily.wilson@example.com",
            role: "Editor",
            image: "/api/placeholder/40/40",
          },
          {
            id: 5,
            email: "michael.brown@example.com",
            role: "Customer",
            image: "/api/placeholder/40/40",
          },
          {
            id: 6,
            email: "sarah.taylor@example.com",
            role: "Customer",
            image: "/api/placeholder/40/40",
          },
          {
            id: 7,
            email: "david.martinez@example.com",
            role: "Admin",
            image: "/api/placeholder/40/40",
          },
          {
            id: 8,
            email: "lisa.anderson@example.com",
            role: "Editor",
            image: "/api/placeholder/40/40",
          },
        ];

        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
  );

  // When search term changes, reset to first page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle view user details
  const handleViewUser = (userId) => {
    console.log("View user details:", userId);
    // Implement navigation to user details page
    // navigate(`/admin/users/${userId}`);
  };

  // Handle update user
  const handleUpdateUser = (userId) => {
    console.log("Update user:", userId);
    // Implement navigation to user edit page
    // navigate(`/admin/users/edit/${userId}`);
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Delete user:", userId);
      // Implement actual deletion logic
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // Handle refresh data
  const handleRefresh = () => {
    setLoading(true);
    // Re-fetch data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3A3728] mb-4 sm:mb-0">
              User Management
            </h1>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#504B38]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}

                {/* Search results dropdown */}
                {searchTerm && searchFocused && filteredUsers.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredUsers.slice(0, 5).map((user) => (
                      <div
                        key={user.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleViewUser(user.id)}
                      >
                        <img
                          src={user.image}
                          alt={`${user.email} avatar`}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user.id} • {user.role}
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredUsers.length > 5 && (
                      <div className="px-2 py-1 text-xs text-center text-gray-500 border-t">
                        {filteredUsers.length - 5} more results
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                className="flex items-center justify-center px-4 py-2 bg-[#504B38] text-white rounded-md hover:bg-[#3A3728] transition-colors"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>

              <button className="flex items-center justify-center px-4 py-2 bg-[#504B38] text-white rounded-md hover:bg-[#3A3728] transition-colors">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </button>
            </div>
          </div>

          {/* Search result summary */}
          {searchTerm && (
            <div className="mb-4 text-sm text-gray-600">
              Found {filteredUsers.length}{" "}
              {filteredUsers.length === 1 ? "user" : "users"} matching "
              {searchTerm}"
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#504B38]"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{user.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={user.image}
                                  alt={`${user.email} avatar`}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {searchTerm ? (
                              <span>
                                {user.email
                                  .split(new RegExp(`(${searchTerm})`, "gi"))
                                  .map((part, i) =>
                                    part.toLowerCase() ===
                                    searchTerm.toLowerCase() ? (
                                      <span key={i} className="bg-yellow-200">
                                        {part}
                                      </span>
                                    ) : (
                                      part
                                    )
                                  )}
                              </span>
                            ) : (
                              user.email
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === "Admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : user.role === "Editor"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleViewUser(user.id)}
                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100"
                                title="View user details"
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleUpdateUser(user.id)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                                title="Edit user"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                                title="Delete user"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          {searchTerm
                            ? `No users found matching "${searchTerm}"`
                            : "No users found"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredUsers.length > usersPerPage && (
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstUser + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {indexOfLastUser > filteredUsers.length
                        ? filteredUsers.length
                        : indexOfLastUser}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredUsers.length}</span>{" "}
                    users
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages).keys()].map((number) => (
                      <button
                        key={number + 1}
                        onClick={() => setCurrentPage(number + 1)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === number + 1
                            ? "bg-[#504B38] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {number + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
