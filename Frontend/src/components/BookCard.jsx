import React from "react";
import { ShoppingCart, BookOpen } from "lucide-react";

const BookDisplay = ({
  bookId,
  bookName,
  description,
  imageName,
  price,
  imageData,
  author,
  category,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex max-w-4xl mx-auto ">
      {/* Image Section */}
      <div className="w-1/3 relative">
        <img
          src={imageData}
          alt={bookName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#504B38] text-white rounded-full p-2">
          <BookOpen size={20} />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-8 bg-[#F4F4F4] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-[#504B38]">{bookName}</h2>
            <span className="text-2xl font-semibold text-[#504B38]">
              ${price}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-[#504B38]">Author:</span>{" "}
              {author}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-[#504B38]">Category:</span>{" "}
              {category}
            </p>
          </div>

          <p className="text-gray-600 mb-6 line-clamp-4">{description}</p>
        </div>

        <div className="flex space-x-4">
          <button
            className="flex-grow bg-[#504B38] text-white py-3 rounded-lg 
            hover:bg-[#3A3A3A] transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
          <button
            className="flex-grow bg-gray-200 text-[#504B38] py-3 rounded-lg 
            hover:bg-gray-300 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDisplay;
