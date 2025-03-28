import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";

const Wishlist = () => {
  // Sample data for demonstration
  const [wishlistItems, setWishlistItems] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/auth/login");
  }

  console.log(id);

  //   fetchWishlist function
  const fetchWishlist = async () => {
    try {
      const responseBooks = await axios.get(
        `http://localhost:8080/user/get-wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseWithImage = await Promise.all(
        responseBooks.data.map(async (book) => {
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

      const data = await responseBooks.data;
      setWishlistItems(responseWithImage);
    } catch (error) {
      console.log(error.response.data.messages);
    }
  };

  //   remove from wishlist function
  const removeFromWishlist = async (bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/delete-book-wishlist/${id}/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("book is deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#504B38]">My Wishlist</h1>
          <span className="bg-[#EBE5C2] px-4 py-2 rounded-full text-[#504B38] font-medium">
            {wishlistItems.length} Books
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-gray-200 rounded-lg p-12 text-center">
            <h2 className="text-xl text-[#504B38] mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding books to your wishlist to keep track of what you want
              to read next.
            </p>
            <Link to={"/all-books"}>
              <button className="bg-[#504B38] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                Browse Books
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-[#EBE5C2] bg-opacity-30 rounded-lg p-6">
            {wishlistItems.map((book, index) => (
              <div
                key={book.bookId}
                className={`flex items-start bg-white p-6 rounded-lg shadow-sm mb-4 ${
                  index % 2 === 0
                    ? "border-l-4 border-[#504B38]"
                    : "border-l-4 border-[#EBE5C2]"
                }`}
              >
                <img
                  src={book.imageData}
                  alt={book.imageName}
                  className="w-24 h-36 object-cover rounded-md shadow-md"
                />

                <div className="ml-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-[#504B38]">
                        {book.bookName}
                      </h2>
                      <p className="text-gray-600 mt-1">by {book.author}</p>
                      <span className="inline-block bg-[#EBE5C2] px-3 py-1 text-sm text-[#504B38] rounded-full mt-2">
                        {book.category}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-[#504B38]">
                      ${book.price}
                    </p>
                  </div>

                  <p className="text-gray-700 mt-3 mb-4 line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => removeFromWishlist(book.bookId)}
                      className="text-gray-500 hover:text-red-500 text-sm flex items-center transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button>

                    <button
                      onClick={() => addToCart(book.bookId)}
                      className="bg-[#504B38] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6 p-4 bg-white rounded-lg">
              <Link to={"/all-books"}>
                <button className="text-[#504B38] font-medium hover:underline">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
