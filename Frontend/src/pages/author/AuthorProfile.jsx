import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AuthorProfile = () => {
  const { id } = useParams();
  console.log(id);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [author, setAuthor] = useState({
    authorId: "",
    authorName: "",
    authorBio: "",
    userProfile: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      role: "",
      address: {
        city: "",
        country: "",
        state: "",
        zip: "",
        street: "",
      },
    },
  });

  const [image, setImage] = useState(null);

  //   fetch author data
  const fetchAuthorData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/author/get-profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const authorData = response.data;
      setAuthor(authorData);
      console.log(authorData);

      const authorImage = await axios.get(
        `http://localhost:8080/user/profile-image/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(authorImage.data);
      setImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    // fetching
    fetchAuthorData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 mt-15">
      {/* Header */}
      <div className="bg-[#504B38] text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Author Profile</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#EBE5C2] p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                {image ? (
                  <img
                    src={image}
                    alt="author-image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>
            <div className="md:mt-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#504B38]">
                {author.authorName}
              </h2>
              <p className="text-gray-600 mt-1 italic max-w-2xl">
                {author.authorBio || "No bio available"}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate(`/author/update-profile/${id}`)}
                  className="px-6 py-2 bg-[#504B38] text-white rounded-full hover:bg-opacity-90 transition-all shadow-md flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Update Profile
                </button>
                <button
                  onClick={() => navigate(`/author/my-books/${id}`)}
                  className="px-6 py-2 bg-white border border-[#504B38] text-[#504B38] rounded-full hover:bg-[#EBE5C2] transition-all shadow-md flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  My Books ({author.books?.length || 0})
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#504B38] border-b border-[#EBE5C2] pb-2 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Author ID</span>
                    <span className="font-medium">{author.authorId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">First Name</span>
                    <span className="font-medium">
                      {author.userProfile.firstname}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Last Name</span>
                    <span className="font-medium">
                      {author.userProfile.lastname}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Email</span>
                    <span className="font-medium">
                      {author.userProfile.email}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Phone</span>
                    <span className="font-medium">
                      {author.userProfile.phone || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Role</span>
                    <span className="font-medium">
                      {author.userProfile.role || "Author"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#504B38] border-b border-[#EBE5C2] pb-2 mb-4">
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Street</span>
                    <span className="font-medium">
                      {author.userProfile.address.street || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">City</span>
                    <span className="font-medium">
                      {author.userProfile.address.city || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">State</span>
                    <span className="font-medium">
                      {author.userProfile.address.state || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">ZIP Code</span>
                    <span className="font-medium">
                      {author.userProfile.address.zip || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Country</span>
                    <span className="font-medium">
                      {author.userProfile.address.country || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
