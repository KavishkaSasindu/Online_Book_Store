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
    <div className="w-[100%] ">
      <div>Home Page</div>

      {/* Hero Section */}

      <div className=" w-full h-[450px] mt-15 flex justify-center items-center">
        <div className="w-[91%]  h-full flex justify-between items-center">
          {/* left hand side */}
          <div className="w-[55%]  flex justify-items-start items-center h-full">
            <div className="h-[78]">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#504B38]">
                Discover Your Next Great Read
                <span className="block text-xl mt-2 text-[#B9B28A]">
                  Literary Adventures Await
                </span>
              </h1>

              <p className="text-md text-[#504B38] opacity-80 mb-8">
                Explore our curated collection of books across all genres, from
                timeless classics to contemporary bestsellers. Find your next
                literary journey with us.
              </p>
              <div>
                <button className="px-4 py-2  rounded-sm bg-[#504B38] text-white shadow-md hover:bg-gray-200 hover:text-[#504B38] transition duration-300">
                  Explore...
                </button>
              </div>
            </div>
          </div>
          {/* right hand side */}
          <div className="w-[41%] flex justify-center items-center">
            <img
              className="object-cover h-[450px] shadow-md"
              src="https://unblast.com/wp-content/uploads/2020/03/Illustrator-Vector-Illustration-1.jpg"
              alt="hero-image"
            />
          </div>
        </div>
      </div>

      {/* after banner */}
      <div className="w-[100%] py-12 mt-5 bg-[#dfded5] flex ">
        <div className="container mx-auto px-4 w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Ready Book
              </h3>
              <p className="text-gray-600">Publish Your book in our store</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">100% secure guarantee</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Find Anything
              </h3>
              <p className="text-gray-600">Find your book now</p>
            </div>
          </div>
        </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 "
                >
                  <img
                    src={book.imageData}
                    alt={"imageName"}
                    className="w-full h-48 object-cover "
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

      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl  font-bold text-gray-800 mb-10 text-center">
            Explore Our Literary Universe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative overflow-hidden group rounded-lg h-64">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10"></div>
              <img
                src="https://image-processor-storage.s3.us-west-2.amazonaws.com/images/3cf61c1011912a2173ea4dfa260f1108/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg"
                alt="Fiction"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-medium text-white mb-2">
                  Fiction
                </h3>
                <p className="text-gray-200 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Immerse yourself in captivating stories and imaginary worlds
                </p>
                <div className="w-8 h-1 bg-white rounded opacity-80 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-lg h-64">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10"></div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZMwK5JFMwdMiLEoCfBtnQHk6o9uDqgjj1pw&s"
                alt="Non-Fiction"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-medium text-white mb-2">
                  Non-Fiction
                </h3>
                <p className="text-gray-200 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Discover true stories and expand your knowledge of our world
                </p>
                <div className="w-8 h-1 bg-white rounded opacity-80 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-lg h-64">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10"></div>
              <img
                src="https://celadonbooks.com/wp-content/uploads/2020/03/what-is-a-mystery.jpg"
                alt="Mystery & Thriller"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-medium text-white mb-2">
                  Mystery & Thriller
                </h3>
                <p className="text-gray-200 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Unravel suspenseful plots that will keep you on the edge of
                  your seat
                </p>
                <div className="w-8 h-1 bg-white rounded opacity-80 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-lg h-64">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10"></div>
              <img
                src="/api/placeholder/400/320"
                alt="Fantasy & Sci-Fi"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-medium text-white mb-2">
                  Fantasy & Sci-Fi
                </h3>
                <p className="text-gray-200 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Journey through fantastical realms and futuristic landscapes
                </p>
                <div className="w-8 h-1 bg-white rounded opacity-80 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <span>View All Categories</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Links Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl  font-medium text-[#504B38] mb-6">
              Connect With Us
            </h3>
            <div className="flex space-x-6 mb-8">
              {/* Facebook */}
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#EBE5C2] hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#504B38"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#EBE5C2] hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#504B38"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#EBE5C2] hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#504B38"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#EBE5C2] hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#504B38"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 12h8"></path>
                  <path d="M12 8v8"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </a>
            </div>
            <p className="text-gray-600 text-center max-w-md">
              Join our community of book lovers. Share your reads, get
              recommendations, and participate in exclusive events.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#504B38] text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">BookHaven</h3>
              <p className="text-gray-300 mb-4">
                Your destination for literary adventures and thoughtful
                discoveries.
              </p>
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} BookHaven. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    Returns Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    Shipping Information
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    Fiction
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    Non-Fiction
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    Children's Books
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    Rare Editions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#EBE5C2] transition-colors"
                  >
                    New Releases
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-[#B9B28A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-300">
                    123 Reading Lane, Booksville, BK 12345
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-[#B9B28A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-300">support@bookhaven.com</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-[#B9B28A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-300">(555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              BookHaven is committed to promoting literacy and supporting
              authors worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-[#EBE5C2]"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-[#EBE5C2]"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-[#EBE5C2]"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
