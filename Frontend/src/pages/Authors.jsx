import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Simulate API call to fetch authors
    const fetchAuthors = async () => {
      setIsLoading(true);
      // In a real application, replace this with an actual API call
      setTimeout(() => {
        setAuthors([
          {
            id: 1,
            name: "Jane Austen",
            image: "https://via.placeholder.com/300/250",
          },
          {
            id: 2,
            name: "George Orwell",
            image: "https://via.placeholder.com/300/250",
          },
          {
            id: 3,
            name: "Agatha Christie",
            image: "https://via.placeholder.com/300/250",
          },
          {
            id: 4,
            name: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/300/250",
          },
          {
            id: 5,
            name: "Virginia Woolf",
            image: "https://via.placeholder.com/300/250",
          },
          {
            id: 6,
            name: "Ernest Hemingway",
            image: "https://via.placeholder.com/300/250",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchAuthors();
  }, []);

  const isValidate = () => {
    if (!token) {
      setIsLoggedIn(false);
      navigate("/auth/register-about");
    }
    setIsLoggedIn(true);
    setShowAllAuthors(true);
  };

  // Filter authors based on search query
  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle searching
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle view books button click
  const handleViewBooks = (authorId) => {
    // In a real application, this would navigate to the author's books page
    console.log(`Viewing books of author with ID: ${authorId}`);
  };

  return (
    <div className="min-h-screen bg-[#dfded5] p-4 md:p-8">
      <div className="container mx-auto mt-15">
        <h1 className="text-4xl font-bold text-center text-[#504B38] mb-10">
          Our Featured Authors
        </h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center bg-[#EBE5C2] rounded-lg overflow-hidden shadow-md">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="flex-1 p-3 bg-[#EBE5C2] border-none focus:outline-none text-[#504B38]"
              placeholder="Search authors..."
            />
            <button className="bg-[#504B38] text-white p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-[#504B38] text-xl">Loading authors...</div>
          </div>
        ) : (
          <div className="relative">
            {/* Authors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuthors.map((author) => (
                <div
                  key={author.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="p-4 flex items-center">
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#504B38]"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-xl font-bold text-gray-800">
                        {author.name}
                      </h2>
                      <p className="text-sm text-gray-500">Author</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 flex justify-end border-t border-gray-100">
                    <button
                      onClick={() => handleViewBooks(author.id)}
                      className="bg-[#504B38] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200 flex items-center space-x-1"
                    >
                      <span>View Books</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {!token && (
        <div
          className="absolute inset-x-0 bottom-0 h-[400px] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(to bottom,rgba(255, 255, 255, 0.95), rgba(80, 75, 56,0.76) )",
          }}
        >
          {/* Content would go here */}
          <div className="z-100">
            <div className="text-center max-w-md px-6">
              <h3 className="text-2xl font-bold text-black mb-4 z-50">
                Become a Member to See All Authors
              </h3>
              <p className="text-black font-bold mb-6 z-50">
                Get unlimited access to our complete collection of authors and
                their books.
              </p>
              <button
                onClick={isValidate}
                className="bg-red-950 text-white z-1000 py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200"
              >
                See All Authors
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authors;
