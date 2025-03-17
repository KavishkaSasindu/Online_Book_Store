import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBook = () => {
  const navigete = useNavigate();

  const [bookData, setBookData] = useState({
    bookName: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const categories = [
    "All",
    "FICTION",
    "NON_FICTION",
    "SCIENCE_FICTION",
    "MYSTERY",
    "ROMANCE",
    "FANTASY",
    "BIOGRAPHY",
    "HISTORY",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const token = localStorage.getItem("token");
  if (!token) {
    navigete("/auth/login");
  }

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImage(image);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!bookData.bookName.trim()) {
      newErrors.bookName = "Book name is required";
    }

    if (!bookData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!bookData.price) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(parseFloat(bookData.price)) ||
      parseFloat(bookData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number";
    }

    if (!bookData.category || bookData.category === "All") {
      newErrors.category = "Please select a specific category";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    // Here you would normally send the data to your backend
    const formData = new FormData();
    formData.append(
      "book",
      new Blob([JSON.stringify(bookData)], { type: "application/json" })
    );
    formData.append("image", image);

    const response = await axios.post(
      `http://localhost:8080/author/add-book/1`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    const data = await response.data;
    console.log(formData);

    // Simulate API call
    setTimeout(() => {
      alert("Book added successfully!");
      setBookData({
        bookName: "",
        description: "",
        price: "",
        category: "",
        coverImage: null,
      });
      setPreviewImage(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-[#F8F3D9] min-h-screen">
      {/* Page Title */}
      <div className="bg-[#B9B28A] py-8 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white">Add New Book</h1>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#EBE5C2] py-4 px-6 border-b border-[#B9B28A]">
              <h2 className="text-xl font-semibold text-[#504B38]">
                Book Information
              </h2>
              <p className="text-sm text-gray-600">
                Fill in the details to add a new book to the store
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="bookName"
                    className="block text-sm font-medium text-[#504B38] mb-1"
                  >
                    Book Title
                  </label>
                  <input
                    type="text"
                    id="bookName"
                    name="bookName"
                    value={bookData.bookName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#504B38] ${
                      errors.bookName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter book title"
                  />
                  {errors.bookName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bookName}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-[#504B38] mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#504B38] ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter book description"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-[#504B38] mb-1"
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={bookData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#504B38] ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-[#504B38] mb-1"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={bookData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#504B38] appearance-none bg-white ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                  {bookData.category === "All" && (
                    <p className="text-red-500 text-sm mt-1">
                      Choose most suitable category
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="coverImage"
                    className="block text-sm font-medium text-[#504B38] mb-1"
                  >
                    Cover Image
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="flex-1">
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#504B38] transition-colors duration-300">
                        <input
                          type="file"
                          id="coverImage"
                          name="coverImage"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-sm text-gray-500">
                            {previewImage
                              ? "Click to change image"
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {previewImage && (
                      <div className="w-24 h-32 rounded-md overflow-hidden border border-gray-300 shadow-sm">
                        <img
                          src={previewImage}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#504B38] text-white rounded-md text-sm font-medium hover:bg-[#3A3728] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#504B38] ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Add Book"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateBook;
