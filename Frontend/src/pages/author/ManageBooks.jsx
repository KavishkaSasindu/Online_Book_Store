import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ManageBooks = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seacrhQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const filterdData = books.filter((book) =>
    book.bookName.toLowerCase().includes(seacrhQuery.toLowerCase())
  );

  const fetchData = async () => {
    try {
      // fetch Data with image
      const response = await axios.get(
        `http://localhost:8080/user/get-book-author/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bookWithoutImage = response.data;

      const bookwithImage = await Promise.all(
        bookWithoutImage.map(async (book) => {
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

      console.log(bookwithImage);
      setTimeout(() => {
        setBooks(bookwithImage);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/author/delete-book/${id}/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const deleteResponse = response.data;
      if (response.status === 200) {
        alert(deleteResponse.message);
        location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleSeacrh = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    // fetch data
    fetchData();
  }, []);

  return (
    <div className=" w-[100%] border mx-auto p-6  min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-6 text-[#504B38]">Manage Books</h1>

        <div className="w-full max-w-md mb-6">
          <input
            type="text"
            onChange={handleSeacrh}
            placeholder="Search for books..."
            className="w-full py-3 px-4 rounded-lg bg-[#EBE5C2] border border-[#504B38] text-[#504B38] placeholder-[#504B38]/50 focus:outline-none"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">
            <p className="text-[#504B38] font-medium">loading .......</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#504B38] text-[#EBE5C2]">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Book Name</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterdData.map((book, index) => (
                <tr key={index} className={"bg-gray-100"}>
                  <td className="p-4">
                    <div className="rounded-full border border-[#504B38] w-[80px] h-[80px] overflow-hidden">
                      {book.imageData ? (
                        <img
                          className="w-full h-full object-cover"
                          src={book.imageData}
                          alt={book.bookName}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#504B38] font-bold">
                          {book.bookName.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#504B38]">
                    {book.bookName}
                  </td>
                  <td className="p-4 text-[#504B38] max-w-xs">
                    <div className="line-clamp-2">{book.description}</div>
                  </td>
                  <td className="p-4 text-[#504B38]">${book.price}</td>
                  <td className="p-4 text-[#504B38]">{book.category}</td>
                  <td className="p-4">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => deleteBook(book.bookId)}
                        className="px-4 py-2 rounded bg-red-600 text-white font-medium"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/author/update-book/${book.bookId}/${id}`)
                        }
                        className="px-4 py-2 rounded bg-[#504B38] text-white font-medium"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filterdData.length === 0 && (
            <div className="bg-[#EBE5C2] p-8 text-center">
              <p className="text-[#504B38]">
                No books found. Try a different search.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
