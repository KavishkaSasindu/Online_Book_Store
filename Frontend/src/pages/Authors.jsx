import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const dummy = [
    {
      id: 1,
      name: "Jane Austen",
      image:
        "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
    },
    {
      id: 2,
      name: "George Orwell",
      image:
        "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
    },
  ];

  const fetchAuthors = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setAuthors(dummy);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const isValidate = () => {
    if (!token) {
      navigate("/auth/login");
    }
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
    <div className="min-h-screen bg-gray-200 p-4 md:p-8">
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

        <div className="relative">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex space-x-2 text-[#504B38] text-xl">
                <div>Loading authors</div>
                <div className="animate-bounce">.</div>
                <div className="animate-bounce delay-75">.</div>
                <div className="animate-bounce delay-150">.</div>
              </div>
            </div>
          ) : (
            <>
              {!token && (
                <div
                  className="absolute inset-x-0 bottom-0 h-[520px] flex flex-col items-center justify-center z-10"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(80, 75, 56, 0.85))",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="text-center max-w-md px-6 bg-white bg-opacity-80 p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-black mb-4">
                      Become a Member to See All Authors
                    </h3>
                    <p className="text-black font-medium mb-6">
                      Get unlimited access to our complete collection of authors
                      and their books.
                    </p>
                    <button
                      onClick={isValidate}
                      className="bg-red-950 text-white py-3 px-8 rounded-lg font-bold hover:bg-red-900 transform hover:scale-105 transition-all duration-200 shadow-md"
                    >
                      See All Authors
                    </button>
                  </div>
                </div>
              )}

              {filteredAuthors.length === 0 ? (
                <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
                  <div className="text-center p-6">
                    <p className="text-[#504B38] text-xl mb-3">
                      No authors found
                    </p>
                    <p className="text-gray-500">
                      Try adjusting your search criteria
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAuthors.map((author) => (
                    <div
                      key={author.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#504B38] group"
                    >
                      <div className="relative p-4">
                        <div className="flex items-center">
                          {author.image ? (
                            <img
                              src={author.image}
                              alt={author.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-[#504B38] shadow-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/150?text=Author";
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-[#EBE5C2] flex items-center justify-center border-2 border-[#504B38] shadow-md">
                              <span className="text-[#504B38] text-xl font-bold">
                                {author.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="ml-4 flex-1">
                            <h2 className="text-xl font-bold text-gray-800">
                              {author.name}
                            </h2>
                            <p className="text-sm text-gray-500">Author</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleViewBooks(author.id)}
                            className="w-full bg-[#504B38] text-white py-2 px-4 rounded-lg group-hover:bg-[#3c382a] transition-all duration-200 flex items-center justify-center space-x-2"
                            aria-label={`View books by ${author.name}`}
                          >
                            <span>View Books</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 group-hover:translate-x-1 transition-transform"
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
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authors;
