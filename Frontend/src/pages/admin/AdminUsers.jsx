import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUser] = useState([]);
  const navigate = useParams();
  const token = localStorage.getItem("token");

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <div className="mt-15">all users </div>
      <div>
        {users?.map((user, index) => (
          <div key={index}>
            <h1>{user.firstname}</h1>
            <p>{user.lastname}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <div>
              <button>read and update icon</button>
              <button>delete icon</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
