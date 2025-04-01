import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();
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
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //   fetch data to form
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

      const data = response.data;

      setAuthor(data);

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
      setPreviewImage(imageUrl);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to load profile data. Please try again.");
    }
  };

  const handleChange = (e) => {
    if (e.target.name in author.userProfile.address) {
      setAuthor((prev) => ({
        ...prev,
        userProfile: {
          ...prev.userProfile,
          address: {
            ...prev.userProfile.address,
            [e.target.name]: e.target.value,
          },
        },
      }));
    } else if (e.target.name in author.userProfile) {
      setAuthor((prev) => ({
        ...prev,
        userProfile: {
          ...prev.userProfile,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      setAuthor((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const updateData = {
        authorName: author.authorName,
        authorBio: author.authorBio,
        userProfile: {
          firstname: author.userProfile.firstname,
          lastname: author.userProfile.lastname,
          email: author.userProfile.email,
          phone: author.userProfile.phone,
          address: {
            street: author.userProfile.address.street,
            city: author.userProfile.address.city,
            state: author.userProfile.address.state,
            zip: author.userProfile.address.zip,
            country: author.userProfile.address.country,
          },
        },
      };

      const formData = new FormData();
      formData.append(
        "authorProfile",
        new Blob([JSON.stringify(updateData)], { type: "application/json" })
      );

      if (image && image instanceof File) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:8080/author/update-profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Profile updated successfully!");
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    fetchAuthorData();
  }, []);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-11/12 mx-auto mt-10">
        {/* Alerts */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg border-l-4 border-green-500 bg-white shadow-lg">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-green-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg border-l-4 border-red-500 bg-white shadow-lg">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-red-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="text-red-800 font-medium">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-4">
          <form onSubmit={handleSubmit} className="relative">
            {/* Profile Banner and Image */}
            <div className="h-24 bg-gray-400 w-full  relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://pattern.monster/curtain/')] bg-repeat"></div>
            </div>

            <div className="px-8 sm:px-12 pt-5">
              <div className="flex flex-col sm:flex-row sm:items-end -mt-24 mb-8">
                <div className="relative flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                  <div className="h-36 w-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-1 right-1 bg-white rounded-full p-2.5 shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:scale-110 border border-indigo-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </label>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={imageChange}
                    className="sr-only"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {author.authorName || "Author Name"}
                  </h2>
                  <p className="text-[#504B38] mt-1 font-medium">
                    {author.userProfile.role}
                  </p>
                </div>
              </div>

              {/* Form Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Author Info */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg border border-indigo-100">
                    <h3 className="text-lg font-semibold mb-4 text-[#504B38] flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Author Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="authorId"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author ID
                        </label>
                        <input
                          type="text"
                          name="authorId"
                          id="authorId"
                          disabled
                          value={author.authorId}
                          className="mt-1 bg-gray-100 text-gray-600 block w-full rounded-md border-gray-200 shadow-sm text-sm py-2.5 px-3"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="authorName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author Name
                        </label>
                        <input
                          type="text"
                          name="authorName"
                          id="authorName"
                          value={author.authorName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="authorBio"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author Bio
                        </label>
                        <textarea
                          id="authorBio"
                          name="authorBio"
                          rows={5}
                          value={author.authorBio}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Personal Info & Address */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-[#504B38] flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          value={author.userProfile.firstname}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          value={author.userProfile.lastname}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={author.userProfile.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={author.userProfile.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-[#504B38] flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Address
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street"
                          id="street"
                          value={author.userProfile.address.street}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={author.userProfile.address.city}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700"
                          >
                            State / Province
                          </label>
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={author.userProfile.address.state}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="zip"
                            className="block text-sm font-medium text-gray-700"
                          >
                            ZIP / Postal code
                          </label>
                          <input
                            type="text"
                            name="zip"
                            id="zip"
                            value={author.userProfile.address.zip}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={author.userProfile.address.country}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-indigo-200 shadow-sm text-sm py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="py-2.5 px-6 rounded-lg border border-gray-300 shadow-sm text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#504B38] text-whitepy-2 px-2 rounded-sm text-white"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
