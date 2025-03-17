import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

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
  const [animate, setAnimate] = useState(false);
  const bookRef = useRef(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Update your existing useEffect to include this:
  useEffect(() => {
    setAnimate(true);

    // Add mouse tracking for the book
    const handleMouseMove = (e) => {
      if (!bookRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Limit the rotation to a subtle amount
      const rotateY = 5 * (x - 0.5);
      const rotateX = -5 * (y - 0.5);

      bookRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Set up word animation timer
    const words = ["Discover", "Your", "Next", "Great", "Read"];
    const wordInterval = setInterval(() => {
      setActiveWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    // Clean up both
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(wordInterval);
    };
  }, []);
  return (
    <div className="w-[100%] ">
      <div>Home Page</div>

      {/* Hero Section */}
      {/* Hero Section */}
      <div className="flex justify-center items-center w-full bg-gray-200 ">
        <section className="py-16 w-[95%]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left side - Text content */}
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#504B38]">
                  Discover Your Next Great Read
                  <span className="block text-2xl mt-2 text-[#B9B28A]">
                    Literary Adventures Await
                  </span>
                </h1>

                <p className="text-lg text-[#504B38] opacity-80 mb-8">
                  Explore our curated collection of books across all genres,
                  from timeless classics to contemporary bestsellers. Find your
                  next literary journey with us.
                </p>

                <div className="flex space-x-4">
                  <Link
                    to="/books"
                    className="bg-[#504B38] hover:bg-[#3A3728] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Browse Books
                  </Link>
                  <Link
                    to="/categories"
                    className="border-2 border-[#504B38] text-[#504B38] hover:bg-[#504B38] hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    View Categories
                  </Link>
                </div>
              </div>

              {/* Right side - Simple book display */}
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-116 h-96 shadow-xl rounded-sm overflow-hidden">
                  {/* Book cover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#504B38] to-[#B9B28A] p-4 flex flex-col justify-between">
                    <div className="text-center mt-16">
                      <h3 className="text-white text-3xl font-bold mb-2">
                        Book Haven
                      </h3>
                      <p className="text-[#EBE5C2] italic text-lg">
                        Your reading sanctuary
                      </p>

                      <div className="mt-8 flex justify-center">
                        <div className="w-16 h-1 bg-[#EBE5C2] rounded-full"></div>
                      </div>

                      <p className="mt-8 text-white opacity-80 text-sm">
                        "Books are a uniquely portable magic."
                      </p>
                      <p className="text-[#EBE5C2] text-sm mt-2">
                        - Stephen King
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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
                    className="w-full h-64 object-cover "
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
      <section className="py-16 px-6 bg-gray-200 text-black">
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
              className="px-4 py-3 rounded-l-lg sm:rounded-r-none focus:outline-none border text-gray-700 w-full sm:w-80"
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
