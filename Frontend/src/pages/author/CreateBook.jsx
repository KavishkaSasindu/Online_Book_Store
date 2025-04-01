import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const category = [
    "Select one",
    "FICTION",
    "NON_FICTION",
    "SCIENCE_FICTION",
    "MYSTERY",
    "ROMANCE",
    "FANTASY",
    "BIOGRAPHY",
    "HISTORY",
  ];

  const [bookData, setBookData] = useState({
    bookName: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const imageData = e.target.files[0];
    setImage(imageData);

    // Create preview URL for the selected image
    if (imageData) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(
        "book",
        new Blob([JSON.stringify(bookData)], { type: "application/json" })
      );
      formData.append("image", image);
      console.log(formData);

      const response = await axios.post(
        `http://localhost:8080/author/add-book/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
      if (response.status == 201) {
        alert("Book successfully added,View in your books");
        navigate(`/author/my-books/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-15">
        <div className="bg-gradient-to-r from-[#504B38] to-[#EBE5C2] py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Add New Book</h1>
          <p className="text-[#EBE5C2] mt-2">
            Share your literary creation with the world
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Form fields */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="bookName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Book Title
                  </label>
                  <input
                    type="text"
                    name="bookName"
                    id="bookName"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#504B38] focus:ring focus:ring-[#EBE5C2] focus:ring-opacity-50 p-2 border"
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows="4"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#504B38] focus:ring focus:ring-[#EBE5C2] focus:ring-opacity-50 p-2 border"
                    placeholder="Write a compelling description..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      step="any"
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#504B38] focus:ring focus:ring-[#EBE5C2] focus:ring-opacity-50 pl-7 p-2 border"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#504B38] focus:ring focus:ring-[#EBE5C2] focus:ring-opacity-50 p-2 border"
                    required
                  >
                    {category.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right column - Image upload & preview */}
              <div className="flex flex-col space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>

                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-64">
                  {imagePreview ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      <img
                        src={imagePreview}
                        alt="Book cover preview"
                        className="max-h-full max-w-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImage(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center flex flex-col items-center justify-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#504B38] hover:text-[#EBE5C2] focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleImage}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>

                {!imagePreview && (
                  <div className="mt-1">
                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#504B38] hover:bg-[#3a3728] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EBE5C2] cursor-pointer"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Select Image
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleImage}
                        accept="image/*"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EBE5C2] mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#504B38] hover:bg-[#3a3728] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EBE5C2]"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
