import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Save } from "lucide-react";
import axios from "axios";

const BookUpdate = () => {
  const { id } = useParams();
  const { authorId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [books, setBooks] = useState({
    bookName: "",
    description: "",
    price: "",
    category: "FICTION",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
        setImage(responseBookImage.data);
        setPreview(imageData);
      }, 2000);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
    if (file) {
      setImage(file);
      // Create preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
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
      if (response.status === 200) {
        alert("Book updated successfully");
        navigate(`/author/my-books/${authorId}`);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert("Failed to update book");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    // fetch books
    fetchBook();

    // Cleanup function for preview URL
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  const goBack = () => {
    navigate(`/author/my-books/${authorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#504B38] p-6 flex items-center">
          <button
            onClick={goBack}
            className="flex items-center text-white hover:text-[#EBE5C2] transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            <span>Back to Books</span>
          </button>
          <h2 className="text-2xl font-bold text-white ml-auto">Update Book</h2>
        </div>

        {isLoading ? (
          <div className="p-8 flex justify-center items-center h-64">
            <div className="text-[#504B38] text-xl">Loading book data...</div>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square mb-4 bg-[#EBE5C2] rounded-lg overflow-hidden flex items-center justify-center border-2 border-[#504B38]">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Book Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-[#504B38] text-center p-4">
                        <Upload size={48} className="mx-auto mb-2" />
                        <p>No image selected</p>
                      </div>
                    )}
                  </div>

                  <label className="w-full flex items-center justify-center px-4 py-2 bg-[#504B38] text-white rounded-md cursor-pointer hover:bg-[#3a3729] transition-colors">
                    <Upload size={16} className="mr-2" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      name="image"
                      onChange={changeImage}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <form onSubmit={updateData} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#504B38]">
                      Book ID
                    </label>
                    <input
                      type="text"
                      name="bookId"
                      value={books.bookId || ""}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-500"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#504B38]">
                      Book Name
                    </label>
                    <input
                      type="text"
                      name="bookName"
                      value={books.bookName || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#504B38] focus:border-[#504B38]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#504B38]">
                      Category
                    </label>
                    <select
                      name="category"
                      value={books.category || "FICTION"}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#504B38] focus:border-[#504B38]"
                    >
                      <option value="FICTION">Fiction</option>
                      <option value="NON_FICTION">Non-Fiction</option>
                      <option value="BIOGRAPHY">Biography</option>
                      <option value="ROMANCE">Romance</option>
                      <option value="HISTORY">History</option>
                      <option value="SCIENCE_FICTION">Science Fiction</option>
                      <option value="MYSTERY">Mystery</option>
                      <option value="FANTASY">Fantasy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#504B38]">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={books.description || ""}
                      onChange={handleChange}
                      rows="4"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#504B38] focus:border-[#504B38]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#504B38]">
                      Price
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        value={books.price || ""}
                        onChange={handleChange}
                        className="block w-full pl-7 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#504B38] focus:border-[#504B38]"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-[#504B38] text-white rounded-md hover:bg-[#3a3729] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#504B38] transition-colors"
                    >
                      <Save size={16} className="mr-2" />
                      Update Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookUpdate;
