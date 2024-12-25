import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="transition-shadow duration-300 bg-[#f8fcfc] rounded-lg  ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4 ">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt=""
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book?._id}`}>
            <h3 className="text-lg font-semibold hover:text-blue-600 mb-2">
              {book?.title.length > 14
                ? `${book?.title.slice(0, 14)}...`
                : book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-3">
            {book.description.length > 60
              ? `${book.description.slice(0, 65)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5">
            ${book?.newPrice}
            <span className="line-through font-normal ml-2">
              ${book?.oldPrice}
            </span>
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 mt-6 space-x-1 flex items-center gap-1 "
          >
            <FiShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
BookCard.propTypes = {
  book: PropTypes.shape({
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    oldPrice: PropTypes.number.isRequired,
    newPrice: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookCard;