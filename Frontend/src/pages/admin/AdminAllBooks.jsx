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
    <div>
      <div className="mt-15">All Books page</div>
      <div>
        {books?.map((book, index) => (
          <div key={index}>
            <div>
              <img
                src={book.imageData}
                alt="book-image"
                className="w-48 h-48 object-cover"
              />
            </div>
            <div>
              <h1>{book.bookId}</h1>
              <h1>{book.bookName}</h1>
            </div>
            <div>
              <button>read and update</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllBooks;
