import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import axios from "axios";

const AuthorsTable = () => {
  let token = localStorage.getItem("token");

  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/public/all-authors`
      );

      const authorWithoutBooks = response.data;

      const authorWithBooks = await Promise.all(
        authorWithoutBooks.map(async (author) => {
          const image = await axios.get(
            `http://localhost:8080/user/profile-image/${author.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: "blob",
            }
          );

          const imageUrl = URL.createObjectURL(image.data);
          return {
            ...author,
            imageData: imageUrl,
          };
        })
      );

      setAuthors(authorWithBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAuthors = authors.filter((author) => {
    if (!searchTerm) return true;

    const searchTermLower = searchTerm.toLowerCase().trim();

    return author.authorName.toLowerCase().includes(searchTermLower);
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#F4F4F4] min-h-screen p-8">
      {token ? (
        <div className="container mx-auto mt-15">
          {/* Search Input */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Authors"
                className="w-full px-5 py-3 pl-10 text-sm text-gray-700 
                  placeholder-gray-400 bg-white border border-gray-300 
                  rounded-full focus:outline-none focus:ring-2 
                  focus:ring-[#504B38] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Authors Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#504B38] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Books</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthors.map((author) => (
                  <tr
                    key={author.userId}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={author.imageData}
                        alt={author.authorName}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {author.authorName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="bg-[#EBE5C2] text-[#504B38] 
                        px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {author.authorId} Author-ID
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(`/authors/view-book/${author.authorId}`)
                        }
                        className="bg-[#504B38] text-white px-4 py-2 
                          rounded-full text-sm font-medium hover:bg-[#45412d] 
                          transition-colors"
                      >
                        View Books
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* No Results State */}
            {filteredAuthors.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <p className="text-xl text-gray-500">
                  No authors found matching your search
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Try different keywords or clear your search
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-[650px] fixed bottom-0 left-0 bg-gradient-to-t from bg-gray-400 to-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Create Your Own Account
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              To see all authors and view their books, create your own account.
              Then find your favorite authors and explore their books.
            </p>
            <button
              onClick={() => navigate("/auth/register-about")}
              className="bg-[#504B38] text-white px-6 py-3 rounded-full 
                hover:bg-[#47422d] transition-colors"
            >
              See All Authors
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorsTable;
