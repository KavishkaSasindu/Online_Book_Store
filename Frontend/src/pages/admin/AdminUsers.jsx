import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUser] = useState([]);
  const [seacrhQuery, setSearchQuery] = useState("");
  const navigate = useParams();
  const token = localStorage.getItem("token");

  const decode = jwtDecode(token);
  const userId = decode.userId;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setUser(data);
      console.log(data);

      console.log(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      if (id == userId) {
        alert("you cannot delete your own account");
        return;
      }
      const response = await axios.delete(
        `http://localhost:8080/admin/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        alert("user deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-white  h-screen">
      <div className="mt-15 text-2xl font-bold text-[#3A3728] mb-6">
        All Users
      </div>
      <div></div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#3A3728] text-white">
            <tr>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user, index) => (
              <tr key={index} className="bg-white">
                <td className="py-3 px-4">{user.firstname}</td>
                <td className="py-3 px-4">{user.lastname}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <Link to={`/admin/dashboard/read-update-user/${user.userId}`}>
                    <button className="bg-[#3A3728] text-white py-1 px-3 rounded hover:bg-opacity-80 transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-opacity-80 transition"
                    onClick={() => deleteUser(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
