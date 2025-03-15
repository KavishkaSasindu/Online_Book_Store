import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/public/random-book"
      );

      const bookData = await response.data;

      const bookWithImage = await Promise.all(
        bookData.map(async (book) => {
          const imageData = await axios.get(
            `http://localhost:8080/public/one-book/image/${book.bookId}`,
            { responseType: "blob" }
          );

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
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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

  return (
    <div>
      <div>Home Page</div>

      {/* Hero Section */}
      <section className="bg-[#B9B28A] text-white py-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next Great Read
            </h1>
            <p className="text-lg mb-8">
              Explore our curated collection of books for every reader. From
              bestsellers to hidden gems, find your perfect match.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/books"
                className="bg-[#504B38] hover:bg-[#3A3728] text-white py-3 px-6 rounded-lg text-center transition-colors duration-300"
              >
                Explore Books
              </Link>
              <Link
                to="/categories"
                className="bg-[#EBE5C2] hover:bg-[#D9D3B0] text-[#504B38] py-3 px-6 rounded-lg text-center transition-colors duration-300"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://img.freepik.com/premium-vector/young-girl-sitting-near-pile-books-reading-book-vector-flat-illustration_357257-1053.jpg"
              alt="Books collection"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#504B38]">
              Featured Books
            </h2>
            <Link
              to="/books"
              className="text-[#504B38] hover:text-[#B9B28A] font-semibold transition-colors duration-300"
            >
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#504B38]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={book.imageData}
                    alt={"imageName"}
                    className="w-full h-64 object-fit "
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
                        ${book.price}
                      </span>
                      <button className="bg-[#504B38] hover:bg-[#3A3728] text-white px-3 py-1 rounded-md text-sm transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-[#EBE5C2]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#504B38] mb-8 text-center">
            Popular Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Fiction",
              "Non-fiction",
              "Science Fiction",
              "Mystery",
              "Romance",
              "Biography",
              "History",
              "Self-help",
            ].map((category) => (
              <Link
                to={`/category/${category.toLowerCase()}`}
                key={category}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl text-center transition-all duration-300 hover:bg-[#F8F3D9]"
              >
                <h3 className="text-xl font-semibold text-[#504B38]">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-[#B9B28A] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on new arrivals,
            special offers, and reading recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-l-lg sm:rounded-r-none focus:outline-none text-gray-700 w-full sm:w-80"
            />
            <button className="bg-[#504B38] hover:bg-[#3A3728] text-white px-6 py-3 rounded-r-lg sm:rounded-l-none transition-colors duration-300 w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
