import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy categories
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/public/all-books"
      );

      const bookData = await response.data;

      console.log(bookData);

      const bookWithImage = await Promise.all(
        bookData.map(async (book) => {
          const imageData = await axios.get(
            `http://localhost:8080/public/one-book/image/${book.bookId}`,
            { responseType: "blob" }
          );

          console.log(book.bookId);
          const imageUrl = URL.createObjectURL(imageData.data);
          return {
            ...book,
            imageData: imageUrl,
          };
        })
      );

      setBooks(bookWithImage);
      console.log(books);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="text-yellow-500">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="text-yellow-500">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Search and Filter Section */}
      <section className="py-8 px-6 bg-gray-200 ">
        <div className="container mx-auto mt-15">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search bar */}
            <div className="flex-grow">
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Search by title, author or keyword..."
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#504B38]"
                />
                <button className="absolute right-3 top-3 text-gray-500">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category dropdown */}
            <div className="w-full md:w-64">
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#504B38] bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="pt-6 pb-2 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-[#504B38] text-white"
                    : "bg-white text-[#504B38] hover:bg-[#EBE5C2]"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book, index) => (
              <div
                key={book.bookId}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={book.imageData}
                  alt={book.bookName}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-[#EBE5C2]">
                  <h3 className="font-bold text-[#504B38] text-lg mb-1 truncate">
                    {book.bookName}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {book.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {book.description
                      ? `${book.description.substring(0, 60)}...`
                      : "No description available..."}
                  </p>
                  <div className="flex items-center mb-2">
                    {renderStars(book.rating)}
                    <span className="ml-1 text-sm text-gray-600">
                      ({book.rating})
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-[#504B38]">
                      ${book.price.toFixed(2)}
                    </span>
                    <button className="bg-[#504B38] hover:bg-[#3A3728] text-white px-3 py-1 rounded-md text-sm transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="flex items-center space-x-1">
              <button className="px-4 py-2 border border-[#B9B28A] rounded-l-lg hover:bg-[#EBE5C2] text-[#504B38] transition-colors duration-300">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 border border-[#B9B28A] hover:bg-[#EBE5C2] text-[#504B38] transition-colors duration-300 ${
                    page === 1
                      ? "bg-[#504B38] text-white hover:bg-[#504B38]"
                      : ""
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-[#B9B28A] rounded-r-lg hover:bg-[#EBE5C2] text-[#504B38] transition-colors duration-300">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBooks;
