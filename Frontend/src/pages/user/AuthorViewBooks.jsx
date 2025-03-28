import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AuthorViewBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const token = localStorage.getItem("token");

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/get-book-author/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      const data = Array.isArray(response.data) ? response.data : [];

      const bookWithImage = await Promise.all(
        data.map(async (book) => {
          const bookImage = await axios.get(
            `http://localhost:8080/public/one-book/image/${book.bookId}`,
            { responseType: "blob" }
          );

          const imageUrl = URL.createObjectURL(bookImage.data);
          return {
            ...book,
            imageData: imageUrl,
          };
        })
      );

      setBooks(bookWithImage);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const isValidte = () => {
    if (!token) {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    isValidte();
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="container mx-auto mt-15">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#504B38] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Book</th>
                <th className="px-4 py-3 text-center">Category</th>
                <th className="px-4 py-3 text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book, index) => (
                <tr
                  key={book.bookId}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={book.imageData}
                        alt={book.title}
                        className="w-16 h-24 object-cover rounded-md shadow-sm"
                      />
                      <div>
                        <h2 className="font-semibold text-[#504B38] text-lg">
                          {book.bookName}
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-300 ">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">{book.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuthorViewBooks;
