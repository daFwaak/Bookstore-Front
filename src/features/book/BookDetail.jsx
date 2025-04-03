import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { base } from "../../app/apiUrls";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useGetBookQuery, useGetBooksQuery } from "./bookApi";
import { useAddToCartMutation } from "../cart/cartApi";

const BookDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBookQuery(id);
  const { data: books } = useGetBooksQuery();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) return <h1 className="text-center text-xl">Loading...</h1>;
  if (error) return <h1 className="text-center text-xl">{error.data?.message}</h1>;

  const filteredBooks = books?.filter((book) => book._id !== id);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Book Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Book Image & Cart Section */}
        <div className="md:col-span-4 flex flex-col items-center">
          <img
            src={data.image.startsWith("http") ? data.image : `${base}${data.image}`}
            alt={data.title}
            className="w-40 md:w-52 lg:w-60 h-auto object-cover rounded-lg shadow-md" // ✅ Reduced the size
          />
          <div className="w-full mt-4">
            <CartTable book={data} />
          </div>
        </div>

        {/* Book Information */}
        <div className="md:col-span-8 space-y-4">
          <Typography variant="h3" className="font-bold text-lg md:text-2xl">{data.title}</Typography>
          <Typography variant="h5" className="text-gray-700">by {data.author}</Typography>
          <Typography className="text-gray-600 text-sm md:text-lg">{data.description}</Typography>
          <Typography variant="h5" className="font-semibold">Price: Nrs. {data.price}</Typography>
          <Typography className={`text-lg font-semibold ${data.stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {data.stock > 0 ? `${data.stock} in stock` : "Out of Stock"}
          </Typography>
        </div>
      </div>

      {/* More Books Section */}
      {filteredBooks?.length > 0 && (
        <div className="mt-12">
          <Typography variant="h6" className="mb-3 font-bold text-center">
            More Books You May Like
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="cursor-pointer flex flex-col items-center p-2 hover:scale-105 transition-transform"
                onClick={() => navigate(`/book-detail/${book._id}`)}
              >
                <img
                  className="w-auto h-50 md:h-64 object-contain rounded-md shadow-sm"
                  src={book.image.startsWith("http") ? book.image : `${base}${book.image}`}
                  alt={book.title}
                />
                <Typography className="text-sm text-center mt-2">{book.title}</Typography>
              </div>
            ))}
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
      await addToCart({ userId: user.userId, items: [{ bookId: book._id, title: book.title, quantity: qty }] }).unwrap();
      navigate("/cart-page");
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <Card className="flex flex-col sm:flex-row justify-between items-center p-4">
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
        className="px-5 py-2 mt-4 sm:mt-0"
      >
        {isLoading ? "Adding..." : "Add To Cart"}
      </Button>
    </Card>
  );
}
