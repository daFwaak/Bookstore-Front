import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { base } from "../../app/apiUrls";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useGetBookQuery, useGetBooksQuery } from "./bookApi";
import { debounce } from "lodash";
import { useAddToCartMutation } from "../cart/cartApi";

const BookDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBookQuery(id);
  const { data: books } = useGetBooksQuery(); // Fetch all books
  const bookDetailsRef = useRef(null);
  const [showMoreBooks, setShowMoreBooks] = useState(false);
  const navigate = useNavigate();

  const handleScroll = useCallback(
    debounce(() => {
      if (bookDetailsRef.current) {
        const { bottom } = bookDetailsRef.current.getBoundingClientRect();
        setShowMoreBooks(bottom <= window.innerHeight);
      }
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.data?.message}</h1>;

  const filteredBooks = books?.filter((book) => String(book._id) !== String(id));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-3 sticky top-16 self-start">
          <img
            src={data.image.startsWith("http") ? data.image : `${base}${data.image}`}
            alt={data.title}
            className="w-72 h-96 object-cover rounded-lg shadow-md"
          />
          <div className="mt-4">
            <CartTable book={data} />
          </div>
        </div>

        <div className="col-span-7 space-y-5" ref={bookDetailsRef}>
          <Typography variant="h3" className="font-bold">{data.title}</Typography>
          <Typography variant="h5" color="blue-gray">by {data.author}</Typography>
          <Typography variant="paragraph" color="gray" className="text-lg leading-7">
            {data.description}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Price: Nrs. {data.price}
          </Typography>
          <Typography variant="h6" color={data.stock > 0 ? "green" : "red"}>
            Stock: {data.stock > 0 ? `${data.stock} available` : "Out of Stock"}
          </Typography>
        </div>
      </div>

      {showMoreBooks && (
        <div className="mt-12">
          <Typography variant="h6" className="mb-3 font-bold text-center">
            More Books You May Like
          </Typography>
          <div className="grid grid-cols-5 gap-6">
            {filteredBooks?.map((book) => (
              <div
                key={book._id}
                className="w-40 cursor-pointer"
                onClick={() => navigate(`/book-detail/${book._id}`)}
              >
                <img
                  src={book.image.startsWith("http") ? book.image : `${base}${book.image}`}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-md shadow-sm"
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
  const { items = [] } = useSelector((state) => state.cart); // Adjust based on state shape
  const cartItem = items.find((item) => item.bookId === book._id); // Correct way to check if book is in cart
  const [qty, setQty] = useState(cartItem?.quantity ?? 1);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const navigate = useNavigate();

  const handleAdd = async (book) => {
    if (!user || !user.userId || !book || !book._id) {
      console.error("Invalid user or book data:", { user, book });
      return;
    }
  
    const payload = {
      userId: user.userId,
      items: [{ 
        bookId: book._id,
        title: book.title,
        quantity: qty, 
      }],
    };
  
    console.log("Sending payload to addToCart:", payload); 
  
    try {
      const response = await addToCart(payload).unwrap();
      console.log("Book added successfully", response);
      navigate("/cart-page");
    } catch (error) {
      console.error("Add to cart failed:", error); 
      if (error.data) {
        console.error("Server error data:", error.data); 
      }
    }
  };
  
  

  return (
    <Card className="flex justify-center gap-6 w-full items-center p-5">
      <div className="flex">
        <IconButton disabled={qty === 1} onClick={() => setQty(qty - 1)} size="sm">
          <i className="fas fa-minus" />
        </IconButton>

        <p className="mx-4 font-bold">{qty}</p>

        <IconButton onClick={() => setQty(qty + 1)} size="sm">
          <i className="fas fa-plus" />
        </IconButton>
      </div>

      <div>
        <Button
          disabled={!user || user?.role === "admin" || isLoading}
          onClick={() => handleAdd(book)} 
          size="sm"
          className="px-5 py-2"
        >
          {isLoading ? "Adding..." : "Add To Cart"}
        </Button>
      </div>
    </Card>
  );
}
