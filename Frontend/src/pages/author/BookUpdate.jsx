import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { div } from "framer-motion/client";

const BookUpdate = () => {
  const { id } = useParams();
  const { authorId } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [books, setBooks] = useState({
    bookName: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBook = async () => {
    try {
      setIsLoading(true);
      const bookResponse = await axios.get(
        `http://localhost:8080/author/get-one-book/${id}/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bookData = bookResponse.data;
      console.log(bookData);
      // fetch image for book
      const responseBookImage = await axios.get(
        `http://localhost:8080/public/one-book/image/${id}`,
        {
          responseType: "blob",
        }
      );

      const imageData = URL.createObjectURL(responseBookImage.data);
      setTimeout(() => {
        setBooks(bookData);
        setImage(imageData);
      }, 2000);
      setImage(imageData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBooks({
      ...books,
      [e.target.name]: e.target.value,
    });
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const updateBookData = {
        bookName: books.bookName,
        description: books.description,
        price: books.price,
        category: books.category,
      };

      formData.append(
        "bookUpdateDto",
        new Blob([JSON.stringify(updateBookData)], { type: "application/json" })
      );
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:8080/author/update-book/${authorId}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    // fetch books
    fetchBook();
  }, []);

  return (
    <div>
      <div className="mt-15 flex">
        <div className="w-56 h-56 ">
          <img src={image} alt="image" className="w-full h-full object-cover" />
          update Image here :{" "}
          <input type="file" name="image" onChange={changeImage} /> <br />
        </div>
        <div>
          <form action="" onSubmit={updateData}>
            BookId :{" "}
            <input
              type="text"
              name="bookId"
              value={books.bookId}
              className="border"
              onChange={handleChange}
              disabled
            />{" "}
            <br />
            Book Name :{" "}
            <input
              type="text"
              name="bookName"
              value={books.bookName}
              className="border"
              onChange={handleChange}
            />{" "}
            <br />
            Book Category :{" "}
            <select name="category" className="border" onChange={handleChange}>
              <option value="FICTION">FICTION</option>
              <option value="NON_FICTION">NON_FICTION</option>
              <option value="BIOGRAPGY">BIOGRAPHY</option>
              <option value="ROMANCE">ROMANCE</option>
              <option value="HISTORY">HISTORY</option>
              <option value="SCIENCE_FICTION">SCIENCE_FICTION</option>
              <option value="MISTERY">MISTERY</option>
              <option value="FANTASY">FANTASY</option>
            </select>
            <br />
            Book Description : T
            <textarea
              name="description"
              value={books.description}
              className="border"
              onChange={handleChange}
            />{" "}
            <br />
            Book Price :{" "}
            <input
              type="number"
              name="price"
              value={books.price}
              className="border"
              onChange={handleChange}
            />{" "}
            <br />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookUpdate;
