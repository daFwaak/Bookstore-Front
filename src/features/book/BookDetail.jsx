// BookDetail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { base } from "../../app/apiUrls";
import {
  Button,
  Card,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useGetBookQuery, useGetBooksQuery } from "./bookApi";
import { useAddToCartMutation } from "../cart/cartApi";

const BookDetail = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useGetBookQuery(id);
  const { data: books } = useGetBooksQuery();
  const navigate = useNavigate();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descriptionLimit = 400;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) return <h1 className="text-center text-xl">Loading...</h1>;
  if (error) return <h1 className="text-center text-xl">{error.data?.message}</h1>;

  const filteredBooks = books?.filter((b) => b._id !== id);

  const imageUrl = book.image.startsWith("http") ? book.image : `${base}${book.image}`;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-3 flex justify-center">
          <img
            src={imageUrl}
            alt={book.title}
            className="w-40 md:w-52 lg:w-60 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="md:col-span-6 space-y-4">
          <Typography variant="h3" className="font-bold text-lg md:text-2xl">
            {book.title}
          </Typography>
          <Typography variant="h5">by {book.author}</Typography>

          <div>
            <Typography variant="h6" className="font-bold mb-1">
              Synopsis
            </Typography>
            <Typography className="text-sm md:text-base">
              {showFullDesc || book.description.length <= descriptionLimit
                ? book.description
                : `${book.description.slice(0, descriptionLimit)}...`}
              {book.description.length > descriptionLimit && (
                <span
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-blue-600 cursor-pointer ml-2"
                >
                  {showFullDesc ? "See Less" : "See More"}
                </span>
              )}
            </Typography>
          </div>

          <Typography variant="h5">Price: Nrs. {book.price}</Typography>
          <Typography
            className={`text-lg font-semibold ${
              book.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {book.stock > 0 ? `${book.stock} in stock` : "Out of Stock"}
          </Typography>
        </div>

        <div className="md:col-span-3">
          <CartTable book={book} />
        </div>
      </div>

      {filteredBooks?.length > 0 && (
        <div className="mt-12">
          <Typography variant="h6" className="mb-3 font-bold text-center">
            More Books You May Like
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((book) => {
              const imageSrc = book.image.startsWith("http") ? book.image : `${base}${book.image}`;
              return (
                <div
                  key={book._id}
                  className="cursor-pointer flex flex-col items-center p-2 hover:scale-105 transition-transform"
                  onClick={() => navigate(`/book-detail/${book._id}`)}
                >
                  <img
                    className="w-auto h-50 md:h-64 object-contain rounded-md shadow-sm"
                    src={imageSrc}
                    alt={book.title}
                  />
                  <Typography className="text-black text-md text-center mt-2">
                    {book.title}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;

export function CartTable({ book }) {
  const { user } = useSelector((state) => state.userSlice);
  const { items = [] } = useSelector((state) => state.cart);
  const cartItem = items.find((item) => item.bookId === book._id);
  const [qty, setQty] = useState(cartItem?.quantity ?? 1);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!user || user.role === "admin") return;
    try {
      await addToCart({
        userId: user.userId,
        items: [{ bookId: book._id, title: book.title, quantity: qty }],
      }).unwrap();
      navigate("/cart-page");
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <IconButton disabled={qty === 1} onClick={() => setQty(qty - 1)} size="sm">
            <i className="fas fa-minus" />
          </IconButton>
          <p className="font-bold">{qty}</p>
          <IconButton onClick={() => setQty(qty + 1)} size="sm">
            <i className="fas fa-plus" />
          </IconButton>
        </div>
        <Button
          disabled={!user || user.role === "admin" || isLoading}
          onClick={handleAdd}
          size="sm"
          className="px-5 py-2 mt-4"
        >
          {isLoading ? "Adding..." : "Add To Cart"}
        </Button>
      </div>
    </Card>
  );
}
