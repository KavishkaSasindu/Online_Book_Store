import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminAllBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [books, setBooks] = useState([]);

  //   fetch books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/public/all-books`
      );
      const booksWithoutImage = response.data;
      console.log(booksWithoutImage);

      const bookWithImage = await Promise.all(
        booksWithoutImage?.map(async (book) => {
          const image = await axios.get(
            `http://localhost:8080/public/one-book/image/${book.bookId}`,
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(image.data);

          return {
            ...book,
            imageData: imageUrl,
          };
        })
      );

      setBooks(bookWithImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen py-8 px-4 md:px-8 mt-15">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3A3728] mb-8 border-b-2 border-[#3A3728] pb-2">
          Book Store - All Books
        </h1>

        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto">
            <thead className="bg-[#3A3728] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Cover</th>
                <th className="py-3 px-6 text-left">Book Details</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books?.map((book, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <img
                        src={book.imageData}
                        alt={`Cover of ${book.bookName}`}
                        className="w-24 h-32 object-cover rounded-md shadow-md border border-gray-300"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <h2 className="font-medium text-lg text-[#3A3728]">
                        {book.bookName}
                      </h2>
                      <p className="text-sm text-gray-600">ID: {book.bookId}</p>
                      {book.author && (
                        <p className="text-sm text-gray-600">
                          Author: {book.author}
                        </p>
                      )}
                      {book.category && (
                        <p className="text-sm text-gray-600">
                          Category: {book.category}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm w-full md:w-auto transition-colors duration-200">
                        Edit
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm w-full md:w-auto transition-colors duration-200">
                        Delete
                      </button>
                      <button className="bg-[#3A3728] hover:bg-[#4a4736] text-white py-2 px-4 rounded-md text-sm w-full md:w-auto transition-colors duration-200">
                        Wishlist
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {books.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <p>No books found in the database</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAllBooks;
